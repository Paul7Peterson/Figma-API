import { $File } from '@paul7peterson/typescript-toolbox';

import { getImage } from './File.helpers';

import type { FilePath, FileType } from '@paul7peterson/typescript-toolbox';

import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';
import type * as Figma from 'figma-api';
import type { IFile } from './File.types';
import type { IPage, IPageAPI } from './Page.types';

export class PageClass implements IPage {
  readonly __class__: IPage['__class__'] = 'FIGMA_PAGE';
  readonly id: string;
  readonly name: string;
  readonly children: Figma.Node<keyof Figma.NodeTypes>[];

  protected constructor (
    readonly file: IFile,
    page: Figma.Node<'CANVAS'>,
  ) {
    this.id = page.id;
    this.name = page.name;
    this.children = page.children;
  }

  static list (file: IFile): IPage[] {
    return file.document.children.map((page) => {
      if (page.type !== 'CANVAS') throw new Error('The page of a file must be a canvas');
      return new PageClass(file, page as Figma.Node<'CANVAS'>);
    });
  }
  static get (file: IFile, pageName: IPage['name']): IPage {
    const cleanName = pageName.toLowerCase().trim();
    const page = PageClass.list(file).find(({ name }) => name
      .toLowerCase()
      .trim()
      .endsWith(cleanName));
    if (!page) throw new Error(`Page "${pageName}" not found.`);
    return page;
  }
  async getImageURL (): Promise<HTTP_URL> {
    return getImage(this.file, this.id);
  }
  async downloadImage (path: FilePath<FileType.SVG>): Promise<void> {
    await new $File(path as any).download(await this.getImageURL()); // FIXME
  }

}

export const Page: IPageAPI = PageClass;
