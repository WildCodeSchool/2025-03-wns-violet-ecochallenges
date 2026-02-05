import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router";
import RegisterPage from "../RegisterPage";
import { SIGNUP_MUTATION } from "@/graphql/mutations/signup";
import { useAuthStore } from "@/stores/authStore";

// Create a mock function to spy on navigation calls
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RegisterPage - Integration Tests", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isConnected: false,
      isAuthLoading: false,
    });
    // Clear all mock navigate calls from previous tests
    mockNavigate.mockClear();
  });

  it("should create an account with valid data", async () => {
    // Setup user event instance for simulating interactions
    const user = userEvent.setup();
    const mockProfile = {
      id: 1,
      email: "newuser@example.com",
      username: "newuser",
    };

    const mocks = [
      {
        // Mock the signup mutation request
        request: {
          query: SIGNUP_MUTATION,
          variables: {
            data: {
              email: "newuser@example.com",
              password: "ValidPass123!",
            },
          },
        },
        // Mock response from the server
        result: {
          data: {
            signup: JSON.stringify(mockProfile),
          },
        },
      },
    ];

    // Render the component with mocked providers
    render(
      // Provide mocked Apollo Client
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </MockedProvider>,
    );

    // Fill the form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    await user.type(emailInput, "newuser@example.com");
    await user.type(passwordInput, "ValidPass123!");

    const submitButton = screen.getByRole("button", {
      name: /s'inscrire/i,
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    // After successful signup, should navigate to dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
        replace: true,
      });
    });
  });

  it("should not create an account with existing data", async () => {
    const user = userEvent.setup();

    const mocks = [
      {
        request: {
          query: SIGNUP_MUTATION,
          variables: {
            data: {
              email: "existing@example.com",
              password: "ValidPass123!",
            },
          },
        },
        error: new Error("Email ou mot de passe invalide."),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </MockedProvider>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    await user.type(emailInput, "existing@example.com");
    await user.type(passwordInput, "ValidPass123!");

    const submitButton = screen.getByRole("button", {
      name: /s'inscrire/i,
    });

    await user.click(submitButton);

    // Verify that error message is displayed
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        /email ou mot de passe invalide/i,
      );
    });

    // Verify that user is not created in the store
    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isConnected).toBe(false);
    });

    // Verify that navigation did not occur
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
