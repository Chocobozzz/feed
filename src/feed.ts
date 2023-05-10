import renderAtom from "./atom1";
import renderJSON from "./json";
import renderPodcastRSS from "./podcast";
import renderRSS from "./rss2";
import { Author, Extension, FeedOptions, Item, PodcastItem, PodcastLiveItem } from "./typings";

export { Author, Extension, FeedOptions, Item, PodcastItem, PodcastLiveItem };

/**
 * Class used to generate Feeds
 */
export class Feed {
  options: FeedOptions;
  items: Item[] = [];
  podcastItems: PodcastItem[] = [];
  podcastLiveItems: PodcastLiveItem[] = [];
  categories: string[] = [];
  contributors: Author[] = [];
  extensions: Extension[] = [];

  constructor(options: FeedOptions) {
    this.options = options;
  }

  /**
   * Add a feed item
   * @param item
   */
  public addItem = (item: Item) => this.items.push(item);

  /**
   * Add a feed podcast item
   * @param podcastItem
   */
  public addPodcastItem = (podcastItem: PodcastItem) => this.podcastItems.push(podcastItem);

  /**
  * Add a feed podcast liveItem
  * @param podcastLiveItem
  */
  public addPodcastLiveItem = (podcastLiveItem: PodcastLiveItem) => this.podcastLiveItems.push(podcastLiveItem);

  /**
   * Add a category
   * @param category
   */
  public addCategory = (category: string) => this.categories.push(category);

  /**
   * Add a contributor
   * @param contributor
   */
  public addContributor = (contributor: Author) => this.contributors.push(contributor);

  /**
   * Adds an extension
   * @param extension
   */
  public addExtension = (extension: Extension) => this.extensions.push(extension);

  /**
   * Returns a Atom 1.0 feed
   */
  public atom1 = (): string => renderAtom(this);

  /**
   * Returns a RSS 2.0 feed
   */
  public rss2 = (): string => renderRSS(this);

  /**
   * 
   * Returns a RSS 2.0 feed using the Podcast Namespace
   */
  public podcast = (): string => renderPodcastRSS(this);

  /**
   * Returns a JSON1 feed
   */
  public json1 = (): string => renderJSON(this);
}
