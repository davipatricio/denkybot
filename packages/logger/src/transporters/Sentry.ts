import { captureException, captureMessage, init } from '@sentry/node';
import type { LogCallback, LogEntry } from 'winston';
import Transport from 'winston-transport';

export class SentryTransporter extends Transport {
  constructor(dsn: string) {
    super({ level: 'warn' });

    if (!dsn) throw new TypeError('Missing Sentry dsn.');

    init({ dsn });
  }

  override log(info: LogEntry & { message: any }, callback: LogCallback) {
    setImmediate(() => {
      if (info.message instanceof Error) captureException(info.message);
      else captureMessage(String(info.message));
      this.emit('logged', info);
    });

    callback();
  }
}
