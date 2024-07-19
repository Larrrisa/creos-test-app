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
}

export interface ApiResponse {
  results: Designers[];
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
