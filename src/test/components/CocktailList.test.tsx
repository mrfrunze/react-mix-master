import React from "react";
import CocktailList from "../../components/CocktailList";
import { it, expect, describe } from 'vitest'
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const H4_TEXT = "No matching 👋 cocktails found 🥺..."
const H5_TEXT = "Please reload page 👌"

const getHeadings = () => {
  const h4 = screen.getByRole("heading", { level: 4 })
  const h5 = screen.getByRole("heading", { level: 5 })
  return { h4, h5 }
}

const mockDrinks = [
  {
    idDrink: "1",
    strDrink: "Margarita",
    strDrinkThumb: "margarita.jpg",
    strAlcoholic: "Alcoholic",
    strGlass: "Cocktail glass",
  },
  {
    idDrink: "2",
    strDrink: "Mojito",
    strDrinkThumb: "mojito.jpg",
    strAlcoholic: "Non alcoholic",
    strGlass: "Highball glass",
  },
];


describe('CocktailList', () => {
  it('should be renders fallback messages when drinks is undefined', () => {
    render(<CocktailList drinks={undefined} />)

    const { h4, h5 } = getHeadings()
    expect(h4).toBeInTheDocument()
    expect(h4).toHaveTextContent(H4_TEXT)
    expect(h5).toBeInTheDocument()
    expect(h5).toHaveTextContent(H5_TEXT)
  }) 

  it('should be renders fallback messages when drinks is an empty array', () => {
    render(<CocktailList drinks={[]} />)

    const { h4, h5 } = getHeadings()
    expect(h4).toBeInTheDocument()
    expect(h4).toHaveTextContent(H4_TEXT)
    expect(h5).toBeInTheDocument()
    expect(h5).toHaveTextContent(H5_TEXT)
  })

  it('should be render CocktailCard components when drinks array is not empty', () => {
    render(
      <MemoryRouter>
        <CocktailList drinks={mockDrinks} />
      </MemoryRouter>
    );

    expect(screen.getByText("Margarita")).toBeInTheDocument()
    expect(screen.getByText("Mojito")).toBeInTheDocument()

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockDrinks.length);
    expect(images[0]).toHaveAttribute("src", "margarita.jpg");
    expect(images[1]).toHaveAttribute("src", "mojito.jpg");

    expect(screen.getByText(/Alcoholic/)).toBeInTheDocument();
    expect(screen.getByText(/Cocktail glass/)).toBeInTheDocument();
    expect(screen.getByText(/Highball glass/)).toBeInTheDocument();
  })
})