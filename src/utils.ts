import { CustomTag, CustomXMLNS } from './typings'

export function sanitize(url: string | undefined | null): string | undefined | null {
  if (typeof url === 'string') {
    return url.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }
  return url
}

export function addCustomXMLNS (rss: { _attributes: { [key: string]: string } }, customXMLNS: CustomXMLNS[]) {
  Object.assign(rss._attributes, customXMLNS.reduce(
    (acc: { [key: string]: string }, c) => {
      const xmlnsName = `xmlns:${c.name}`
      if (xmlnsName in acc) return acc

      acc[xmlnsName] = c.value
      return acc
    }, {}))
}


export function addCustomTagsToObject (o: { [key: string]: object | object[] | string }, customTags: CustomTag[]) {
  const tagsByName: { [key: string]: CustomTag[] } = customTags.reduce(
    (tags: { [key: string]: CustomTag[] }, d) => {
      if (d.name in tags) return tags

      tags[d.name] = customTags.filter(g => g.name === d.name)
      return tags
    }, {})

  Object.keys(tagsByName).forEach((tagName) => {
    // Don't allow custom tags to override existing tags
    if (tagName in o) return

    o[tagName] = tagsByName[tagName].map((tag) => {
      let sanitizedAttributes: { [key: string]: string } = {}
      if (tag.attributes) {
        sanitizedAttributes = Object.keys(tag.attributes).reduce((cur, key) => {
          if (tag.attributes) {
            cur[key] = sanitize(tag.attributes[key]) ?? ""
          }
          return cur
        }, sanitizedAttributes)
      }

      const tagObject: { [key: string]: object | object[] | string } = {
        ...(sanitizedAttributes && { _attributes: sanitizedAttributes }),
      }

      if (typeof tag.value === "string") {
        return {
          ...tagObject,
          ...(tag.cdata && tag.value && { _cdata: tag.value }),
          ...(!tag.cdata && tag.value && { _text: tag.value })
        }
      } else if (tag.value) {
        addCustomTagsToObject(tagObject, tag.value)

        return tagObject
      } else {
        return tagObject
      }
    }).filter((tagObject) => !!tagObject)
  })
}
