import { Outlet } from "react-router-dom"

function HomeLayout() {
  return (
    <div>
      <nav><h2>Nav bar</h2></nav>
      {/* <h1>HomeLayout</h1> */}
      <Outlet/>
      <footer>
        <h3>Footer</h3>
      </footer>
    </div>
  )
}

export default HomeLayout