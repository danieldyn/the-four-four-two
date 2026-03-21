const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * 
 * @param {string} date
 * @returns {string} The date reformatted as "Day Month Year" for game header readability
 *          Example: 2006-07-09T00:00:00.000Z => 09 July 2006
 */
export default function format_date(date) {
  const [year, month, day] = date.split("T")[0].split("-");
  const monthName = MONTHS[parseInt(month, 10) - 1];

  return `${day} ${monthName} ${year}`;
}
