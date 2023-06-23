

import { aClass, aStaticMethod } from '@paul7peterson/typescript-toolbox';

import { File } from './File';
import { FileName } from './File.auto';

describe(aClass(File), () => {
  describe(aStaticMethod(File, 'getByName'), () => {

    it('fetches the info a FigJam files', async () => {
      const project = await File.getByName(FileName.DesignSystem_DesignSystem);

      expect(project).toBeDefined();
    });

    // it(`fetches the info a Figma files`, async () => {
    //   const project = await FileClass.getByName(FileName.ProductsCMS_ProductsCMS);

    //   expect(project).toBeDefined();
    // });
  });
});
