import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Homepage from "./pages/Homepage/index.tsx";
import Signuppage from "./pages/Registerpage/Index.tsx";
import "./index.css";
import "./styles/fonts.css";
import { Login } from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/signup",
        element: <Signuppage />,
      },
      {
        path: "/signin",
        element: <Login />,

      }
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
