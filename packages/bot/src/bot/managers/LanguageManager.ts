/* eslint-disable no-await-in-loop */
import { readdir } from 'node:fs/promises';
import nodePath from 'node:path';
import type { DenkyClient } from '../../types/Client';

export type LocaleCategories = 'command' | 'commandNames' | 'commandDescriptions' | 'commandCategories';
export type SupportedLocales = 'en_US' | 'pt_BR';

export type CommandLocaleKeys = keyof typeof import('@locales/assets/command/pt_BR').default;
export type CommandNamesKeys = keyof typeof import('@locales/assets/commandNames/pt_BR').default;
export type CommandDescriptionsKeys = keyof typeof import('@locales/assets/commandDescriptions/pt_BR').default;
export type CommandCategoriesKeys = keyof typeof import('@locales/assets/commandCategories/pt_BR').default;
export type PermissionLocaleKeys = keyof typeof import('@locales/assets/permissions/pt_BR').default;

export type AllLocaleKeys = CommandLocaleKeys | CommandNamesKeys | CommandDescriptionsKeys | CommandCategoriesKeys | PermissionLocaleKeys;
export type AllLocalePaths =
  | `command:${CommandLocaleKeys}`
  | `commandDescriptions:${CommandDescriptionsKeys}`
  | `commandCategories:${CommandCategoriesKeys}`
  | `commandNames:${CommandNamesKeys}`
  | `permissions:${PermissionLocaleKeys}`;

const BASE_LOCALE_DIR = nodePath.resolve(__dirname, '../../../../locales/assets/');

export class LanguageManager {
  /** The client that instantiated this manager */
  client: DenkyClient;
  cache: Record<LocaleCategories, Record<SupportedLocales, Record<AllLocaleKeys, string | ((...args: unknown[]) => string)>>>;
  constructor(client: DenkyClient) {
    this.client = client;
    // @ts-ignore
    this.cache = {};
  }

  async loadLocales() {
    const localeCategories = (await readdir(BASE_LOCALE_DIR)) as LocaleCategories[];
    for (const category of localeCategories) {
      const categoryLocales = (await readdir(`${BASE_LOCALE_DIR}/${category}`)) as SupportedLocales[];
      for (const locale of categoryLocales) {
        // HACK: tsc-alias doesn't support dynamic imports
        const { default: localeData } = await import(`../../../../locales/assets/${category}/${locale}`);
        // @ts-ignore
        if (!this.cache[category]) this.cache[category] = {};
        // @ts-ignore
        if (!this.cache[category][locale]) this.cache[category][locale] = {};
        this.cache[category][locale] = localeData;
      }
    }
  }

  get(lang: SupportedLocales, path: AllLocalePaths, ...args: unknown[]) {
    const [category, key] = path.split(':');
    if (!this.cache[category]) return `!!{${category}.${key}}!!`;

    const baseCategory = this.cache[category as LocaleCategories];
    const baseLocale = baseCategory[lang] ?? baseCategory[this.client.config.defaultLanguage];

    const locale = baseLocale[key as AllLocaleKeys];
    if (!locale) return `!!{${category}.${key}}!!`;

    if (typeof locale === 'string') return locale;
    if (typeof locale === 'function') return locale(...args);
    return `!!{${category}.${key}}!!`;
  }
}
