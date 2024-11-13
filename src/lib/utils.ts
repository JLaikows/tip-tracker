import db from "./primsa";
import { TGenerateToken, TGetWeekLabel, TGetWeekStartDate } from "./types";
import { TGenerateSerial } from "./types/utils";

/**
 * Takes in the name and state of a client and returns a serialized version for a unique identifier.
 * **Warning:** Calls DB to check uniqueness
 * @param name string
 * @param state string
 * @returns string
 */
export const generateSerial: TGenerateSerial = async (name, state) => {
  let unique = false;

  const firstLetters =
    name.split("")[0].toUpperCase() + name.split("")[1].toUpperCase();
  let serial: string = "";

  //checks for rows with the same identifier in the DB
  //if none exist, it breaks the loop, allowing the client to be created
  while (!unique) {
    const numbers: number = Math.floor(100 + Math.random() * 900);

    const client = await db.client.findFirst({
      where: { serial: firstLetters + numbers },
    });

    if (!client) {
      //sets unique to true and serial to the generated string if no client is found,
      unique = true;
      serial = firstLetters + state + numbers;
    }
  }

  return serial;
};

/**
 * Takes an argument `length` (a number) and returns a randomized string based on that length
 * @param length
 * @returns string
 */
export const generateToken: TGenerateToken = (length) => {
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
export const getWeekStartDate: TGetWeekStartDate = (date, weekStart = 4) => {
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
export const getWeekLabel: TGetWeekLabel = (date, weekStart = 4) => {
  const firstOfWeek = getWeekStartDate(date, weekStart);
  return `${firstOfWeek.getMonth() + 1}/${firstOfWeek.getDate()}`;
};

/**
 * Returns a formatted string for dollar amounts
 * @param amount number
 */
export const formatCurrency = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
}).format;
