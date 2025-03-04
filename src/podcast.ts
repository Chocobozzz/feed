import * as convert from 'xml-js'
import { generator } from './config'
import { Feed } from './feed'
import { Author, Category, Person, PodcastItem, PodcastLiveItem } from './typings'
import { addCustomTagsToObject, addCustomXMLNS, sanitize } from './utils'

/**
 * Returns a RSS 2.0 feed using the Podcast Namespace
 */
export default (ins: Feed) => {
  const { options } = ins
  let isAtom = false

  const base: any = {
    _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
    rss: {
      _attributes: {
        version: "2.0",
        "xmlns:podcast": "https://podcastindex.org/namespace/1.0",
        "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "xmlns:dc": "http://purl.org/dc/elements/1.1/",
        "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
      },
      channel: {
        title: { _text: options.title },
        lastBuildDate: { _text: options.updated ? options.updated.toUTCString() : new Date().toUTCString() },
        docs: { _text: options.docs ? options.docs : "https://validator.w3.org/feed/docs/rss2.html" },
        generator: { _text: options.generator || generator },
        "podcast:medium": { _text: options.medium || "podcast" },
      },
    },
  }

  if (options.customXMLNS) {
    addCustomXMLNS(base.rss, options.customXMLNS)
  }

  if (options.link) {
    base.rss.channel.link = { _text: sanitize(options.link) }
  }

  if (options.description) {
    base.rss.channel.description = { _text: options.description }
  }

  /**
   * Channel language
   * https://validator.w3.org/feed/docs/rss2.html#ltlanguagegtSubelementOfLtchannelgt
   */
  if (options.language) {
    base.rss.channel.language = { _text: options.language }
  }

  /**
   * Channel ttl
   * https://validator.w3.org/feed/docs/rss2.html#ltttlgtSubelementOfLtchannelgt
   */
  if (options.ttl) {
    base.rss.channel.ttl = { _text: options.ttl }
  }

  if (options.guid) {
    base.rss.channel["podcast:guid"] = { _text: options.guid }
  }

  if (options.author && options.author.name) {
    base.rss.channel["itunes:author"] = { _text: options.author.name }
  }

  if (options.person) {
    const personTags = options.person.map(({ role, group, href, img, name }: Person) => ({
      _attributes: { role, group, href: sanitize(href), img: sanitize(img) },
      _text: name
    }))

    if (base.rss.channel["podcast:person"]) {
      personTags.unshift(base.rss.channel["podcast:person"])
    }

    base.rss.channel["podcast:person"] = personTags

    if (options.person.length !== 0) {
      base.rss.channel["itunes:owner"] = {
        'itunes:name': { _text: options.person[0].name },
        'itunes:email': options.locked?.email
      }

      base.rss.channel["itunes:image"] = {
        _attributes: { href: sanitize(options.person[0].img) }
      }
    }
  }

  if (options.managingEditor && options.managingEditor.name && options.managingEditor.email) {
    base.rss.channel["managingEditor"] = { _text: `${options.managingEditor.email} (${options.managingEditor.name})` }
  }

  if (options.webMaster && options.webMaster.name && options.webMaster.email) {
    base.rss.channel["webMaster"] = { _text: `${options.webMaster.email} (${options.webMaster.name})` }
  }


  if (options.locked) {
    base.rss.channel["podcast:locked"] = {
      _attributes: { "owner": options.locked.email },
      _text: options.locked.isLocked ? "yes" : "no"
    }
  }

  base.rss.channel["itunes:explicit"] = { _text: options.nsfw ? "true" : "false" }

  /**
   * Channel Image
   * https://validator.w3.org/feed/docs/rss2.html#ltimagegtSubelementOfLtchannelgt
   */
  if (options.image) {
    base.rss.channel.image = {
      title: { _text: options.title },
      url: { _text: options.image },
      link: { _text: sanitize(options.link) }
    }
  }

  /**
   * Channel Copyright
   * https://validator.w3.org/feed/docs/rss2.html#optionalChannelElements
   */
  if (options.copyright) {
    base.rss.channel.copyright = { _text: options.copyright }
  }

  /**
   * Channel Categories
   * https://validator.w3.org/feed/docs/rss2.html#comments
   */
  ins.categories.forEach((category) => {
    if (!base.rss.channel.category) {
      base.rss.channel.category = []
      base.rss.channel["itunes:category"] = []
    }
    base.rss.channel.category.push({ _text: category })
    base.rss.channel["itunes:category"].push({ _attributes: { text: category } })
  })

  /**
   * Feed URL
   * http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
   */
  const atomLink = options.feed || (options.feedLinks && options.feedLinks.rss)
  if (atomLink) {
    isAtom = true
    base.rss.channel["atom:link"] = [
      {
        _attributes: {
          href: sanitize(atomLink),
          rel: "self",
          type: "application/rss+xml",
        },
      },
    ]
  }

  /**
   * Hub for PubSubHubbub
   * https://code.google.com/p/pubsubhubbub/
   */
  if (options.hub) {
    isAtom = true

    base.rss.channel["atom:link"] = {
      _attributes: {
        href: sanitize(options.hub),
        rel: "hub"
      }
    }
  }

  if (options.stunServers) {
    base.rss.channel["podcast:stun"] = options.stunServers.map(stunServer => ({
      _text: stunServer
    }))
  }

  if (options.trackers) {
    base.rss.channel["podcast:tracker"] = options.trackers.map(tracker => ({
      _text: tracker
    }))
  }

  if (options.customTags) {
    addCustomTagsToObject(base.rss.channel, options.customTags)
  }

  base.rss.channel["podcast:liveItem"] = ins.podcastLiveItems.map(makePodcastLiveItemJSON)
  base.rss.channel.item = ins.podcastItems.map(makePodcastItemJSON)

  if (isAtom) {
    base.rss._attributes["xmlns:atom"] = "http://www.w3.org/2005/Atom"
  }

  return convert.js2xml(base, { compact: true, ignoreComment: true, spaces: 4 })
}

/**
 * Returns a formated category
 * @param category
 */
const formatCategory = (category: Category) => {
  const { name, domain } = category
  return {
    _text: name,
    _attributes: {
      domain,
    },
  }
}

const makePodcastItemJSON = (entry: PodcastItem) => {
  let item: any = {}

  if (entry.title) {
    item.title = { _cdata: entry.title }
  }

  if (entry.link) {
    item.link = { _text: sanitize(entry.link) }
  }

  if (entry.guid) {
    item.guid = { _attributes: { isPermaLink: entry.guid.startsWith("http") }, _text: entry.guid }
  } else if (entry.link) {
    item.guid = { _attributes: { isPermaLink: true }, _text: sanitize(entry.link) }
  } else if (entry.media[0].sources[0].uri) {
    item.guid = { _attributes: { isPermaLink: true }, _text: sanitize(entry.media[0].sources[0].uri) }
  }

  if (entry.date) {
    item.pubDate = { _text: entry.date.toUTCString() }
  }

  if (entry.published) {
    item.pubDate = { _text: entry.published.toUTCString() }
  }

  if (entry.description) {
    item.description = { _cdata: entry.description }
  }

  if (entry.content) {
    item["content:encoded"] = { _cdata: entry.content }
  }
  /**
   * Item Author
   * https://validator.w3.org/feed/docs/rss2.html#ltauthorgtSubelementOfLtitemgt
   */
  if (Array.isArray(entry.author)) {
    item.author = []
    entry.author.forEach((author: Author) => {
      if (author.email && author.name) {
        item.author.push({ _text: author.email + " (" + author.name + ")" })
      } else if (author.name) {
        item["dc:creator"] = {
          _text: author.name
        }
      }
    })
  }

  if (entry.person) {
    item["podcast:person"] = entry.person.map(({ role, group, href, img, name }: Person) => ({
      _attributes: { role, group, href: sanitize(href), img: sanitize(img) },
      _text: name
    }))
  }

  /**
   * Item Category
   * https://validator.w3.org/feed/docs/rss2.html#ltcategorygtSubelementOfLtitemgt
   */
  if (Array.isArray(entry.category)) {
    item.category = entry.category.map(formatCategory)
  }

  if (entry.stunServers) {
    item["podcast:stun"] = entry.stunServers.map(stunServer => ({
      _text: stunServer
    }))
  }

  if (entry.trackers) {
    item["podcast:tracker"] = entry.trackers.map(tracker => ({
      _text: tracker
    }))
  }

  if (entry.socialInteract) {
    item["podcast:socialInteract"] = entry.socialInteract.map(({ uri, protocol, accountId, accountUrl, priority }) => ({
      _attributes: { uri: sanitize(uri), protocol, accountId, accountUrl: sanitize(accountUrl), priority }
    }))
  }

  if (entry.subTitle) {
    item["podcast:transcript"] = entry.subTitle.map(({ url, type, language, rel }) => ({
      _attributes: { url: sanitize(url), type, language, rel }
    }))
  }

  if (entry.duration) {
    item["itunes:duration"] = { _text: entry.duration }
  }

  const defaultEnclosure = entry.media[0]

  item.enclosure = {
    _attributes: {
      url: sanitize(defaultEnclosure.sources[0].uri),
      length: defaultEnclosure.length,
      type: defaultEnclosure.type
    }
  }

  item["podcast:alternateEnclosure"] = entry.media.map(
    ({ type, codecs, length, bitrate, height, language, rel, title, sources, integrity }, index) => ({
      _attributes: { type, codecs, length, bitrate, height, lang: language, rel, title, default: index === 0 ? "true" : "false" },
      "podcast:source": sources.map(({ uri, contentType }) => ({ _attributes: { uri: sanitize(uri), contentType } })),
      ...(integrity && { "podcast:integrity": integrity?.map(({ type, value }) => ({ _attributes: { type, value } })) })
    })
  )

  if (entry.thumbnails) {
    const defaultImage = entry.thumbnails[0]

    item["itunes:image"] = {
      _attributes: { href: sanitize(defaultImage.url) }
    }

    const thumbnailsWithWidth = entry.thumbnails
      .filter(({ width }) => {
        return width !== undefined
      })

    if (thumbnailsWithWidth.length > 0) {
      item["podcast:images"] = {
        _attributes: {
          srcset: thumbnailsWithWidth
            .map(({ url, width }) => (`${sanitize(url)} ${width}w`))
            .join(", ")
        }
      }
    }
  }

  item["itunes:explicit"] = { _text: entry.nsfw ? "true" : "false" }

  if (entry.customTags) {
    addCustomTagsToObject(item, entry.customTags)
  }

  return item
}

const makePodcastLiveItemJSON = (entry: PodcastLiveItem) => {
  let item = makePodcastItemJSON(entry)

  item._attributes = {
    status: entry.status,
    ...(entry.start && { start: entry.start }),
    ...(entry.end && { end: entry.end })
  }

  return item
}
