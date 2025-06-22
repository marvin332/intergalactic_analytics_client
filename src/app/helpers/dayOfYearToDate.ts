export function dayOfYearToDate(dayNumber: number): string {
     if (dayNumber < 0) {
          throw new RangeError("dayNumber должен быть ≥ 0");
     }

     const ordinal = Math.min(dayNumber + 1, 365);

     const year = 2021;
     const date = new Date(year, 0);
     date.setDate(ordinal);

     const day = date.getDate();
     const monthNames = [
          "января",
          "февраля",
          "марта",
          "апреля",
          "мая",
          "июня",
          "июля",
          "августа",
          "сентября",
          "октября",
          "ноября",
          "декабря",
     ];
     const month = monthNames[date.getMonth()];

     return `${day} ${month}`;
}
