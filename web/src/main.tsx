import React from "react";
import ReactDOM from "react-dom/client";

import  '@solana/wallet-adapter-react-ui/styles.css';

import "./index.css";
import "./common.css";
import "./animation.css";

import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

// view
import Index from "./views/Index/index";
import Qualify from "./views/Qualify/index";
import PK from "./views/PK/index";
import Rank from "./views/Rank/index";
import { Test }  from "./views/Test/index";

import { SOLProvider }  from "./components/Context";

const router = createHashRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/qualify",
    element: <Qualify />,
  },
  {
    path: "/pk",
    element: <PK />,
  },
  {
    path: "/rank",
    element: <Rank />,
  },
  {
    path: "/test",
    element: <Test />,
  }
]);

ReactDOM.createRoot(document.getElementById("container")!).render(
  <React.StrictMode>
    <SOLProvider>
      <RouterProvider router={router} />
    </SOLProvider>
  </React.StrictMode>
);
