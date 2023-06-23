import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';
import type { ClassTyping, ValuesOf } from '@paul7peterson/typescript-toolbox';

import type { IFile, IFilePreview } from '../File';


export interface INode extends ClassTyping<'FIGMA_NODE'> {
  /** */
  readonly id: string;
  /** */
  readonly type: keyof Figma.NodeTypes;
  /** */
  readonly document: Figma.Node;
  /** */
  readonly components: {
    [nodeId: string]: Figma.Component;
  };
  readonly schemaVersion: number;
  /** */
  readonly styles: {
    [styleName: string]: Figma.Style;
  };
  /** */
  // getCSSStyle: () => string;
  /** */
  listChildNodes (file: IFile, depth?: number): Promise<INode[]>;
  /** */
  getChildNodes (file: IFile, childId: string): Promise<INode>;
}

/** */
export interface INodeAPI {
  /** */
  list (file: IFilePreview, ids: INode['id'][]): Promise<INode[]>;
  /** */
  get (file: IFilePreview, nodeId: INode['id']): Promise<INode>;
}

/** */
export type FigmaNodeRef =
  ValuesOf<FigmaAPITypes.GetFileNodesResult['nodes']>;
