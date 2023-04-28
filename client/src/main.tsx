/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Link,
  Outlet,
  Router
} from "@tanstack/react-location";
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
import ReactDOM from "react-dom";
import { location, routes } from "./routes";


const App = () => {
  return (
    <Router
      location={location}
      routes={routes}
    >
      <div>
        <Link
          to="/"
        >
          Home
        </Link>{" "}
        <Link to="posts" >
          Posts
        </Link>
      </div>
      <hr />
      <Outlet /> {/* Start rendering router matches */}
      <ReactLocationDevtools initialIsOpen={false} />
    </Router>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
