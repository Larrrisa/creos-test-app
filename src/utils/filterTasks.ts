interface Task {
  id: number;
  status: string;
  date_finished: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
}

//Сортировка задач по неделям для BarChart

export function getWeekNumber(date: Date) {
  const newDate = new Date(date.getTime() - 11 * 60 * 60 * 1000);
  const firstDayOfYear = new Date(newDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function filterTasksByWeek(tasks: Task[], numWeeks: number) {
  const currentWeekNumber = getWeekNumber(new Date());

  const weeksData = Array.from({ length: numWeeks }, (_, i) => ({
    week: currentWeekNumber - (numWeeks - 1 - i),
    received_from_client: 0,
    send_to_account_manager: 0,
    send_to_project_manager: 0,
    send_to_designer: 0,
    difference: 0,
  }));

  tasks.forEach((task) => {
    const taskWeekNumber = getWeekNumber(new Date(task.date_finished));
    const weekData = weeksData.find((week) => week.week === taskWeekNumber);

    if (weekData) {
      weekData.received_from_client += task.received_from_client;
      weekData.send_to_account_manager += task.send_to_account_manager;
      weekData.send_to_project_manager += task.send_to_project_manager;
      weekData.send_to_designer += task.send_to_designer;
      weekData.difference +=
        task.received_from_client -
        (task.send_to_account_manager +
          task.send_to_project_manager +
          task.send_to_designer);
    }
  });

  return weeksData;
}
