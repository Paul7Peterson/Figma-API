import type { ClassTyping, HTTP_URL } from '@paul7peterson/typescript-toolbox';
import type { IFilePreview } from '../File';
import type { ITeam } from '../Team';

/** ### Figma Component Set */
export interface IComponentSet extends ClassTyping<'FIGMA_COMPONENT_SET'> {
  /** */
  readonly id: string;
  /** */
  readonly name: string;
  /** */
  readonly description: string;
  /** */
  readonly thumbnailURL: HTTP_URL;
  /** */
  readonly file?: IFilePreview;
}

/** ### Figma Component Set API */
export interface IComponentSetAPI {
  /** */
  list (file: IFilePreview): Promise<IComponentSet[]>;
  /** */
  listPerTeam (team: ITeam): Promise<IComponentSet[]>;
}
