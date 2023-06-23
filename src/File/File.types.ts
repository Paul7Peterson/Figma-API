import type { ClassTyping, HTTP_URL } from '@paul7peterson/typescript-toolbox';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';
import type * as Figma from 'figma-api';

import type { INode } from '../Node';
import type { IComponent, IComponentSet } from '../Component';
import type { IStyle } from '../Style';

import type { FileName } from './File.auto';
import type { IPage } from './Page.types';
import type { IProject } from '../Team';

/** ### Figma File preview */
export interface IFilePreview extends ClassTyping<'FIGMA_FILE'> {
  /** */
  readonly id: string;
  /** */
  readonly name: string;
  /** */
  readonly thumbnailURL: HTTP_URL;
  /** */
  readonly URL: HTTP_URL;
  /** */
  readonly lastModified: Date;
  /** */
  readonly project?: IProject;
  /**
   * @param ids -
   */
  listNodes (ids: INode['id'][]): Promise<INode[]>;
  /**
   * @param id -
   */
  getNode (id: INode['id']): Promise<INode>;
  /** */
  listComponents (): Promise<IComponent[]>;
  /**
   * **IMPORTANT!** It fetches the information coming from the latest published library, not the current
   * status of the file itself!
   */
  listComponentSets (): Promise<IComponentSet[]>;
  // listImages (ids: string[]): Promise<{ [nodeId: string]: string | null; }>;
}

/** */
export interface IFilePreviewAPI {
  /** */
  listPerProject (project: IProject): Promise<IFilePreview[]>;
}

/** ### Figma detailed File */
export interface IFile extends IFilePreview {
  /** */
  readonly document: Figma.Node<'DOCUMENT'>;
  /** */
  readonly components: {
    [nodeId: string]: Figma.Component;
  };
  /** */
  readonly styles: Map<string, FigmaAPITypes.StyleMetadata>;
  /** */
  readonly pages: IPage[];
  /** */
  getPage (pageName: IPage['name'], deep?: 'deep'): IPage;
  /** */
  listComments (): Promise<FigmaAPITypes.Comment[]>;
  /** */
  listStyles (): Promise<IStyle[]>;
}

/** */
export interface IFileAPI extends IFilePreviewAPI {
  /** */
  get (id: IFile['id'], deep?: 'deep'): Promise<IFile>;
  /** */
  getByName (name: FileName): Promise<IFile>;
}
