/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_INSTAAPI_BASE_URL: string
    readonly VITE_INSTAAPI_IMAGE_PATH: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }