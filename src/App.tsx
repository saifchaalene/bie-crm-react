
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import ContactView from "./pages/ContactView";
import Delegates from "./pages/Delegates";
import MemberStates from "./pages/MemberStates";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
          <Route path="/contacts/:id" element={<Layout><ContactView /></Layout>} />
          <Route path="/delegates" element={<Layout><Delegates /></Layout>} />
          <Route path="/member-states" element={<Layout><MemberStates /></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
