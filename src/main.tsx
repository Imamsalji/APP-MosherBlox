import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppWrapper } from "./component/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./assets/css/index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <App />
      </AppWrapper>
    </QueryClientProvider>
  </ThemeProvider>,
);
