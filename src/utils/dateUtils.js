export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

export const getRemainingDaysText = (remainingDays) => {
  if (remainingDays === 'Задача просрочена') return remainingDays;
  if (remainingDays === 0) return 'До конца сегодняшнего дня';
  if (remainingDays === 1) return `${remainingDays} день`;
  if (remainingDays >= 2 && remainingDays <= 4) return `${remainingDays} дня`;
  return `${remainingDays} дней`;
};

export const calculateRemainingDays = (totalTime) => {
  if (!totalTime) return '';

  const totalTimeDate = new Date(totalTime);
  if (isNaN(totalTimeDate.getTime())) return '';

  const today = new Date();
  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  const endOfTotalTime = new Date(totalTimeDate);
  endOfTotalTime.setHours(23, 59, 59, 999);

  const diffTime = endOfTotalTime - endOfToday;
  const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

  if (diffDays === 0) {
    return 'До конца сегодняшнего дня';
  } else if (diffDays > 0) {
    return getRemainingDaysText(diffDays);
  } else {
    return 'Задача просрочена';
  }
};
