import type { ColorName } from './Color.helpers';
import type { IBaseStyle } from './_baseStyle.types';

export type ColorGeneralName = `${IColorStyle['color']}/${number}`;

export interface IColorStyle extends IBaseStyle {
  readonly type: 'FILL';
  readonly name: ColorGeneralName;
  readonly color: ColorName | 'Grey',
  readonly shade: number,
  readonly HSL: string;
  readonly HEX: string;
  readonly RGB: string;
  readonly token: `--grey-${number}` | `--color-${string}-${number}`;
}