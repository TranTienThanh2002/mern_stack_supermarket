import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./redux/contexts/cartContexts/cartContext.js";
import { QuickViewProvider } from "./redux/contexts/quickViewContext/quickViewContext";
import { CompareProvider } from "./redux/contexts/compareContext/compareContext";
import { WishlistProvider } from "./redux/contexts/wishlistContext/wishlistContext";
import { UserProvider } from "./redux/contexts/loginContext/loginContext";
import dotenv from "dotenv";
import { FillterProductProvider } from "./redux/contexts/filterProductContext/filterProductContext";
import { PaginationOfSellerProvider } from "./redux/contexts/paginationOfSeller/paginationOfSeller";
import { PaginationSearchProvider } from "./redux/contexts/paginationSearch/paginationSearch";
import { LoadingPageProvider } from "./redux/contexts/loadingPage/loadingPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

dotenv.config();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="801941775332-7uec78h8famb5v2mmak5da11lc0immp5.apps.googleusercontent.com">
      <LoadingPageProvider>
        <UserProvider>
          <FillterProductProvider>
            <PaginationSearchProvider>
              <PaginationOfSellerProvider>
                <CartProvider>
                  <QuickViewProvider>
                    <CompareProvider>
                      <WishlistProvider>
                        <App />
                      </WishlistProvider>
                    </CompareProvider>
                  </QuickViewProvider>
                </CartProvider>
              </PaginationOfSellerProvider>
            </PaginationSearchProvider>
          </FillterProductProvider>
        </UserProvider>
      </LoadingPageProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
