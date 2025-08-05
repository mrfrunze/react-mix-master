import { render, screen } from "@testing-library/react"
import React from "react"
import { it, expect, describe, vi } from 'vitest'
import SearchForm from "../../components/SearchForm"
import { useNavigation } from "react-router-dom";


vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  const mockUseNavigation = vi.fn()

  return {
    ...actual,
    Form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    useNavigation: mockUseNavigation,
  };
});

const mockedUseNavigation = vi.mocked(useNavigation);

describe('SearchForm component', () => {
    
    it('renders search input and submit button (idle state)', () => {
        mockedUseNavigation.mockReturnValue({ state: "idle" } as any);
        render(<SearchForm searchTerm="margarita" />)

        // Check input
        const input = screen.getByRole("searchbox")
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute("name", "search")
        expect(input).toHaveValue("margarita")

        // Check button text
        const button = screen.getByRole("button", {name: /search/i})
        expect(button).toBeInTheDocument()
        expect(button).toHaveTextContent("search")
        expect(button).not.toBeDisabled()
    })

    it('should be renders button in submitting state', () => {
        mockedUseNavigation.mockReturnValue({ state: "submitting" } as any);

        render(<SearchForm searchTerm="margarita" />)

        const button = screen.getByRole("button", {name: /searching/i})
        expect(button).toBeDisabled()
        expect(button).toHaveTextContent("searching...")
    })
})
