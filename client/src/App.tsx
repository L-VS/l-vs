import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import AdminDashboard from "@/pages/AdminDashboard";
import ProjectManager from "@/pages/ProjectManager";
import MessagesManager from "@/pages/MessagesManager";
import SettingsPage from "@/pages/SettingsPage";
import ProjectDetail from "@/pages/ProjectDetail";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard";
import { SecretAdmin } from "@/components/SecretAdmin";
import { SecretKeyHandler } from "@/components/SecretKeyHandler";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/projects" component={ProjectManager} />
      <Route path="/admin/messages" component={MessagesManager} />
      <Route path="/admin/settings" component={SettingsPage} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/lvs-secret-access" component={SecretAdmin} />
      <Route path="/super-admin-dashboard" component={SuperAdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SecretKeyHandler />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
