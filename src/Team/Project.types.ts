import type { ClassTyping, HTTP_URL } from '@paul7peterson/typescript-toolbox';

import type { IFile, IFilePreview } from '../File';
import type { ProjectName } from './Project.auto';
import type { ITeam } from './Team.types';

/** */
export interface IProject extends ClassTyping<'FIGMA_PROJECT'> {
  /** */
  readonly id: number;
  /** */
  readonly name: string;
  /** */
  readonly URL: HTTP_URL;
  /** */
  readonly team: ITeam;
  /** */
  listFiles (): Promise<IFilePreview[]>;
  /** */
  getFile (id: IFilePreview['id']): Promise<IFile>;
}

/** */
export interface IProjectWithFiles extends IProject {
  /** */
  files: IFilePreview[];
}

/** */
export interface IProjectAPI {
  /** */
  list (team: ITeam): Promise<IProject[]>;
  /** */
  get (team: ITeam, id: IProject['id']): Promise<IProject>;
  /** */
  getByName (team: ITeam, projectName: ProjectName): Promise<IProject>;
}
