import React, { useState, useMemo, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import Header from "./components/header";
import Home from "./home/home";
import Categories from "./pages/classic/categories";
import Todo from "./pages/classic/todo";
import CatTodo from "./pages/cat/cattodo";
import CatCategories from "./pages/cat/catcategories";
import Rtccategories from "./pages/rtc/rtccategories";
import Rtqtodo from "./pages/rtc/rtctodo";
import InfoById from "./pages/info-by-id/info-by-id";

export function AppRouter() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/cattodo" element={<CatTodo />} />
          <Route path="/catcategories" element={<CatCategories />} />
          <Route path="/Zustandcategories" element={<Rtccategories />} />
          <Route path="/Mobx" element={<Rtqtodo />} />
          <Route path="/rtctodo/:id" element={<InfoById />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
