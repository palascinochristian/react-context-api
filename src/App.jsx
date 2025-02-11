import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import AboutUs from "./pages/AboutUs";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
