import { getStrapiURL } from "./api";

export function getStrapiMedia(media: any) {
    const imageUrl = media.data.attributes.url.startsWith("/")
        ? getStrapiURL(media.data.attributes.url).replace('/api/', '/')
        : media.url;
    return imageUrl;
}