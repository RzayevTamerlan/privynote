import sanitizeHtml from 'sanitize-html';

export const clearHtml = (html: string | null): { __html: string } => {
  const sanitizedContent = sanitizeHtml(html || '', {
    allowedTags: [
      'iframe', 'video', 'img', 'p', 'a', 'i', 'b',
      'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'strong', 'em', 'blockquote',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title'],
      iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
      video: ['src', 'width', 'height', 'controls', 'autoplay', 'loop'],
      '*': ['class', 'id', 'style'], // разрешить атрибуты для всех тегов
    },
  });

  return { __html: sanitizedContent };
};