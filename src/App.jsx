import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About, Cocktail, Error, HomeLayout, Landing, Newsletter } from "./pages"

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomeLayout/>,
    children: [
      {
        index: true,
        element: <Landing/>
      },
      {
        path:"cocktail",
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
