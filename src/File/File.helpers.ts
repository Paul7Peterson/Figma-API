
import { getFigmaAPI } from '../_shared';

import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';
import type { IFilePreview } from './File.types';


/** */
export async function listImages (file: IFilePreview, ids: string[]): Promise<{ [nodeId: string]: HTTP_URL | null; }> {
  const { images } = await getFigmaAPI().getImage(file.id, {
    ids: ids.join(','),
    scale: 1,
    format: 'svg',
  });
  return images as { [nodeId: string]: HTTP_URL | null; };
}

/** */
export async function getImage (file: IFilePreview, id: string): Promise<HTTP_URL> {
  const img = (await listImages(file, [id]))[id];
  if (!img) throw new Error('');
  return img;
}
