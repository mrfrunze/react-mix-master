import Wrapper from "../assets/wrappers/CocktailList"
import CocktailCard from "./CocktailCard"
import React from "react";

const CocktailList = ({drinks}) => {
  if(!Array.isArray(drinks) || drinks.length === 0) {
    return (
      <>
        <h4 style={{textAlign: "center"}}>
          No matching 👋 cocktails found 🥺...
        </h4>
        <h5 style={{textAlign: "center", lineHeight:"1.8", fontSize:"25px"}}>Please reload page 👌</h5>

      </>
     
    )
  }

  const formattedDrinks = drinks.map(item => {
    const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item
    return {
      id: idDrink, 
      name: strDrink, 
      image:strDrinkThumb, 
      info: strAlcoholic, 
      glass: strGlass 
    }
  })

  return (
    <Wrapper>
      {formattedDrinks.map(item => {
        return <CocktailCard key={item.id} {...item}/>
      })}
    </Wrapper>
  )
}

export default CocktailList