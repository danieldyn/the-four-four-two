const MONTHS: readonly string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Reformats an ISO date string to "Day Month Year".
 * Example: 2006-07-09T... => 09 July 2006
 */
export default function formatDate(date: string): string {
  // Split the ISO string to get the YYYY-MM-DD part
  const datePart = date.split("T")[0];
  if (!datePart)
    return "Unknown Date";

  const [year, month, day] = datePart.split("-");
  
  // Safety check for the month index
  const monthIndex = parseInt(month || "0", 10) - 1;
  const monthName = MONTHS[monthIndex] || "Unknown";

  return `${day} ${monthName} ${year}`;
}
