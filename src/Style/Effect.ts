import type { IEffectStyle } from './Effect.types';
import { camelCase, joinLines, objectEntries } from '@paul7peterson/typescript-toolbox';

import { BaseStyle } from './_baseStyle';
import { assertRectangle } from './_shared.helpers';
import { colorToHEX } from './Color.helpers';
import { shadowToValue } from './Effect.helpers';

import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import type { IFile } from '../File';
import type { SurfaceValue } from '../../src/tokens';

export class EffectStyle extends BaseStyle implements IEffectStyle {
  readonly type = 'EFFECT';
  readonly effectType: IEffectStyle['effectType'];
  readonly level: IEffectStyle['level'];
  readonly boxShadow: IEffectStyle['boxShadow'];

  constructor (
    _file: IFile,
    style: FigmaAPITypes.StyleMetadata,
    document: Figma.Node<keyof Figma.NodeTypes>,
  ) {
    super(_file, style);

    const [figmaName, figmaLevel] = style.name.split('/');
    this.level = +figmaLevel;

    const type = camelCase(figmaName);
    if (!['elevation', 'dieCut'].includes(type))
      throw new Error(`🟥 Unknown type for "${style.name}". It must be "elevation" or "dieCut"`);
    this.effectType = type;

    if (!assertRectangle(style.name, document))
      throw new Error(`🟥 No rectangle for "${style.name}"`);
    const effects = document.effects || [];

    // Based on: https://github.com/material-components/material-components-web/blob/master/packages/mdc-elevation/_elevation-theme.scss

    try {
      const umbra = effects.find((e) => Math.round((e.color?.a || 0) * 100) === 12);
      if (!umbra)
        throw new Error(`🟨 No umbra value in "${style.name}"`);
      if (!colorToHEX(umbra.color!).startsWith('#000000'))
        throw new Error(`🟨 Umbra color must be black for "${style.name}".`);

      const preumbra = effects.find((e) => Math.round((e.color?.a || 0) * 100) === 14);
      if (!preumbra)
        throw new Error(`🟨 No preumbra value in "${style.name}"`);
      if (!colorToHEX(preumbra.color!).startsWith('#000000'))
        throw new Error(`🟨 Preumbra color must be black for "${style.name}".`);
      if (preumbra.offset?.y !== this.level)
        throw new Error(`🟨 Preumbra Y value must match the level value for "${style.name}".`);

      const ambient = effects.find((e) => Math.round((e.color?.a || 0) * 100) === 20);
      if (!ambient)
        throw new Error(`🟨 No ambient value in "${style.name}"`);
      if (!colorToHEX(ambient.color!).startsWith('#000000'))
        throw new Error(`🟨 Ambient color must be black for "${style.name}".`);

      this.boxShadow = [
        shadowToValue(umbra!),
        shadowToValue(preumbra!),
        shadowToValue(ambient!),
      ];

    } catch (e) {
      if (e instanceof Error) {
        const values = effects.map((e) => Math.round((e.color?.a || 0) * 100));
        throw new Error(`${e.message}.\n The available opacities are "${values}"`);
      } else
        throw new Error('Unknown type of error');
    }
  }

  get token (): IEffectStyle['token'] {
    const type = this.effectType === 'elevation' ? 'elevation' : 'die-cut';
    return `--${type}-${this.level}`;
  }

  toTSData (): string {
    const data: SurfaceValue = {
      type: this.effectType,
      boxShadow: this.boxShadow,
      token: this.token,
      level: this.level,
    };

    return joinLines([
      '{',
      ...objectEntries(data).map(([k, v]) =>
        `    ${k}: ${typeof v === 'string' ? `'${v}'` : (Array.isArray(v) ? `[${v.map((x) => `'${x}'`).join(', ')}] as const` : v)},`),
      '  } satisfies SurfaceValue,',
    ]);
  }
}
