//Сколько дней, часов и минут прошло с момента публикации комментария

export default function getCountedDays(date: string) {
  const currentDate = new Date().getTime();
  const createdDate = new Date(date).getTime();
  const timeDifference = currentDate - createdDate;
  const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 3600)) / (1000 * 60)
  );
  return {
    days: dayDifference,
    hours: hoursDifference,
    minutes: minutesDifference,
  };
}
