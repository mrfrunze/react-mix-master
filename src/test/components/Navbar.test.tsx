import React from "react";
import { it, expect, describe } from "vitest";
import Navbar from "../../components/Navbar";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

describe("Navbar component MixMaster", () => {
  it("render text MixMaster in logo", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const logoElement = screen.getByText(/^MixMaster$/i);
    expect(logoElement).toBeInTheDocument();

    // find link by text
    const homeLink = screen.getByRole("link", { name: /home/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });
    const newsletterLink = screen.getByRole("link", { name: /newsletter/i });

    // Verify that the links are present in the document
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(newsletterLink).toBeInTheDocument();

    // Verify href attributes for each link
    expect(homeLink).toHaveAttribute("href", "/");
    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(newsletterLink).toHaveAttribute("href", "/newsletter");
  });

  it("Applies active class to the current route", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Navbar />
      </MemoryRouter>
    )

      // Find links
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const homeLink = screen.getByRole('link', { name: /home/i });
    
    // Check that About has active class and Home does not
    expect(aboutLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });
});
