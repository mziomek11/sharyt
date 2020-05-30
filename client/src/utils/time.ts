export function formatToHoursAndMinutes(time: number): string {
  const date = new Date(time);
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  const strHours: string = (hours < 10 ? "0" : "") + hours.toString();
  const strMinutes: string = (minutes < 10 ? "0" : "") + minutes.toString();

  return strHours + ":" + strMinutes;
}

export function isSentTimeEqual(time1: number, time2: number): boolean {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  return (
    date1.getMinutes() - date2.getMinutes() === 0 &&
    date1.getHours() - date2.getHours() === 0 &&
    date1.getDay() - date2.getDay() === 0
  );
}
