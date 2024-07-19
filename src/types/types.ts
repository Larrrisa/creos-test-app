export interface Comments {
  id: number;
  message: string;
  designer: string[];
  date_created: string;
}

export interface CommentsState {
  entities: Comments[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export interface Designers {
  avatar: string;
  username: string;
  email: string;
  issues: [];
  issuesCount: number;
  medianTimeInDays: number;
}

export interface ApiResponse {
  results: Designers[];
  next: string;
}

export interface DesignersState {
  entities: Designers[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export interface Tasks {
  id: number;
  status: string;
}

export interface TasksState {
  entities: Tasks[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export interface Issue {
  key: string;
  date_created: string;
  status: string;
  date_started_by_designer: string;
  date_finished_by_designer: string;
}
