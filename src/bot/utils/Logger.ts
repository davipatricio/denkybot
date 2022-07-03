export class Logger {
  static readonly Colors = {
    Reset: '\x1b[0m',
    Red: '\x1b[31m',
    Green: '\x1b[32m',
    Yellow: '\x1b[33m',
    Blue: '\x1b[34m'
  };

  static get currentTime() {
    const currentDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    return `${Logger.Colors.Blue}[${currentDate}]${Logger.Colors.Reset}`;
  }

  error(content: unknown, path = 'ERROR') {
    return console.error(`${Logger.currentTime} - ${Logger.Colors.Red}[${path}]${Logger.Colors.Reset}`, content);
  }

  log(content: unknown, path = 'LOG') {
    return console.log(`${Logger.currentTime} - ${Logger.Colors.Green}[${path}]${Logger.Colors.Reset}`, content);
  }

  warn(content: unknown, path = 'WARN') {
    return console.warn(`${Logger.currentTime} - ${Logger.Colors.Yellow}[${path}]${Logger.Colors.Reset}`, content);
  }
}
