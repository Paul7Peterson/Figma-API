import { Memorizer } from '@paul7peterson/typescript-toolbox';

import { getFigmaAPI } from '../_shared';
import { File } from '../File';
import { ProjectId, ProjectName } from './Project.auto';

import type { IFile, IFilePreview } from '../File';
import type { IProject, IProjectAPI } from './Project.types';

import type * as FigmaAPIType from 'figma-api/lib/api-types';

import type { ITeam } from './Team.types';

export class ProjectClass implements IProject {
  static #memo = new Memorizer({
    projects: new Map<IProject['id'], IProject>(),
  });

  readonly __class__: IProject['__class__'] = 'FIGMA_PROJECT';
  readonly id: IProject['id'];
  readonly name: IProject['name'];

  protected constructor (
    readonly team: ITeam,
    project: FigmaAPIType.Project,
  ) {
    this.id = +project.id;
    this.name = project.name;
  }

  get URL (): IProject['URL'] {
    return `https://www.figma.com/files/project/${this.id}`;
  }

  static async list (team: ITeam): Promise<IProject[]> {
    return getFigmaAPI().getTeamProjects(team.id)
      .then(({ projects }) => projects.map((project) => {
        const newProject = new ProjectClass(team, project);
        ProjectClass.#memo.setValue('projects', newProject.id, newProject);
        return newProject;
      }))
      .catch(({ response }) => {
        if (response.status === 404)
          throw new Error('Team not found.');

        console.error('Unable list the projects.');
        console.error(response);
        return [];
      });
  }

  static async get (team: ITeam, id: IProject['id']): Promise<IProject> {
    const project = await ProjectClass.#memo.getOrSet('projects', id, () =>
      this.list(team).then(() => ProjectClass.#memo.getValue('projects', id)));
    if (!project) throw new Error(`Project with id "${id}" not found.`);
    return project;
  }

  static async getByName (team: ITeam, projectName: ProjectName): Promise<IProject> {
    return this.get(team, +ProjectId[projectName]);
  }

  async listFiles (): Promise<IFilePreview[]> {
    return File.listPerProject(this);
  }

  async getFile (id: IFilePreview['id']): Promise<IFile> {
    return File.get(id);
  }
}


export const Project: IProjectAPI = ProjectClass;
