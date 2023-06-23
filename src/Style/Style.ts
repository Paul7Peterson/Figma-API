import type { IFile } from '../File';
import { yellow } from 'chalk';

import { getFigmaAPI } from '../_shared';
import { ColorStyle } from './Color';
import { EffectStyle } from './Effect';
import { GridStyle } from './Grid';
import { TextStyle } from './Text';

import type { IStyle, IStypeAPI } from './Style.types';
import type { StyleMetadata } from 'figma-api/lib/api-types';
import type * as Figma from 'figma-api';


function parseStyle (file: IFile, style: StyleMetadata, document: Figma.Node<keyof Figma.NodeTypes>): IStyle | null {
  try {
    switch (style.style_type) {
      case 'FILL': return new ColorStyle(file, style, document);
      case 'TEXT': return new TextStyle(file, style, document);
      case 'EFFECT': return new EffectStyle(file, style, document);
      case 'GRID': return new GridStyle(file, style, document);
      default: throw new Error('Not implemented.');
    }
  } catch (e) {
    console.warn(yellow((e as Error).message));
    return null;
  }
}

export const Style: IStypeAPI = {
  list: async (file: IFile): Promise<IStyle[]> => {
    const nodeIds = Array.from(file.styles.keys());

    return getFigmaAPI().getFileNodes(file.id, nodeIds)
      .then(({ nodes }) => {
        const styles: IStyle[] = [];

        Object.entries(nodes).forEach(([id, node]) => {
          const style = file.styles.get(id);
          if (!style) throw new Error('No reference style.');
          if (!node) throw new Error(`No node for style "${file.styles.get(id)?.name}"`);
          if (!node.document) throw new Error(`No document for style "${file.styles.get(id)?.name}"`);

          const parsedStyle = parseStyle(file, style, node.document);
          if (!parsedStyle) return;
          styles.push(parsedStyle);
        });

        return styles;
      });
  },
};
