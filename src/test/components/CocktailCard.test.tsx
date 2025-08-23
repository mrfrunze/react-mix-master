import CocktailCard from "../../components/CocktailCard";
import { it, expect, describe } from 'vitest'
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const mock = {
  id: '11007',
  name: 'Margarita',
  image: 'https://example.com/margarita.jpg',
  info: 'Alcoholic',
  glass: 'Cocktail glass',
};

const renderWithRouter = () => {
    render(
        <MemoryRouter>
            <CocktailCard
                id={mock.id}
                name={mock.name}
                image={mock.image}
                info={mock.info}
                glass={mock.glass}
            />
        </MemoryRouter>
    )
}

describe('CocktailCard group', () => {
    it('should be render image with proper src and alt', () => {
        renderWithRouter()

        const img = screen.getByRole("img", {name: mock.name})
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute("src", mock.image)
        expect(img).toHaveClass("img")
    })

    it('should be render name, glass, info and text', () => {
        renderWithRouter()
        expect(screen.getByRole("heading", {level: 4, name: mock.name})).toBeInTheDocument()        
        expect(screen.getByRole("heading", {level: 5, name: mock.glass})).toBeInTheDocument()        
        expect(screen.getByText(mock.info)).toBeInTheDocument()        
    })

    it('should be link with correct href and class', () => {
        renderWithRouter()

        const link = screen.getByRole("link", {name: /details/i})
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute("href", `/coctail/${mock.id}`)
        expect(link).toHaveClass("btn")
    })
})