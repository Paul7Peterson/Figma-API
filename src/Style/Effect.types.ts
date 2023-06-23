
import type { IBaseStyle } from './_baseStyle.types';

export interface IEffectStyle extends IBaseStyle {
  readonly type: 'EFFECT';
  readonly effectType: 'elevation' | 'dieCut',
  readonly level: number,
  readonly boxShadow: [string, string, string];
  readonly token: `--${'elevation' | 'die-cut'}-${number}`;
}