import type { ColorGeneralName, IColorStyle } from './Color.types';
import { joinLines, objectEntries } from '@paul7peterson/typescript-toolbox';

import { BaseStyle } from './_baseStyle';
import { assertRectangle } from './_shared.helpers';
import { colorToHEX, colorToLCH, colorToRGB, getColorName, getRoundedLCHLuminosity, RGBToHSL } from './Color.helpers';

import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import type { IFile } from '../File';
import type { ColorValue } from '../../src/tokens';

const GREY_CHROMA_TRIGGER = 6;

const EXCEPTIONS = new Map<ColorGeneralName, ColorGeneralName>([
  // Is    =>  Should
  ['Grey/100', 'Grey/95'],
]);

export class ColorStyle extends BaseStyle implements IColorStyle {
  readonly type = 'FILL';
  readonly name: IColorStyle['name'];
  readonly color: IColorStyle['color'];
  readonly shade: IColorStyle['shade'];
  readonly #HSL: [number, number, number];
  readonly #RGB: [number, number, number];
  readonly HEX: string;

  constructor (
    _file: IFile,
    style: FigmaAPITypes.StyleMetadata,
    document: Figma.Node<keyof Figma.NodeTypes>,
  ) {
    super(_file, style);

    this.name = style.name as ColorGeneralName;

    if (!assertRectangle(style.name, document))
      throw new Error(`🟥 No rectangle for "${style.name}".`);

    const color = document.fills[0].color;
    if (!color) throw new Error(`🟥 No color for "${style.name}".`);

    this.#RGB = colorToRGB(color);
    this.#HSL = RGBToHSL(this.#RGB);
    this.HEX = colorToHEX(color);

    this.shade = getRoundedLCHLuminosity(this.#HSL);

    const chroma = colorToLCH(color)[1];
    this.color = chroma <= GREY_CHROMA_TRIGGER ? 'Grey' : getColorName(this.#HSL[0]);

    const [figmaName, figmaShade] = this.name.split('/');

    if (this.shade !== +figmaShade || this.color !== figmaName) {
      const exception = EXCEPTIONS.get(this.name);
      if (exception) {
        console.info(`✅ Exception applied for "${this.name}" for a must name of "${exception}".`);
        this.shade = +this.name.split('/')[1];
        this.color = this.name.split('/')[0] as IColorStyle['color'];
      } else
        throw new Error(`🟨 "${style.name}" should be named "${this.color}/${this.shade}"`);
    }
  }

  get token (): IColorStyle['token'] {
    return (this.color === 'Grey')
      ? `--grey-${this.shade}`
      : `--color-${this.color.toLowerCase()}-${this.shade}`;
  }

  get HSL (): IColorStyle['HSL'] {
    const fHSL = this.#HSL.map((v) => v.toString().padStart(3));
    return `hsl(${fHSL[0]}, ${fHSL[1]}%, ${fHSL[2]}%)`;
  }

  get RGB (): IColorStyle['RGB'] {
    const fRGB = this.#RGB.map((v) => v.toString().padStart(3));
    return `rgb(${fRGB[0]}, ${fRGB[1]}, ${fRGB[2]})`;
  }

  toTSData (): string {
    const data: ColorValue = {
      color: this.color,
      shade: this.shade,
      HSL: this.HSL,
      HEX: this.HEX,
      RGB: this.RGB,
      RGBChannels: this.#RGB,
      token: this.token,
    };

    return joinLines([
      '{',
      ...objectEntries(data).map(([k, v]) =>
        `      ${k}: ${typeof v === 'string' ? `'${v}'` : (Array.isArray(v) ? `[${v.join(', ')}] as const` : v)},`), // FIXME: use quote()
      '    } satisfies ColorValue,',
    ]);
  }
}
