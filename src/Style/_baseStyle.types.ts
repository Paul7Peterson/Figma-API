import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';

import type { IFilePreview } from '../File';

import type * as Figma from 'figma-api';

/** */
export interface IBaseStyle {
  /** */
  readonly id: string;
  /** */
  readonly name: string;
  /** */
  readonly type: Figma.StyleType;
  /** */
  readonly thumbnailURL: HTTP_URL;
  /** */
  readonly createdAt: Date;
  /** */
  readonly updatedAt: Date;
  /** */
  readonly file: IFilePreview;
}
