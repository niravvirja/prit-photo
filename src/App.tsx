
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventGallery from "./pages/EventGallery";
import NotFound from "./pages/NotFound";
import Loader from "@/components/Loader";
import useAssetPreloader from "./hooks/useAssetPreloader";
import { assetsToPreload } from "./config/preload-assets";

const queryClient = new QueryClient();

const App = () => {
  const assetsLoaded = useAssetPreloader(assetsToPreload);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!assetsLoaded ? (
          <Loader />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventGallery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
