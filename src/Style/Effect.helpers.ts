import { colorToHEX } from './Color.helpers';

import type * as AST from 'figma-api/lib/ast-types';

export function shadowToValue (s: AST.Effect) {
  if (!s.color) throw new Error('');

  const values = [s.offset?.y || 0, s.radius, s.spread]
    .map((x) => (x ? `${x.toFixed(1)}px` : 0).toString().padStart(6)).join(' ');

  const x = s.offset?.x || 0;
  const alphaHEX = Math.round(s.color.a * 255).toString(16).toUpperCase().padStart(2, '0');
  const type = s.type === 'INNER_SHADOW' ? 'inset' : '     ';
  const color = colorToHEX(s.color);

  return `${type} ${x} ${values} ${color}${alphaHEX}`;
}