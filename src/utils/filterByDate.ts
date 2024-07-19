export interface Comment {
  id: number;
  message: string;
  designer: string[];
  date_created: string;
}

//Фильтрация комментариев по возрастанию дней
export default function filteredByDate(comments: Comment[]) {
  return comments
    .slice()
    .sort(
      (a, b) =>
        new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
    );
}
