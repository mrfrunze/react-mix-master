import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Cocktail, Error, HomeLayout, Landing, Newsletter, SinglePageError } from "./pages"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/Newsletter";
import { QueryClient,  QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 100*60-5,
    }
  }
})

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
        loader: landingLoader(queryClient)
      },
      {
        path:"cocktail/:id",
        errorElement: <SinglePageError/>,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail/>
      },
      {
        path:"newsletter",
        element: <Newsletter/>,
        action: newsletterAction,
        errorElement: <SinglePageError/>
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
  return <QueryClientProvider client={queryClient} >
    <RouterProvider router={router} />
    {/* <ReactQueryDevtools initialIsOpen={false}/> */}
  </QueryClientProvider>
};
export default App;
