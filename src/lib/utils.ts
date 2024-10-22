/**
 * Takes an argument `length` (a number) and returns a randomized string based on that length
 * @param length
 * @returns string
 */
export const generateToken: (length: number) => string = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$&#";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * 100) % chars.length);
  }
  return result;
};

/**
 * Takes date and a weekStart argument, then returns the beggining of the week
 * @param date
 * @param weekStart
 * @returns
 */
export const getWeekStartDate: (date: Date, weekStart?: number) => Date = (
  date,
  weekStart = 4
) => {
  //creates a new date object so we don't override the old one
  const dupDate = new Date(date.getTime());

  //gets the current day of the week from the date object
  const currentDayOfTheWeek = dupDate.getDay();

  //subtracks the first day of the week from the current
  let firstOfWeek: number = currentDayOfTheWeek - weekStart;

  //if the firstOfWeek is less then 0 (which means the week start was before Sundat)
  //it adds 7 to compensate
  if (firstOfWeek < 0) {
    firstOfWeek += 7;
  }

  //setting the date instead of creating a new date object IS NECESSARY
  //as this allows the js to compensate if a week started in a previous month
  dupDate.setDate(date.getDate() - firstOfWeek);

  return dupDate;
};

/**
 * Takes a date and a week start (reffering to the day of the week) to create a label that will be used to organize payouts in a table
 * @param date
 * @param weekStart
 * @returns string
 */
export const getWeekLabel: (date: Date, weekStart?: number) => string = (
  date,
  weekStart = 4
) => {
  const firstOfWeek = getWeekStartDate(date, weekStart);
  return `${firstOfWeek.getMonth() + 1}/${firstOfWeek.getDate()}`;
};
