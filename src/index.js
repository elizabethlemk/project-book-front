import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, combineReducers } from "redux";
import user from "./reducers/userReducer";
import project from "./reducers/projectReducer";
import blog from "./reducers/blogReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

window._ = require("lodash");

const rootReducer = combineReducers({
  userReducer: user,
  projectReducer: project,
  blogReducer: blog
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
