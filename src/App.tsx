import MainPage from "./components/pages/MainPage";
import TasksPage from "./components/pages/TasksPage";
import DesignerPage from "./components/pages/DesignerPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeContext } from "./utils/Theme";
import { useContext } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/designers",
    element: <DesignerPage />,
  },
  {
    path: "/tasks",
    element: <TasksPage />,
  },
]);

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Provider store={store}>
        <Header />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
