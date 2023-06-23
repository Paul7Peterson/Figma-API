import type * as Figma from 'figma-api';
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import { Memorizer } from '@paul7peterson/typescript-toolbox';

import { getFigmaAPI } from '../_shared';
import { Component, ComponentSet } from '../Component';
import { Node } from '../Node';
import { Style } from '../Style';
import { FileId, FileName } from './File.auto';
import { Page } from './Page';

import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';

import type { IComponent, IComponentSet } from '../Component';
import type { INode } from '../Node';
import type { IStyle } from '../Style';
import type { IProject } from '../Team';
import type { IFile, IFilePreview, IFilePreviewAPI } from './File.types';
import type { IPage } from './Page.types';

export class FilePreviewClass implements IFilePreview {
  readonly __class__: IFilePreview['__class__'] = 'FIGMA_FILE';
  readonly id: string;
  readonly name: string;
  readonly thumbnailURL: HTTP_URL;
  readonly lastModified: Date;

  protected constructor (
    file: FigmaAPITypes.BaseFile,
    readonly project?: IProject,
  ) {
    this.id = file.key;
    this.name = file.name;
    this.lastModified = new Date(file.last_modified);
    this.thumbnailURL = file.thumbnail_url as HTTP_URL;
  }

  get URL (): HTTP_URL {
    return `https://www.figma.com/file/${this.id}/`;
  }

  static async listPerProject (project: IProject): Promise<IFilePreview[]> {
    return getFigmaAPI().getProjectFiles(project.id.toString())
      .then(({ files }) => files.map((file) => new FilePreviewClass(file, project)));
  }

  async listNodes (ids: INode['id'][]): Promise<INode[]> {
    return Node.list(this, ids);
  }

  async getNode (id: INode['id']): Promise<INode> {
    return Node.get(this, id);
  }

  async listComponents (): Promise<IComponent[]> {
    return Component.list(this);
  }

  async listComponentSets (): Promise<IComponentSet[]> {
    return ComponentSet.list(this);
  }
}

/** */
export const FilePreview: IFilePreviewAPI = FilePreviewClass;

export class File extends FilePreviewClass implements IFile {
  static #memo = new Memorizer({
    files: new Map<IFile['id'], IFile>(),
  });

  readonly document: Figma.Node<'DOCUMENT'>;
  readonly components: IFile['components'];
  #styles: IFile['styles'] = new Map();

  protected constructor (
    file: FigmaAPITypes.GetFileResult,
    id: string,
    project?: IProject,
  ) {
    super({
      key: id,
      last_modified: file.lastModified,
      thumbnail_url: file.thumbnailUrl,
      name: file.name,
    }, project);

    this.document = file.document;
    this.components = file.components;
  }

  get pages (): IPage[] { return Page.list(this); }

  get styles (): IFile['styles'] { return this.#styles; }

  static async get (id: IFile['id'], deep?: 'deep'): Promise<IFile> {
    const file = await File.#memo.getOrSet('files', id, async () => {
      const file = await getFigmaAPI().getFile(id, {
        depth: deep ? undefined : 1,
        // plugin_data: PLUGIN_DATA,
      });
      return new File(file, id);
    });

    if (!file) throw new Error(`No file found for id "${id}"`);
    return file;
  }

  static async getByName (name: FileName): Promise<IFile> {
    return File.get(FileId[name]);
  }

  getPage (pageName: IPage['name']): IPage {
    return Page.get(this, pageName);
  }

  async listComments (): Promise<FigmaAPITypes.Comment[]> {
    return getFigmaAPI().getComments(this.document.id)
      .then(({ comments }) => comments);
  }

  async listStyles (): Promise<IStyle[]> {
    await getFigmaAPI().getFileStyles(this.id)
      .then(({ meta, error }) => {
        if (error) throw new Error('Error in call');
        if (!meta) throw new Error('No meta');
        this.#styles = new Map(meta.styles.map((s) => [s.node_id, s]));
      });

    return Style.list(this);
  }

  // listImages (ids: string[]) {
  //   return listImages(this.id, ids);
  // }
}


