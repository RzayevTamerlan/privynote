import { textareaPlaceholders } from '@constants/textarea-placeholders';

export const getRandomPlaceholder = () => {
  return textareaPlaceholders[Math.floor(Math.random() * textareaPlaceholders.length)];
};