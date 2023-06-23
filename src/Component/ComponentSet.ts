
import type * as FigmaAPITypes from 'figma-api/lib/api-types';

import type { HTTP_URL } from '@paul7peterson/typescript-toolbox';

import { getFigmaAPI } from '../_shared';

import type { ITeam } from '../Team';

import type { IFilePreview } from '../File';
import type { IComponentSet, IComponentSetAPI } from './ComponentSet.types';

export class ComponentSetClass implements IComponentSet {
  readonly __class__: IComponentSet['__class__'] = 'FIGMA_COMPONENT_SET';
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly thumbnailURL: HTTP_URL;

  protected constructor (
    componentSet: FigmaAPITypes.ComponentSetMetadata,
    readonly file?: IFilePreview,
  ) {
    this.id = componentSet.key;
    this.name = componentSet.name;
    this.description = componentSet.description;
    this.thumbnailURL = componentSet.thumbnail_url as HTTP_URL;
  }

  static async list (file: IFilePreview): Promise<IComponentSet[]> {
    return getFigmaAPI().getFileComponentSets(file.id)
      .then(({ meta }) => {
        if (!meta) throw new Error();
        return meta.component_sets.map((set) => new ComponentSetClass(set, file));
      });
  }
  static async listPerTeam (team: ITeam): Promise<IComponentSet[]> {
    return getFigmaAPI().getTeamComponentSets(team.id, { page_size: 1000 })
      .then(({ component_sets }) => {
        if (!component_sets) throw new Error();
        return component_sets.map((set) => new ComponentSetClass(set));
      });
  }
}

export const ComponentSet: IComponentSetAPI = ComponentSetClass;
