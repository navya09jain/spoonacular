import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import SearchRecipes from "./pages/SearchRecipes";
import FeedbackForm from "./pages/FeedbackForm";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipes",
        element: <SearchRecipes />,
      },

      {
        path: "/feedback",
        element: <FeedbackForm />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
