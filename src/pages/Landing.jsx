import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import axios from "axios";
import SearchForm from "../components/SearchForm";

import { useQuery } from "@tanstack/react-query";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const defaultLetterUrl =
  "https://thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

const searchCocktailsQuery = (searchTerm) => {
  const apiUrl = searchTerm
    ? `${cocktailSearchUrl}${searchTerm}`
    : defaultLetterUrl;

  return {
    queryKey: ["cocktails", searchTerm || "default"],
    queryFn: async () => {
      const response = await axios.get(apiUrl);
      const drinksData = response.data.drinks;
      // console.log("API response:", response.data);

      // Гарантируем массив
      return Array.isArray(drinksData) ? drinksData : [];
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const searchTerm = url.searchParams.get("search") || "";

    // Предзагрузка данных в кэш
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return {searchTerm}
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  // console.log(drinks);
    // Запрос через React Query
  const {
    data: drinks = [],
    isLoading,
    isError,
  } = useQuery(searchCocktailsQuery(searchTerm));

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading cocktails...</p>;
  }

  if (isError) {
    return <p style={{ textAlign: "center", color: "red" }}>Failed to load cocktails</p>;
  }


  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
