import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router";
import { LoginPage } from "../LoginPage";
import { LOGIN } from "@/graphql/mutations/login";
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

describe("LoginPage - Integration Tests", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isConnected: false,
      isAuthLoading: false,
    });
    // Clear all mock navigate calls from previous tests
    mockNavigate.mockClear();
  });

  it("should login with valid credentials", async () => {
    // Setup user event instance for simulating interactions
    const user = userEvent.setup();
    const mockProfile = {
      id: 1,
      email: "user@example.com",
      username: "user",
    };

    const mocks = [
      {
        // Mock the login mutation request
        request: {
          query: LOGIN,
          variables: {
            data: {
              email: "user@example.com",
              password: "ValidPass123!",
            },
          },
        },
        // Mock response from the server
        result: {
          data: {
            login: JSON.stringify(mockProfile),
          },
        },
      },
    ];

    // Render the component with mocked providers
    render(
      // Provide mocked Apollo Client
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </MockedProvider>,
    );

    // Fill the form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    await user.type(emailInput, "user@example.com");
    await user.type(passwordInput, "ValidPass123!");

    const submitButton = screen.getByRole("button", {
      name: /se connecter/i,
    });

    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);

    // After successful login, should navigate to dashboard
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });

    // Verify that user is set in the store
    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.user).toEqual({
        id: mockProfile.id,
        email: mockProfile.email,
        username: mockProfile.username,
      });
    });
  });

  it("should not login with invalid credentials", async () => {
    const user = userEvent.setup();

    const mocks = [
      {
        request: {
          query: LOGIN,
          variables: {
            data: {
              email: "wrong@example.com",
              password: "WrongPass123!",
            },
          },
        },
        error: new Error("Email ou mot de passe invalide."),
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </MockedProvider>,
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "WrongPass123!");

    const submitButton = screen.getByRole("button", {
      name: /se connecter/i,
    });

    await user.click(submitButton);

    // Verify that error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText(/email ou mot de passe invalide/i),
      ).toBeInTheDocument();
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
