import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Homepage from "./pages/Homepage/index.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import Signuppage from "./pages/Registerpage/Index.tsx";
import "./index.css";
import "./styles/fonts.css";

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
        path: "/Signup",
        element: <Signuppage />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_URL_FROM_CLIENT}/`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
