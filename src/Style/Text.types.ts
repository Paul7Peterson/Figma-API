import type { IBaseStyle } from './_baseStyle.types';

export interface ITextStyle extends IBaseStyle {
  readonly type: 'TEXT';
  readonly textType: 'heading';
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number;
}