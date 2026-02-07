import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
const router = createBrowserRouter([{ path: "/", element: <App /> }]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
