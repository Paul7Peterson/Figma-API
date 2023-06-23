import type { ITextStyle } from './Text.types';
import { camelCase, joinLines } from '@paul7peterson/typescript-toolbox';

import { BaseStyle } from './_baseStyle';
import { assertText } from './_shared.helpers';

import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import type { IFile } from '../File';
export class TextStyle extends BaseStyle implements ITextStyle {
  readonly type = 'TEXT';
  readonly textType: ITextStyle['textType'];
  readonly fontFamily: ITextStyle['fontFamily'];
  readonly fontSize: ITextStyle['fontSize'];
  readonly fontWeight: ITextStyle['fontWeight'];

  constructor (
    _file: IFile,
    style: FigmaAPITypes.StyleMetadata,
    document: Figma.Node<keyof Figma.NodeTypes>,
  ) {
    super(_file, style);

    const [figmaName, _modifier] = style.name.split('/');

    const type = camelCase(figmaName);
    if (!['heading'].includes(type))
      throw new Error(`🟥 Unknown type for "${style.name}"`);
    this.textType = type;

    if (!assertText(style.name, document))
      throw new Error(`🟥 No text for "${style.name}"`);
    const font = document.style;

    this.fontFamily = font.fontFamily;
    this.fontSize = font.fontSize;
    this.fontWeight = font.fontWeight;
  }

  toTSData (): string {
    return joinLines([
      '{',
      `    fontFamily: '${this.fontFamily}',`,
      `    fontSize: ${this.fontSize},`,
      `    fontWeight: ${this.fontWeight},`,
      '  },',
    ]);
  }
}
