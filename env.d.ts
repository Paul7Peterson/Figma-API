/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIGMA_ACCESS_TOKEN: string;
  readonly VITE_FIGMA_TEAM_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
