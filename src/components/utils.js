// A utility function to format a date and time from an ISO string
export function getTimeFromISOString(isoString) {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the time as "hh:mm AM/PM"
  const formattedTime = `${hours % 12}:${minutes < 10 ? "0" : ""}${minutes} ${
    hours >= 12 ? "PM" : "AM"
  }`;

  return formattedTime;
}
