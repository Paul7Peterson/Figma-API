import type { ClassTyping } from '@paul7peterson/typescript-toolbox';
import type * as FigmaAPIType from 'figma-api/lib/api-types';

import type { IProject, IProjectWithFiles } from './Project.types';
import type { ProjectName } from './Project.auto';
import type { IComponent, IComponentSet } from '../Component';

/** */

/** ### Figma Team */
export interface ITeam extends ClassTyping<'FIGMA_TEAM'> {
  /** */
  readonly id: string;
  /** */
  listStyles (): Promise<FigmaAPIType.StyleMetadata[]>;
  /** */
  listComponents (): Promise<IComponent[]>;
  /** */
  listComponentSets (): Promise<IComponentSet[]>;
  /** */
  listProjects (): Promise<IProject[]>;
  /** */
  listProjectsAndFiles (): Promise<IProjectWithFiles[]>;
  /** */
  getProject (id: IProject['id']): Promise<IProject>;
  /** */
  getProjectByName (name: ProjectName): Promise<IProject>;
}

/** ### Figma Team API */
export interface ITeamAPI {
  /** */
  get (): ITeam;
}
