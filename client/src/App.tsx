import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import RegistrationPage from "@/pages/registration";
import QSROTPVerificationPage from "@/pages/qsr-otp-verification";
import QSRRegistrationPage from "@/pages/qsr-registration";
import QSRDashboardPage from "@/pages/qsr-dashboard";
import DashboardPage from "@/pages/dashboard";
import HomePage from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/employee-register" component={RegistrationPage} />
      <Route path="/qsr-register" component={QSROTPVerificationPage} />
      <Route path="/qsr-registration" component={QSRRegistrationPage} />
      <Route path="/qsr-dashboard" component={QSRDashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/home" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
