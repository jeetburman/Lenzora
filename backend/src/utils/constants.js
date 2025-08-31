// utils/constants.js
export const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const AI_ACTIONS = {
  ENHANCE: 'enhance',
  BACKGROUND_REMOVE: 'background_remove',
  STYLE_TRANSFER: 'style_transfer',
  COLORIZE: 'colorize',
  UPSCALE: 'upscale',
  OBJECT_REMOVE: 'object_remove'
};

export const EDIT_ACTIONS = {
  CROP: 'crop',
  ROTATE: 'rotate',
  FILTER: 'filter',
  ADJUST: 'adjustments'
};