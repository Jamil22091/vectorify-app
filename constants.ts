import { VectorStyle } from './types';

export const APP_TITLE = "Vectorize AI";
export const MAX_FILE_SIZE_MB = 10;

export const VECTOR_STYLES: VectorStyle[] = [
  {
    id: 'flat',
    name: 'Flat Vector',
    description: 'Clean, geometric shapes with solid flat colors.',
    prompt: 'Redraw this image as a high-quality flat vector illustration. Use clean geometric shapes, solid colors, and no gradients. Minimalist and modern design.'
  },
  {
    id: 'anime',
    name: 'Anime / Cel Shaded',
    description: 'Distinct line art with cel-shaded coloring.',
    prompt: 'Redraw this image in a high-quality anime vector style. Use distinct black outlines, vibrant colors, and cel shading techniques. Digital illustration style.'
  },
  {
    id: 'sticker',
    name: 'Sticker Art',
    description: 'Bold white borders and simplified details.',
    prompt: 'Create a die-cut sticker design from this image. Use thick white borders, bold outlines, and simplified vector shading. Suitable for printing.'
  },
  {
    id: 'lineart',
    name: 'Monoline',
    description: 'Black and white elegant line work.',
    prompt: 'Redraw this image as a black and white vector line art. Use consistent line weight, no fill, and elegant curves. Minimalist drawing.'
  },
  {
    id: 'ink',
    name: 'Detailed Ink',
    description: 'Bold black and white ink drawing style.',
    prompt: 'Redraw this image as a detailed black and white vector ink illustration. Use bold lines, strong contrast with solid black areas, and decorative line work. Similar to a woodcut or engraving. Professional vector art style.'
  },
  {
    id: 'lowpoly',
    name: 'Low Poly',
    description: 'Geometric triangular mesh style.',
    prompt: 'Recreate this image in a low poly vector art style. Use triangular geometric meshes and a vibrant color palette to define forms.'
  }
];