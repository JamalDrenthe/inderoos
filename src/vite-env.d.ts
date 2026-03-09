/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_FORM_ACTION_URL?: string;
  readonly VITE_GOOGLE_FORM_NAME_FIELD?: string;
  readonly VITE_GOOGLE_FORM_EMAIL_FIELD?: string;
  readonly VITE_GOOGLE_FORM_PHONE_FIELD?: string;
  readonly VITE_GOOGLE_FORM_SELECTION_FIELD?: string;
  readonly VITE_GOOGLE_FORM_RULES_FIELD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
