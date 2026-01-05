import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import "./index.css";
import "./styles/fonts.css";
import { LoginPage } from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Error404 from "./pages/Error404.tsx";
import DashboardPage from "./pages/DashboardPage/index.tsx";
import XmasGiftPage from "./pages/XmasGiftPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <RegisterPage />,
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: "/xmas-gift",
        element: <XmasGiftPage />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_URL_FROM_CLIENT}/`,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
