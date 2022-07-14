import dayjs from 'dayjs';
import customFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { toMs } from 'hh-mm-ss';
import ms from 'ms';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customFormat);
dayjs.tz.setDefault('America/Sao_Paulo');

const formats = [
  // DD/MM/YYYY
  'DD/MM/YYYY HH:mm:ss',
  'DD/MM/YYYY HH:mm',
  'DD/MM/YYYY',
  // DD/MM/YY
  'DD/MM/YY HH:mm:ss',
  'DD/MM/YY HH:mm',
  'DD/MM/YY',
  // DD/MM
  'DD/MM HH:mm:ss',
  'DD/MM HH:mm',
  'DD/MM'
];

function validMs(str: string) {
  try {
    return ms(str) as number | undefined;
  } catch {
    return undefined;
  }
}

// Returns a timestamp in milliseconds. If the timestamp is invalid, returns null or undefined.
export function parseTime(time: string): { valid: boolean; type: 'full' | 'milisseconds'; value: number | undefined } {
  const currentDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
  const dayjsObj = dayjs(time, formats, true);

  // Prevent parsing invalid years
  if (dayjsObj.year() <= currentDate.getFullYear()) dayjsObj.year(currentDate.getFullYear());

  // Prevent parsing older months and days
  if (dayjsObj.year() === currentDate.getFullYear()) {
    if (dayjsObj.month() < currentDate.getMonth()) dayjsObj.month(currentDate.getMonth());
    if (dayjsObj.date() < currentDate.getDate()) dayjsObj.date(currentDate.getDate());
  }

  if (dayjsObj.isValid()) return { valid: true, type: 'full', value: dayjsObj.valueOf() };

  // If the inserted time is in the HH:MM:SS or HH:MM format
  if (time.includes(':')) {
    try {
      const hhMMResult = toMs(time) as number | undefined;
      if (hhMMResult) return { valid: true, type: 'milisseconds', value: hhMMResult };
      // eslint-disable-next-line no-empty
    } catch (_) {}

    if (time.trim().includes(' ')) {
      let final = 0;
      time
        .trim()
        .split(' ')
        .forEach(t => {
          if (!t) return;
          const msResult = validMs(t);
          if (msResult) final = msResult + final;
        });
      return { valid: final !== 0, type: 'milisseconds', value: final };
    }

    const msResult = validMs(time);
    return { valid: msResult !== undefined, type: 'milisseconds', value: msResult };
  }

  return { valid: false, type: 'milisseconds', value: undefined };
}
