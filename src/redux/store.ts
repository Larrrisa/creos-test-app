import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./slices/CommentsSlice";
import designersReducer from "./slices/DesignersSlice";
import tasksReducer from "./slices/TasksSlice";

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    designers: designersReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
