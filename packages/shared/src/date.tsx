export interface DateObject {
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  second: number;
}

export const formateDate = (date: Date): string => {
  return (
    [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
    [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
  );
};
