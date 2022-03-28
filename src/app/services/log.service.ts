import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {

  static error(message: string, data?: any[]) {
    LogService.writeLog('error', message, data);
  }

  static warning(message: string, data?: any[]) {
    LogService.writeLog('warn', message, data);
  }

  static debug(message: string, data?: any[]) {
    LogService.writeLog('debug', message, data);
  }

  static info(message: string, data?: any[]) {
    LogService.writeLog('info', message, data);
  }

  private static writeLog(level: string, message: string, data?: any[]) {

    if (console[level] === undefined) {
      console[level] = console.log;
    }
    if (data) {
      console[level]('[' + level + '] ' + message, JSON.parse(JSON.stringify(data)));
    } else {
      console[level]('[' + level + '] ' + message);
    }
  }
}
