import { 
  createStore, 
  compose, 
  applyMiddleware, 
  combineReducers 
} from "redux";

import thunk from "redux-thunk";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  walletDetails: {
    wallet: localStorage.getItem("wallet")
      ? JSON.parse(localStorage.getItem("wallet"))
      : null,
  }
};

const reducer = combineReducers({
  
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;