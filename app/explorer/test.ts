function getMonthLabel(weekNumber: number): string {
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = Math.floor((weekNumber - 1) / 4);
  return monthLabels[monthIndex];
}

function getMonthLabelByWeekNumber(weekNumber: number): string {
  if (weekNumber > 52) {
    return "";
  }

  return getMonthLabel(weekNumber);
}
