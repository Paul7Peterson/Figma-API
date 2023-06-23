

import { aClass, aStaticMethod } from '@paul7peterson/typescript-toolbox';

import { Project, ProjectClass } from './Project';
import { Team } from './Team';

describe(aClass(ProjectClass), () => {
  const TEAM = Team.get();

  describe(aStaticMethod(ProjectClass, 'list'), () => {
    it('a list of projects is returned', async () => {
      const projects = await Project.list(TEAM);

      expect(Array.isArray(projects)).toBe(true);
      expect(projects).not.toHaveLength(0);
    });
  });
});
