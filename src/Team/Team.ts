import type * as FigmaAPIType from 'figma-api/lib/api-types';

import { getFigmaAPI, getTeamId } from '../_shared';
import { Component, ComponentSet } from '../Component';
import { Project } from './Project';

import type { ProjectName } from './Project.auto';

import type { IComponent, IComponentSet } from '../Component';

import type { IProject, IProjectWithFiles } from './Project.types';

import type { ITeam, ITeamAPI } from './Team.types';


export class TeamClass implements ITeam {
  static #instance: ITeam;

  readonly __class__: ITeam['__class__'] = 'FIGMA_TEAM';
  readonly id: ITeam['id'];

  protected constructor () {
    this.id = getTeamId();
    if (!this.id) throw new Error('No id.');
  }

  static get (): ITeam {
    if (!TeamClass.#instance) TeamClass.#instance = new TeamClass();
    return TeamClass.#instance;
  }

  async listStyles (): Promise<FigmaAPIType.StyleMetadata[]> {
    const { meta } = await getFigmaAPI().getTeamStyles(this.id, { page_size: 1000 });
    if (!meta) throw new Error('');
    return meta.styles;
  }

  async listComponents (): Promise<IComponent[]> {
    return Component.listPerTeam(this);
  }

  async listComponentSets (): Promise<IComponentSet[]> {
    return ComponentSet.listPerTeam(this);
  }

  async listProjects (): Promise<IProject[]> {
    return Project.list(this);
  }

  async listProjectsAndFiles (): Promise<IProjectWithFiles[]> {
    return this.listProjects()
      .then((projects) => Promise.all(projects.map(async (project) => ({
        ...project,
        files: await project.listFiles(),
      }))));
  }

  async getProject (id: IProject['id']): Promise<IProject> {
    return Project.get(this, id);
  }

  async getProjectByName (name: ProjectName): Promise<IProject> {
    return Project.getByName(this, name);
  }
}

export const Team: ITeamAPI = TeamClass;
