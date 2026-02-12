import { StrictMode, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./app";

import type { PropsInfo } from "@garfish/bridge-react-v18";

const generateRoute = (basename: string = "") =>
  createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
      },
    ],
    { basename },
  );

export default function RootComponent({ basename }: Partial<PropsInfo>) {
  const router = useMemo(() => generateRoute(basename), [basename]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
