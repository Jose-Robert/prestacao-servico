import * as moment from 'moment';

export class DateUtils {

  static readonly hoursFormat = 'HH';
  static readonly minutesFormat = 'mm';
  static readonly secondsFormat = 'ss';
  static readonly millisecondsFormat = 'SSS';

  static serializeDate(date: Date): string {
    if (!date) {
      return null;
    }

    return date.toJSON().substring(0, 10);
  }

  static deserializeDate(date: string): Date {
    if (!date) {
      return null;
    }

    return DateUtils.toUTCDate(new Date(date.substring(0, 10)));
  }

  static serializeDateTime(date: Date): string {
    if (!date) {
      return null;
    }

    const jsonDate = date.toJSON();

    return jsonDate.substring(0, jsonDate.length - 1);
  }

  static deserializeDateTime(date: string): Date {
    if (!date) {
      return null;
    }

    if (date.endsWith('Z')) {
      return DateUtils.toUTCDateTime(new Date(date));
    }

    return DateUtils.toUTCDateTime(new Date(`${date}Z`));
  }

  static toDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  static toTime(date: Date): string {
    return moment(date).format('HH:mm:ss');
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    return DateUtils.toDate(date1) === DateUtils.toDate(date2);
  }

  static isToday(date: Date): boolean {
    return DateUtils.isSameDay(date, new Date());
  }

  static toUTCDate(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  }

  static toUTCDateTime(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(),
      date.getUTCSeconds(), date.getUTCMilliseconds());

  }

  static deserializeDateTimeToTimezoneLocal(date: string): Date {
    if(!date) {
      return null;
    }

    const newDate = new Date(date)
    const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;
    return new Date(newDate.getTime() - userTimezoneOffset);
  }

  static timeDifference(end: Date | string, start: Date | string, format: string = 'HH:mm:ss'): string {
    const endTime = moment.utc(end);
    const startTime = moment.utc(start);
    const durationTime = moment.duration(endTime.diff(startTime));

    const hours = durationTime.hours();
    const minutes = DateUtils.hasHoursFormat(format)
      ? durationTime.minutes()
      : Number(durationTime.asMinutes().toFixed());
    const seconds = DateUtils.hasHoursFormat(format) || DateUtils.hasMinutesFormat(format)
      ? durationTime.seconds()
      : Number(durationTime.asSeconds().toFixed());
    const milliseconds = durationTime.milliseconds();

    return format
      .replace('HH', DateUtils.padStartWithZero(hours, 2))
      .replace('mm', DateUtils.padStartWithZero(minutes, 2))
      .replace('ss', DateUtils.padStartWithZero(seconds, 2))
      .replace('SSS', DateUtils.padStartWithZero(milliseconds, 3));
  }

  private static padStartWithZero(value: number, maxLength: number): string {
    return String(value).padStart(maxLength, '0');
  }

  private static hasHoursFormat(format: string) {
    return format.search(DateUtils.hoursFormat) >= 0;
  }

  private static hasMinutesFormat(format: string) {
    return format.search(DateUtils.minutesFormat) >= 0;
  }

  private static hasSecondsFormat(format: string) {
    return format.search(DateUtils.secondsFormat) >= 0;
  }

  public static getAge(birthdate: Date): number {
    if(!birthdate) {
      return null;
    }

    return moment().diff(birthdate, 'years');
  }

}
