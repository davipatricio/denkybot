import { Locale } from 'discord.js';
import type { DenkyClient } from '../../types/Client';
import type { SupportedLocales } from '../managers/LanguageManager';

export default class Helpers {
  /** The client that instantiated this module */
  client: DenkyClient;
  constructor(client: DenkyClient) {
    client.helpers = this;
    this.client = client;
  }

  recommendLocale(locale?: Locale) {
    if (!locale) return this.client.config.defaultLanguage as SupportedLocales;
    let recommendedLocale = this.client.config.defaultLanguage as SupportedLocales;
    switch (this.formatLocale(locale)) {
      case Locale.EnglishUS:
      case Locale.EnglishGB:
        recommendedLocale = 'en_US';
        break;
      case Locale.PortugueseBR:
        recommendedLocale = 'pt_BR';
        break;
      default:
        recommendedLocale = this.client.config.defaultLanguage as SupportedLocales;
        break;
    }
    return recommendedLocale;
  }

  formatLocale(locale: Locale) {
    return locale.replace('-', '_');
  }
}
