import Transport from 'winston-transport';
import * as Sentry from '@sentry/node';
import type { LogCallback, LogEntry } from 'winston';

export class SentryTransporter extends Transport {
  constructor(dsn: string) {
    super({ level: 'warn' });

    if (!dsn) throw new TypeError('Missing Sentry dsn.');

    Sentry.init({ dsn });
  }

  override log(info: LogEntry & { message: any }, callback: LogCallback) {
    setImmediate(() => {
      if (info.message instanceof Error) Sentry.captureException(info.message);
      else Sentry.captureMessage(String(info.message));
      this.emit('logged', info);
    });

    callback();
  }
}
