import type { ClassTyping, HTTP_URL } from '@paul7peterson/typescript-toolbox';
import type { IFilePreview } from '../File';
import type { ITeam } from '../Team';

/** ### Figma Component */
export interface IComponent extends ClassTyping<'FIGMA_COMPONENT'> {
  /** */
  readonly id: string;
  /** */
  readonly name: string;
  /** */
  readonly description: string;
  /** */
  readonly thumbnailURL: HTTP_URL;
  /** */
  readonly createdAt: Date;
  /** */
  readonly updatedAt: Date;
  /** */
  readonly file?: IFilePreview;
}

/** ### Figma Component API */
export interface IComponentAPI {
  /** */
  list (file: IFilePreview): Promise<IComponent[]>;
  /** */
  listPerTeam (team: ITeam): Promise<IComponent[]>;
}
