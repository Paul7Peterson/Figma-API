
import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';
import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import type { IFile } from '../File';
import type { IBaseStyle } from './_baseStyle.types';

export class BaseStyle implements IBaseStyle {
  readonly id: string;
  readonly name: string;
  readonly type: Figma.StyleType;
  readonly description: string;
  readonly thumbnailURL: HTTP_URL;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  readonly #file: IFile;

  constructor (
    _file: IFile,
    style: FigmaAPITypes.StyleMetadata,
  ) {
    this.id = style.key;
    this.name = style.name;
    this.description = style.description;
    this.type = style.style_type;
    this.thumbnailURL = style.thumbnail_url as HTTP_URL;
    this.createdAt = new Date(style.created_at);
    this.updatedAt = new Date(style.updated_at);

    this.#file = _file;
  }

  get file (): IFile { return this.#file; }
}
