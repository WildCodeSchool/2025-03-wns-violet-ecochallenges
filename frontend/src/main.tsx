import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App.tsx";
import HomePage from "./pages/HomePage/index.tsx";
import "./index.css";
import "./styles/fonts.css";
import { LoginPage } from "./pages/LoginPage.tsx";
import CreateChallengePage from "./pages/CreateChallengePage/index.tsx"
import RegisterPage from "./pages/RegisterPage.tsx";
import Error404 from "./pages/Error404.tsx";
import DashboardPage from "./pages/DashboardPage/index.tsx";
import XmasGiftPage from "./pages/XmasGiftPage.tsx";
import ChallengePage from "./pages/ChallengePage/index.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

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
        path: "/new-challenge",
        element: <CreateChallengePage />
      },
      {
        path: "/signin",
        element: <LoginPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/challenge",
        element: <ChallengePage />,
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
