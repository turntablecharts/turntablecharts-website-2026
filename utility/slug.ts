/**
 * Convert text to URL-friendly slug
 */
export const toSlug = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Create a slug from ID and title
 * Format: {id}-{title-slug}
 */
export const createNewsSlug = (id: number, title: string): string =>
  `${id}-${toSlug(title)}`;

/**
 * Extract ID from slug
 * Format: {id}-{title-slug}
 */
export const extractIdFromSlug = (slug: string): string =>
  slug.split("-")[0];
