/**
 * Format a date string or ISO date to a readable format
 */
export function formatDate(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Calculate reading time for a given string of content
 */
export function calculateReadingTime(content: string): string {
  if (!content) return '1 min read';
  
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/g).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
}

/**
 * Truncate text to a certain length 
 */
export function truncateText(text: string, length: number): string {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return text.slice(0, length).trim() + '...';
}

/**
 * Convert Sanity image reference to URL string
 * This is a utility function for when you can't use the urlFor helper directly
 */
export function getImageUrl(image: any): string {
  if (!image || !image.asset) return '';
  
  // Format is projectId-dataset-assetId-dimensions-extension
  const reference = image.asset._ref || '';
  if (!reference) return '';
  
  // Extract assetId from reference (format: image-assetId-dimensions-extension)
  const [, assetId, dimensions, extension] = reference.split('-');
  
  if (!assetId || !dimensions || !extension) {
    return '';
  }
  
  return `https://cdn.sanity.io/images/3l2sn7zb/production/${assetId}-${dimensions}.${extension}`;
} 