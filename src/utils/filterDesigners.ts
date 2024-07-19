import { useEffect, useState } from "react";

import DesignersSlice, { fetchDesigners } from "../redux/slices/DesignersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface Issue {
  key: string;
  date_created: string;
  status: string;
  date_started_by_designer: string;
  date_finished_by_designer: string;
}

// interface Designers {
//   avatar: string;
//   username: string;
//   email: string;
//   issues: [];
// }

//Фильтрация задач по статусу
export function filterFinishedTasks(issues: Issue[]): Issue[] {
  return issues.filter((issue) => issue.status === "Done");
}

export function filterInProgressTasks(issues: Issue[]): Issue[] {
  return issues.filter((issue) => issue.status === "In Progress");
}

//Фильтрация по времени и количеству задач
function calculateMedian(dates: number[]): number {
  dates.sort((a, b) => a - b);
  const mid = Math.floor(dates.length / 2);
  return dates.length % 2 !== 0
    ? dates[mid]
    : (dates[mid - 1] + dates[mid]) / 2;
}

function getMedianTime(designer) {
  const validIssues = designer.issues.filter(
    (issue) => issue.date_finished_by_designer
  );
  const times = validIssues.map((issue) => {
    const start = new Date(issue.date_started_by_designer).getTime();
    const end = new Date(issue.date_finished_by_designer).getTime();
    return end - start;
  });
  const medianTime = calculateMedian(times);
  return medianTime;
}

export default function filterTopDesigners(designers) {
  const topD = designers.map((designer) => ({
    username: designer.username,
    avatar: designer.avatar,
    issuesCount: designer.issues.length,
    medianTime: getMedianTime(designer),
    medianTimeInDays: (getMedianTime(designer) / (1000 * 3600 * 24)).toFixed(2),
  }));
  topD.sort((a, b) => {
    if (a.issuesCount !== b.issuesCount) {
      return b.issuesCount - a.issuesCount;
    } else {
      return a.medianTime - b.medianTime;
    }
  });
  return topD;
}
