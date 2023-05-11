

import { aClass, aStaticMethod } from '@paul7peterson/typescript-toolbox';

import { Account } from './Account';

describe(aClass(Account), () => {

  describe(aStaticMethod(Account, 'getMyself'), () => {
    it('return the info of the current user', async () => {
      const myself = await Account.getMyself();

      const domain = myself.email?.split('@')[1];

      expect(myself.id).toBeDefined();
      expect(myself.handle).toBeDefined();
      expect(domain).toBe('unilabs.com');
    });
  });
});
