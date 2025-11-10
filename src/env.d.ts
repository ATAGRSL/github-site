/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_AG_DMG_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
