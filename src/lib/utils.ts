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
 * Takes a date and a week start (reffering to the day of the week) to create a label that will be used to organize payouts in a table
 * @param date
 * @param weekStart
 * @returns string
 */
export const getWeekLabel: (date: Date, weekStart?: number) => string = (
  date,
  weekStart = 4
) => {
  //gets the current day of the week from the date object
  const currentDayOfTheWeek = date.getDay();

  //subtracks the first day of the week from the current
  let firstOfWeek: number = currentDayOfTheWeek - weekStart;

  //if the firstOfWeek is less then 0 (which means the week start was before Sundat)
  //it adds 7 to compensate
  if (firstOfWeek < 0) {
    firstOfWeek += 7;
  }

  //setting the date instead of creating a new date object IS NECESSARY
  //as this allows the js to compensate if a week started in a previous month
  date.setDate(date.getDate() - firstOfWeek);

  return `${date.getMonth() + 1}/${date.getDate()}`;
};
