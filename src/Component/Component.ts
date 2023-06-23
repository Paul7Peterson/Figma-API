import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';
import { getFigmaAPI } from '../_shared';

import type { ITeam } from '../Team';

import type { IFilePreview } from '../File';
import type { IComponent, IComponentAPI } from './Component.types';

import type * as FigmaAPITypes from 'figma-api/lib/api-types';

export class ComponentClass implements IComponent {
  readonly __class__: IComponent['__class__'] = 'FIGMA_COMPONENT';
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly thumbnailURL: HTTP_URL;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  protected constructor (
    component: FigmaAPITypes.ComponentMetadata,
    readonly file?: IFilePreview,
  ) {
    this.id = component.key;
    this.name = component.name;
    this.description = component.description;
    this.thumbnailURL = component.thumbnail_url as HTTP_URL;
    this.createdAt = new Date(component.created_at);
    this.updatedAt = new Date(component.updated_at);
  }

  static async list (file: IFilePreview): Promise<IComponent[]> {
    return getFigmaAPI().getFileComponents(file.id)
      .then(({ meta }) => {
        if (!meta) throw new Error();
        return meta.components.map((comp) => new ComponentClass(comp, file));
      });
  }
  static async listPerTeam (team: ITeam): Promise<IComponent[]> {
    return getFigmaAPI().getTeamComponents(team.id, { page_size: 1000 })
      .then(({ meta }) => {
        if (!meta) throw new Error();
        return meta.components.map((comp) => new ComponentClass(comp));
      });
  }
}

export const Component: IComponentAPI = ComponentClass;
