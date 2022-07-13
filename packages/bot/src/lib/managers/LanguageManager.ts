/* eslint-disable no-await-in-loop */
import { readdir } from 'node:fs/promises';
import nodePath from 'node:path';
import type { FunctionKeys, NonFunctionKeys } from 'utility-types';
import type { DenkyClient } from '../../types/Client';

type LocaleCategories = 'command' | 'commandNames' | 'commandDescriptions' | 'commandCategories';
export type SupportedLocales = 'en_US' | 'pt_BR';

type CommandLocaleKeysObject = typeof import('@locales/assets/command/pt_BR').default;
type CommandNamesKeysObject = typeof import('@locales/assets/commandNames/pt_BR').default;
type CommandDescriptionsKeysObject = typeof import('@locales/assets/commandDescriptions/pt_BR').default;
type CommandCategoriesKeysObject = typeof import('@locales/assets/commandCategories/pt_BR').default;
type PermissionLocaleKeysObject = typeof import('@locales/assets/permissions/pt_BR').default;

export type CommandLocaleKeys = keyof CommandLocaleKeysObject;
export type CommandNamesKeys = keyof CommandNamesKeysObject;
export type CommandDescriptionsKeys = keyof CommandDescriptionsKeysObject;
export type CommandCategoriesKeys = keyof CommandCategoriesKeysObject;
export type PermissionLocaleKeys = keyof PermissionLocaleKeysObject;

type AllLocaleKeys = CommandLocaleKeys | CommandNamesKeys | CommandDescriptionsKeys | CommandCategoriesKeys | PermissionLocaleKeys;

type CommandLocaleKeysObjectGeneric<K extends FunctionKeys<CommandLocaleKeysObject>> = CommandLocaleKeysObject[K];

const BASE_LOCALE_DIR = nodePath.resolve(__dirname, '../../../../locales/assets/');

export class LanguageManager {
  /** The client that instantiated this manager */
  client: DenkyClient;
  cache: Record<LocaleCategories, Record<SupportedLocales, Record<AllLocaleKeys, string | ((...args: unknown[]) => string)>>>;
  constructor(client: DenkyClient) {
    this.client = client;
    // @ts-expect-error We are initializing the cache object
    this.cache = {};
  }

  async loadLocales() {
    const localeCategories = (await readdir(BASE_LOCALE_DIR)) as LocaleCategories[];
    for (const category of localeCategories) {
      const categoryLocales = (await readdir(`${BASE_LOCALE_DIR}/${category}`)) as SupportedLocales[];
      for (const locale of categoryLocales) {
        // HACK: tsc-alias doesn't support dynamic imports
        const { default: localeData } = await import(`../../../../locales/assets/${category}/${locale}`);
        // @ts-expect-error We are initializing the cache with a dynamic key
        if (!this.cache[category]) this.cache[category] = {};
        // @ts-expect-error We are initializing the cache with a dynamic key
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

export function translateTuple<K extends FunctionKeys<CommandLocaleKeysObject>>(...args: [path: `command:${K}`, ...args: Parameters<CommandLocaleKeysObjectGeneric<K>>]): string;
export function translateTuple<K extends NonFunctionKeys<CommandLocaleKeysObject>>(...args: [path: `command:${K}`]): string;
export function translateTuple(...args: [path: `commandDescriptions:${CommandDescriptionsKeys}`]): string;
export function translateTuple(...args: [path: `commandCategories:${CommandCategoriesKeys}`]): string;
export function translateTuple(...args: [path: `commandNames:${CommandNamesKeys}`]): string;
export function translateTuple(...args: [path: `permissions:${PermissionLocaleKeys}`]): string;
export function translateTuple(...args: [path: never]): string;
export function translateTuple(args: never): never {
  return args;
}
