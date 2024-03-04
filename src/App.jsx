import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from "./pages"

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>,
        errorElement: <SinglePageError/>,
        loader: landingLoader
      },
      {
        path:"cocktail/:id",
        errorElement: <SinglePageError/>,
        loader: singleCocktailLoader,
        element: <Cocktail/>
      },
      {
        path:"newsletter",
        element: <Newsletter/>
      },
      {
        path:"about",
        element: <About/>,
        children: [
          {
            index: true,
            element: <h2>Our compony</h2>
          },
          {
            path:"person",
            element: <h2>John dea</h2>
          },
        ]
      }
    ]
  },
  
])

const App = () => {
  return <RouterProvider router={router} />
};
export default App;
