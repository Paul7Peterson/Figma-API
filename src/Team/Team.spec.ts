

import { aClass, aMethod } from '@paul7peterson/typescript-toolbox';

import { ProjectId, ProjectName } from './Project.auto';
import { Team, TeamClass } from './Team';

// const MAX_TIMEOUT = 10_000; // in ms

describe(aClass(TeamClass), () => {

  describe(aMethod(TeamClass, 'listProjects'), () => {
    it('a list of projects is returned', async () => {
      const projects = await Team.get().listProjects();

      expect(Array.isArray(projects)).toBe(true);
      expect(projects).not.toHaveLength(0);
    });
  });

  describe(aMethod(TeamClass, 'listProjectsAndFiles'), () => {
    it('a list of projects and their files is returned', async () => {
      const projects = await Team.get().listProjectsAndFiles();

      expect(Array.isArray(projects)).toBe(true);
      expect(projects).not.toHaveLength(0);
    });
  });

  describe(aMethod(TeamClass, 'getProjectByName'), () => {
    it('a single project by its name is returned', async () => {
      const projectName = ProjectName.DesignSystem;
      const project = await Team.get().getProjectByName(projectName);

      expect(project).toBeDefined();
      expect(project.id).toBe(+ProjectId[projectName]);
    });
  });
});
