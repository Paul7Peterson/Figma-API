import type { GetFileNodesResult } from 'figma-api/lib/api-types';

import { getFigmaAPI } from '../_shared';

import type { IFilePreview } from '../File';
import type { INode, FigmaNodeRef, INodeAPI } from './Node.types';



export class NodeClass implements INode {
  readonly __class__: INode['__class__'] = 'FIGMA_NODE';
  readonly id: string;
  readonly type: INode['type'];
  readonly document: INode['document'];
  readonly components: INode['components'];
  readonly schemaVersion: number;
  readonly styles: INode['styles'];

  protected constructor (
    readonly file: IFilePreview,
    node: FigmaNodeRef,
    id: string,
  ) {
    if (!node) throw new Error('No node');
    this.id = id;
    this.type = node.document.type;
    this.document = node.document;
    this.components = node.components;
    this.schemaVersion = node.schemaVersion;
    this.styles = node.styles;
  }

  static async list (file: IFilePreview, ids: INode['id'][]): Promise<INode[]> {
    return getFigmaAPI().getFileNodes(file.id, ids, {
      // plugin_data: PLUGIN_DATA 
    })
      .then(({ nodes }) => Object.entries(nodes).map(([id, node]) => new NodeClass(file, node, id)));
  }

  static async get (file: IFilePreview, nodeId: INode['id']): Promise<INode> {
    return NodeClass.#getNodes(file, [nodeId]).then(({ nodes }) => {
      const node = nodes[nodeId];
      if (!node) throw new Error('');
      return new NodeClass(file, node, nodeId);
    });
  }

  async listChildNodes (file: IFilePreview, depth?: number): Promise<INode[]> {
    return getFigmaAPI().getFileNodes(file.id, [this.id], {
      depth,
      // plugin_data: PLUGIN_DATA,
    }).then(({ nodes }) =>
      Object.entries(nodes).map(([id, node]) => new NodeClass(file, node, id)));
  }

  async getChildNodes (file: IFilePreview, childId: string): Promise<INode> {
    return getFigmaAPI().getFileNodes(file.id, [this.id], {
      // plugin_data: PLUGIN_DATA,
    }).then(({ nodes }) => {
      const node = nodes[childId];
      if (!node) throw new Error('');
      return new NodeClass(file, node, childId);
    });
  }

  static async #getNodes (file: IFilePreview, ids: INode['id'][]): Promise<GetFileNodesResult> {
    return getFigmaAPI().getFileNodes(file.id, ids, {
      // plugin_data: PLUGIN_DATA,
    });
  }

  // getCSSStyle (): string {
  //   const CSS = generateCSS(this);
  //   return Object.entries(CSS)
  //     .map(([key, value]) => `${key}: ${value};`)
  //     .join('\n');
  // }
}

export const Node: INodeAPI = NodeClass;
