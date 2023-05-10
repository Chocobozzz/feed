import { Feed } from "../feed"
import { IntegrityType, LiveItemStatus } from "../typings"
import { published, sampleFeed, updated } from "./setup"

describe("podcast", () => {
  it("should generate a valid feed", () => {
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed author no link", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      author: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()

  })
  it("should generate a valid feed managingEditor", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      managingEditor: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed webMaster", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      webMaster: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed medium music", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      medium: "music",
      updated,
      author: {
        name: "John Doe",
        email: "johndoe@example.com",
        link: "https://example.com/hello-world?link=sanitized&value=2",
      },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed person", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      person: [
        {
          name: "John Doe",
          href: "https://example.com/hello-world?link=sanitized&value=2",
          img: "https://example.com/john-doe.png",
        },
      ],
      locked: { isLocked: true, email: "johndoe@example.com" },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed guid", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      guid: "81db299a-e533-45a4-a2c1-59fd9501713a",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed locked", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      locked: { isLocked: true, email: "johndoe@example.com" },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed not locked", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      locked: { isLocked: false, email: "johndoe@example.com" },
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with stun servers", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      locked: { isLocked: false, email: "johndoe@example.com" },
      stunServers: [
        "stun:stun1.l.google.com:19302",
        "stun:stunserver.org:3478",
      ]
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with trackers", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      locked: { isLocked: false, email: "johndoe@example.com" },
      trackers: [
        "https://opentracker.i2p.rocks:443/announce",
        "udp://tracker.opentrackr.org:1337/announce",
      ]
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with custom channel tags", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        }
      ],
      customTags: [
        {
          name: "fooTag",
          attributes: { "bar": "baz" },
        },
        {
          name: "fooTag",
          attributes: { "bar": "baz" },
          value: "42",
        },
        {
          name: "biz:buzzItem",
          value: "43",
          cdata: true,
        },
        {
          name: "biz:buzzItem",
          value: [
            {
              name: "exampleTag",
              value: "example tag with cdata",
              cdata: true,
            },
          ],
        },
        {
          name: "biz:buzzItem",
          value: [
            {
              name: "exampleTag",
              value: "example tag without cdata",
            },
          ],
          cdata: true,
        },
      ]
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world?link=sanitized&value=2",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          link: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          link: "https://example.com/joesmith",
        },
        {
          name: "Joe Smith, Name Only",
        },
      ],
      category: [
        {
          name: "Grateful Dead",
        },
        {
          name: "MSFT",
          domain: "http://www.fool.com/cusips",
        },
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png", }],
      published,
      nsfw: false,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item socialInteract", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world2",
      description: "This is an article about Hello World.",
      socialInteract: [
        {
          uri: "https://example.com/@john/1234",
          protocol: "activitypub",
          accountId: "@john",
          accountUrl: "https://example.com/@john",
          priority: 1
        },
        {
          uri: "https://twitter.com/example_account/status/42",
          protocol: "twitter",
          priority: 2
        },
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png", }],
      published,
      nsfw: false,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item explicit", () => {
    const sampleFeed = new Feed({
      title: "Feed Title",
      copyright: "All rights reserved 2013, John Doe",
      updated,
      nsfw: true,
      customXMLNS: [
        {
          name: "biz",
          value: "http://example.com/biz-xmlns"
        },
      ],
    })

    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world3",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png", }],
      published,
      nsfw: true,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item guid", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      guid: "42",
      link: "https://example.com/hello-world4",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png", }],
      published,
      nsfw: false,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item with custom tags", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world4",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png", }],
      published,
      nsfw: false,
      customTags: [
        {
          name: "fooTag",
          attributes: { "bar": "baz" },
        },
        {
          name: "fooTag",
          attributes: { "bar": "baz" },
          value: "42",
        },
        {
          name: "biz:buzz",
          value: "43",
          cdata: true,
        },
        {
          name: "biz:buzz",
          attributes: { "bar": "https://foo?bar=baz&fizz='buzz'" },
        },
        {
          name: "biz:buzz",
          value: [
            {
              name: "exampleTag",
              value: "example tag with cdata",
              cdata: true,
            },
          ],
        },
        {
          name: "biz:buzz",
          value: [
            {
              name: "exampleTag",
              value: "example tag without cdata",
            },
          ],
          cdata: true,
        },
        {
          name: "biz:buzz",
          value: [
            {
              name: "biz:bar",
              value: [
                {
                  name: "biz:dwarfFortress",
                  value: "Losing is fun",
                  cdata: true,
                },
              ],
            },
          ],
        },
      ]
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item guid enclosure", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png", }],
      published,
      nsfw: false,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item images", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world5",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [
        { url: "https://example.com/images/ep1/pci_avatar-massive.jpg", width: 1500 },
        { url: "https://example.com/images/ep1/pci_avatar-middle.jpg", width: 600 },
        { url: "https://example.com/images/ep1/pci_avatar-small.jpg", width: 300 },
        { url: "https://example.com/images/ep1/pci_avatar-tiny.jpg", width: 150 },
      ],
      published,
      nsfw: false,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item transcript", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world14",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      subTitle: [
        {
          type: "text/vtt",
          url: "https://example.com/hello-world-es.vtt",
          language: "es",
          rel: "captions"
        }
      ],
      published,
      nsfw: false,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast item multiple enclosures", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world6",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
        {
          type: "audio/opus",
          length: 1234,
          sources: [
            { uri: "https://example.com/hello-world.opus", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })

  it("should generate a valid feed with a podcast item multiple sources", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world7",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
            { uri: "https://example.com/hello-world-mp3.torrent", contentType: "application/x-bittorrent" },
          ],
        },
        {
          type: "audio/opus",
          length: 1234,
          sources: [
            { uri: "https://example.com/hello-world.opus", },
            { uri: "https://example.com/hello-world-opus.torrent", contentType: "application/x-bittorrent" },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })

  it("should generate a valid feed with a podcast item enclosure integrity", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world8",
      description: "This is an article about Hello World.",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
          integrity: [
            { type: IntegrityType.sri, value: "sha384-ExVqijgYHm15PqQqdXfW95x+Rs6C+d6E/ICxyQOeFevnxNLR/wtJNrNYTjIysUBo" },
            { type: IntegrityType.pgpSignature, value: "pgp-signature-value-here" },
          ]
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })

  it("should generate a valid feed with a podcast item person", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world9",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      person: [
        {
          name: "Jane Doe",
          img: "https://example.com/jane-doe.png",
          href: "https://example.com/janedoe?link=sanitized&value=2",
          role: "guest",
          group: "visuals",
        },
        {
          name: "John Smith",
          img: "https://example.com/john-smith.png",
          href: "https://example.com/johnsmith",
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })

  it("should generate a valid feed with a podcast item stun servers", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world10",
      description: "This is an article about Hello World.",
      stunServers: [
        "stun:stun.zoiper.com:3478",
        "stun:stunserver.org:3478",
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
            { uri: "https://example.com/hello-world-mp3.torrent", contentType: "application/x-bittorrent" },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })

  it("should generate a valid feed with a podcast item trackers", () => {
    sampleFeed.addPodcastItem({
      title: "Hello World",
      link: "https://example.com/hello-world10",
      description: "This is an article about Hello World.",
      trackers: [
        "udp://tracker.example.com:69420",
        "wss://example.com/tracker/socket",
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
            { uri: "https://example.com/hello-world-mp3.torrent", contentType: "application/x-bittorrent" },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast liveItem pending", () => {
    sampleFeed.addPodcastLiveItem({
      title: "Hello World live pending",
      link: "https://example.com/hello-world13",
      guid: "some live episode 341234",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          link: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          link: "https://example.com/joesmith",
        },
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
      nsfw: true,
      status: LiveItemStatus.pending,
      start: "2022-12-17T01:00:00.000Z",
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
  it("should generate a valid feed with a podcast liveItem", () => {
    sampleFeed.addPodcastLiveItem({
      title: "Hello World live",
      link: "https://example.com/hello-world12",
      guid: "some live episode 341235",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          link: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          link: "https://example.com/joesmith",
        },
      ],
      category: [
        {
          name: "Grateful Dead",
        },
        {
          name: "MSFT",
          domain: "http://www.fool.com/cusips",
        },
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
      nsfw: false,
      status: LiveItemStatus.live,
      start: "2022-12-16T01:10:43.562Z",
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })

  it("should generate a valid feed with a podcast liveItem ended", () => {
    sampleFeed.addPodcastLiveItem({
      title: "Hello World live ended",
      link: "https://example.com/hello-world11",
      guid: "some live episode 341234",
      description: "This is an article about Hello World.",
      content: "Content of my item",
      author: [
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          link: "https://example.com/janedoe",
        },
        {
          name: "Joe Smith",
          email: "joesmith@example.com",
          link: "https://example.com/joesmith",
        },
      ],
      media: [
        {
          type: "audio/mpeg",
          length: 12345,
          sources: [
            { uri: "https://example.com/hello-world.mp3", },
          ],
        },
      ],
      date: updated,
      thumbnails: [{ url: "https://example.com/hello-world.png" }],
      published,
      nsfw: false,
      status: LiveItemStatus.ended,
      start: "2022-12-15T01:01:00.000Z",
      end: "2022-12-15T03:59:45.020Z",
    })
    const actual = sampleFeed.podcast()
    expect(actual).toMatchSnapshot()
  })
})
