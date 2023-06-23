import type * as Figma from 'figma-api';
import type { ClassTyping, HTTP_URL } from '@paul7peterson/typescript-toolbox';

import type { IFile } from './File.types';

/**### Figma Page */
export interface IPage extends ClassTyping<'FIGMA_PAGE'> {
  /** */
  readonly id: string;
  /** */
  readonly name: string;
  /** */
  readonly file: IFile;
  /** */
  readonly children: Figma.Node<keyof Figma.NodeTypes>[];
  /** ... */
  getImageURL (): Promise<HTTP_URL | null>;
  /** ... */
  downloadImage (path: `${string}/${string}.svg`): Promise<void>;
}


export interface IPageAPI {
  /** */
  list (file: IFile): IPage[];
  /** */
  get (file: IFile, pageName: IPage['name']): IPage;
}
