import { getFigmaAPI } from '../_shared';

import type { GetUserMeResult } from 'figma-api/lib/api-types';

export class Account {
  static async getMyself (): Promise<GetUserMeResult> {
    return getFigmaAPI().getMe();
  }
}
