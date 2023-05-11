import * as Figma from 'figma-api';

let API: Figma.Api;

/** ... */
export function getFigmaAPI (): Figma.Api {
  if (API) return API;

  const FIGMA_ACCESS_TOKEN = import.meta.env.VITE_FIGMA_ACCESS_TOKEN;
  if (!FIGMA_ACCESS_TOKEN) throw new Error('No "VITE_FIGMA_ACCESS_TOKEN" found');

  API = new Figma.Api({
    personalAccessToken: FIGMA_ACCESS_TOKEN,
  });

  return API;
}

/** ... */
export function getTeamId (): string {
  const FIGMA_TEAM_ID = import.meta.env.VITE_FIGMA_TEAM_ID;
  if (!FIGMA_TEAM_ID) throw new Error('No "VITE_FIGMA_TEAM_ID" found');
  return FIGMA_TEAM_ID;
}
