import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "../env";

// Build from the plain project config (not the client). The client-based
// builder reaches into client internals that can be null during static
// prerender; projectId + dataset is all the URL builder actually needs.
const builder = createImageUrlBuilder({ projectId, dataset });

// Derive the accepted source type from the builder (avoids version-specific
// deep type imports).
type ImageSource = Parameters<typeof builder.image>[0];

/** Build a CDN URL for a Sanity image (with hotspot/crop support). */
export function urlForImage(source: ImageSource) {
  return builder.image(source).auto("format").fit("max");
}
