// @ts-ignore When running GitHub Actions, the config file isn't available
import type { SupportedLocales } from '#lib/managers/LanguageManager';
import Configuration from '@bot/config.json';
import { Locale } from 'discord.js';

export function recommendLocale(locale?: Locale) {
  if (!locale) return Configuration.defaultLanguage as SupportedLocales;
  let recommendedLocale = Configuration.defaultLanguage as SupportedLocales;
  switch (locale.replace('_', '-')) {
    case Locale.EnglishUS:
    case Locale.EnglishGB:
      recommendedLocale = 'en_US';
      break;
    case Locale.PortugueseBR:
      recommendedLocale = 'pt_BR';
      break;
  }
  return recommendedLocale;
}

export function formatLocale(locale: Locale) {
  return locale.replace('-', '_');
}
