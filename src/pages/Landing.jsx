import { useLoaderData } from "react-router-dom";
import CocktailList from "../components/CocktailList";
import axios from "axios";
import SearchForm from "../components/SearchForm";

import { useQuery } from "@tanstack/react-query";
const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      // console.log("API response:", response.data);

      // Гарантируем, что вернется массив, даже если drinks = null или другая ошибка
      if (!response.data.drinks || typeof response.data.drinks !== "object") {
        return [];
      }

      return response.data.drinks;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);

    const rawSearchTerm = url.searchParams.get("search");
    const searchTerm =
      rawSearchTerm && rawSearchTerm.trim() !== "" ? rawSearchTerm : "all";
    // console.log("Final search term:", searchTerm); // Лог для проверки

    // Запрашиваем данные только при необходимости
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
    return { searchTerm: rawSearchTerm || "" };
  };

const Landing = () => {
  const { searchTerm } = useLoaderData();
  // console.log(drinks);
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};

export default Landing;
