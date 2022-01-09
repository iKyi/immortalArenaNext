import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
  let imageUrl = "null";
  if (media && media.data && media.data.attributes) {
    imageUrl = media.data.attributes.url.startsWith("/")
      ? getStrapiURL(media.data.attributes.url).replace("/api/", "/")
      : media.url;
  } else if (media.url) {
    imageUrl = media.url;
  }
  return imageUrl;
}
