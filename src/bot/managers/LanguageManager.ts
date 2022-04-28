/* eslint-disable no-await-in-loop */
import { readdir } from 'node:fs/promises';
import type { DenkyClient } from '../../types/Client';

export type LocaleCategories = 'command' | 'commandNames' | 'commandDescriptions' | 'commandCategories';
export type SupportedLocales = 'en_US' | 'pt_BR';

export type CommandLocaleKeys = keyof typeof import('../../locales/command/pt_BR/index').default;
export type CommandNamesKeys = keyof typeof import('../../locales/commandNames/pt_BR/index').default;
export type CommandDescriptionsKeys = keyof typeof import('../../locales/commandDescriptions/pt_BR/index').default;
export type CommandCategoriesKeys = keyof typeof import('../../locales/commandCategories/pt_BR/index').default;

export type AllLocaleKeys = CommandLocaleKeys | CommandNamesKeys | CommandDescriptionsKeys | CommandCategoriesKeys;
export type AllLocalePaths = `command:${CommandLocaleKeys}` | `descriptions:${CommandDescriptionsKeys}` | `categories:${CommandCategoriesKeys}` | `names:${CommandNamesKeys}`;

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
    const localeCategories = (await readdir('./locales')) as LocaleCategories[];
    for (const category of localeCategories) {
      const categoryLocales = (await readdir(`./locales/${category}`)) as SupportedLocales[];
      for (const locale of categoryLocales) {
        const { default: localeData } = await import(`../../locales/${category}/${locale}`);
        // @ts-ignore
        if (!this.cache[category]) this.cache[category] = {};
        // @ts-ignore
        if (!this.cache[category][locale]) this.cache[category][locale] = {};
        this.cache[category][locale] = localeData;

        if (global.IS_MAIN_PROCESS) console.log('✅ \x1b[34m[LOCALES]\x1b[0m', `Loaded ${category}/${locale} locale successfully.`);
      }
    }
  }

  get(lang: SupportedLocales, path: AllLocalePaths, ...args: unknown[]) {
    const [category, key] = path.split(':');
    const locale = this.cache[category as LocaleCategories][lang][key as AllLocaleKeys] ?? this.cache[category as LocaleCategories].pt_BR[key as AllLocaleKeys];
    if (!locale) return `!!{${path}}!!`;

    if (typeof locale === 'string') return locale;
    if (typeof locale === 'function') return locale(...args);
    return `!!{${path}}!!`;
  }
}
