
import type { IFilePreview } from '../File';

import type { IColorStyle } from './Color.types';
import type { IGridStyle } from './Grid.types';
import type { ITextStyle } from './Text.types';
import type { IEffectStyle } from './Effect.types';

/** */
export type IStyle =
  | IGridStyle
  | ITextStyle
  | IColorStyle
  | IEffectStyle;

/** */
export interface IStypeAPI {
  /** */
  list (file: IFilePreview): Promise<IStyle[]>;
}
