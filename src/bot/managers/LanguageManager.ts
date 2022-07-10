/* eslint-disable no-await-in-loop */
import { readdir } from 'node:fs/promises';
import type { FunctionKeys, NonFunctionKeys } from 'utility-types';
import type { DenkyClient } from '../../types/Client';

export type LocaleCategories = 'command' | 'commandNames' | 'commandDescriptions' | 'commandCategories';
export type SupportedLocales = 'en_US' | 'pt_BR';

export type CommandLocaleKeysObject = typeof import('../../locales/command/pt_BR/index').default;
type CommandNamesKeysObject = typeof import('../../locales/commandNames/pt_BR/index').default;
type CommandDescriptionsKeysObject = typeof import('../../locales/commandDescriptions/pt_BR/index').default;
type CommandCategoriesKeysObject = typeof import('../../locales/commandCategories/pt_BR/index').default;
type PermissionLocaleKeysObject = typeof import('../../locales/permissions/pt_BR/index').default;

export type CommandLocaleKeys = keyof CommandLocaleKeysObject;
export type CommandNamesKeys = keyof CommandNamesKeysObject;
export type CommandDescriptionsKeys = keyof CommandDescriptionsKeysObject;
export type CommandCategoriesKeys = keyof CommandCategoriesKeysObject;
export type PermissionLocaleKeys = keyof PermissionLocaleKeysObject;

export type AllLocaleKeys = CommandLocaleKeys | CommandNamesKeys | CommandDescriptionsKeys | CommandCategoriesKeys | PermissionLocaleKeys;
export type AllLocalePaths =
  | `command:${CommandLocaleKeys}`
  | `commandDescriptions:${CommandDescriptionsKeys}`
  | `commandCategories:${CommandCategoriesKeys}`
  | `commandNames:${CommandNamesKeys}`
  | `permissions:${PermissionLocaleKeys}`;

export type CommandLocaleKeysObjectGeneric<K extends FunctionKeys<CommandLocaleKeysObject>> = CommandLocaleKeysObject[K];

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
      }
    }
  }

  get<K extends FunctionKeys<CommandLocaleKeysObject>>(locale: SupportedLocales, path: `command:${K}`, ...rest: Parameters<CommandLocaleKeysObjectGeneric<K>>): string;
  get<K extends NonFunctionKeys<CommandLocaleKeysObject>>(locale: SupportedLocales, path: `command:${K}`): string;
  get(locale: SupportedLocales, path: `commandDescriptions:${CommandDescriptionsKeys}`): string;
  get(locale: SupportedLocales, path: `commandCategories:${CommandCategoriesKeys}`): string;
  get(locale: SupportedLocales, path: `commandNames:${CommandNamesKeys}`): string;
  get(locale: SupportedLocales, path: `permissions:${PermissionLocaleKeys}`): string;
  get(lang: SupportedLocales, path: string, ...args: unknown[]) {
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
