/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE?: string;
    readonly VITE_CHAT_PROVIDER?: 'demo' | 'openai';
    readonly VITE_CHAT_API_ENDPOINT?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
