

import { aClass } from '@paul7peterson/typescript-toolbox';

import { NodeClass } from './Node';

describe(aClass(NodeClass), () => {

  it('passes', () => {
    expect(true).toBe(true);
  });
});
