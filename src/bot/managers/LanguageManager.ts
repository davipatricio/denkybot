/* eslint-disable no-await-in-loop */
import { readdir } from 'node:fs/promises';
import type { DenkyClient } from '../../types/Client';

type LocaleCategories = 'command' | 'commandNames' | 'commandDescriptions' | 'commandCategories';
type SupportedLocales = 'en' | 'pt_BR';

type CommandLocaleKeys = keyof typeof import('../../locales/command/pt_BR/index').default;
type CommandNamesKeys = keyof typeof import('../../locales/commandNames/pt_BR/index').default;
type CommandDescriptionsKeys = keyof typeof import('../../locales/commandDescriptions/pt_BR/index').default;
type CommandCategoriesKeys = keyof typeof import('../../locales/commandCategories/pt_BR/index').default;

type AllLocaleKeys = CommandLocaleKeys | CommandNamesKeys | CommandDescriptionsKeys | CommandCategoriesKeys;

export class LanguageManager {
  /** The client that instantiated this manager */
  client: DenkyClient;
  cache: Record<LocaleCategories, Record<SupportedLocales, Record<AllLocaleKeys, string | ((...args: unknown[]) => string)>>>;
  constructor(client: DenkyClient) {
    this.client = client;
  }

  async loadLocales() {
    const localeCategories = (await readdir('./locales')) as LocaleCategories[];
    for (const category of localeCategories) {
      const categoryLocales = (await readdir(`./locales/${category}`)) as SupportedLocales[];
      for (const locale of categoryLocales) {
        const { default: localeData } = await import(`../../locales/${category}/${locale}`);
        this.cache[category][locale] = localeData;
        if (global.IS_MAIN_PROCESS) console.log(`[DENKY] Loaded ${category}/${locale} locale successfully.`);
      }
    }
  }

  get(lang: SupportedLocales, path: `command/${CommandLocaleKeys}`, ...args: unknown[]): string;
  get(lang: SupportedLocales, path: `descriptions/${CommandDescriptionsKeys}`, ...args: unknown[]): string;
  get(lang: SupportedLocales, path: `categories/${CommandCategoriesKeys}`, ...args: unknown[]): string;
  get(lang: SupportedLocales, path: `names/${CommandNamesKeys}`, ...args: unknown[]): string;
  get(lang: SupportedLocales, path: string, ...args: unknown[]) {
    const [category, key] = path.split('/');
    const locale = this.cache[category as LocaleCategories][lang][key as AllLocaleKeys];
    if (!locale) return `!!{${path}}!!`;

    if (typeof locale === 'string') return locale;
    if (typeof locale === 'function') return locale(...args);
    return `!!{${path}}!!`;
  }
}
