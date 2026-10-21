/**
 * WordPress Headless CMS Configuration
 * 
 * Keep the base URL in this single location so it can easily be swapped
 * to a custom production domain without modifying application components.
 */

export const WORDPRESS_CONFIG = {
  apiBaseUrl:
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WORDPRESS_API_URL) ||
    'https://cms.spacedesk.in/wp-json',
  postsEndpoint: '/wp/v2/posts',
  categoriesEndpoint: '/wp/v2/categories',
  defaultPerPage: 10,
  defaultFeaturedFallbackImage:
    'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
};
