export interface Item {
  title: string
  id?: string
  link: string
  date: Date

  description?: string
  content?: string
  category?: Category[]

  guid?: string

  image?: string | Enclosure
  audio?: string | Enclosure
  video?: string | Enclosure
  enclosure?: Enclosure

  author?: Author[]
  contributor?: Author[]

  published?: Date
  copyright?: string

  extensions?: Extension[]

  categories?: {
    value: number | string
    label?: string
  }[]

  community?: {
    statistics: {
      views: number
    }
  }

  embed?: {
    url: string
    allowFullscreen: true
  }

  keywords?: string[]

  subTitle?: {
    type: string
    lang: string
    href: string
  }[]

  player?: {
    url: string
  }

  torrents?: {
    url: string
    title?: string
    size_in_bytes?: number
  }[]

  videos?: {
    type?: string
    medium?: string
    height?: number
    fileSize?: number
    url?: string
    framerate?: number
    duration?: number
  }[]

  thumbnails?: {
    url: string
    height: number
    width: number
  }[]

  nsfw?: boolean
}

export interface PodcastItem {
  title: string
  id?: string
  link: string
  date: Date

  description?: string
  content?: string
  category?: Category[]

  guid?: string

  media: Media[]

  author?: Author[]
  person?: Person[]

  published?: Date
  copyright?: string

  subTitle?: {
    url: string
    type: string
    language?: string
    rel?: string
  }[]

  thumbnails?: {
    url: string
    width?: number
  }[]

  stunServers?: string[]
  trackers?: string[]

  socialInteract?: SocialInteract[]

  nsfw?: boolean

  customTags?: CustomTag[]
}

export interface PodcastLiveItem extends PodcastItem {
  status: LiveItemStatus
  start?: string
  end?: string
}

export enum LiveItemStatus {
  pending = "pending",
  live = "live",
  ended = "ended",
}

export interface Enclosure {
  url: string
  type?: string
  length?: number
  title?: string
  duration?: number
}

export interface Media {
  type: string
  codecs?: string
  length?: number
  bitrate?: number
  height?: number
  title?: string
  rel?: string
  language?: string

  sources: Source[]

  integrity?: SourceIntegrity[]
}

export interface Source {
  uri: string
  contentType?: string
}

export interface SourceIntegrity {
  type: IntegrityType
  value: string
}

export enum IntegrityType {
  sri = "sri",
  pgpSignature = "pgp-signature"
}

export interface SocialInteract {
  uri: string
  protocol: string
  accountId?: string
  accountUrl?: string
  priority?: number
}

export interface Author {
  name?: string
  email?: string
  link?: string
}

export interface Person {
  name: string
  href?: string
  img?: string
  role?: string
  group?: string
}

export interface Category {
  name?: string
  domain?: string
  scheme?: string
  term?: string
}

export interface FeedOptions {
  id?: string
  guid?: string
  title: string
  updated?: Date
  generator?: string
  language?: string
  ttl?: number

  feed?: string
  feedLinks?: any
  hub?: string
  docs?: string
  medium?: string

  author?: Author
  managingEditor?: Author,
  webMaster?: Author,
  person?: Person[]
  locked?: { isLocked: boolean, email: string }
  link?: string
  description?: string
  image?: string
  favicon?: string
  copyright: string
  nsfw?: boolean,

  stunServers?: string[]
  trackers?: string[]

  customXMLNS?: CustomXMLNS[]
  customTags?: CustomTag[]
}

export interface Extension {
  name: string
  objects: any
}

export interface CustomXMLNS {
  name: string,
  value: string
}

export interface CustomTag {
  name: string
  attributes?: { [key: string]: string }
  value?: string | CustomTag[]
  cdata?: boolean
}
