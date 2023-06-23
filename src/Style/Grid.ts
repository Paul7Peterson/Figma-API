
import { BaseStyle } from './_baseStyle';

import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import type { IFile } from '../File';
import type { IGridStyle } from './Grid.types';

export class GridStyle extends BaseStyle implements IGridStyle {
  readonly type = 'GRID';

  constructor (
    _file: IFile,
    style: FigmaAPITypes.StyleMetadata,
    document: Figma.Node<keyof Figma.NodeTypes>,
  ) {
    super(_file, style);
  }
}