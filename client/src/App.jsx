import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import HomePage from "@/pages/site/HomePage";
import AboutPage from "@/pages/site/AboutPage";
import ApproachPage from "@/pages/site/ApproachPage";
import ContactPage from "@/pages/site/ContactPage";
import ServicesPage from "@/pages/site/ServicesPage";
import InsightsPage from "@/pages/site/insights/InsightsPage";
import InsightPage from "@/pages/site/insights/InsightDetailPage";
import ProjectsPage from "@/pages/site/projects/ProjectDeskPage";
import NewProjectPage from "@/pages/site/projects/NewProjectPage";
import { LoginPage } from "@/components/auth/LoginPage";
import { RegisterPage } from "@/components/auth/RegisterPage";
import { ForgotPasswordPage } from "@/components/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/components/auth/ResetPasswordPage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import { NotFound } from "@/components/NotFound";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { MfaChallengePage } from "@/components/auth/MfaChallengePage";
import AccountSecurityPage from "@/pages/AccountSecurityPage";

function PageMeta({ title, description, noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;
    const setMeta = (name, content) => {
      let node = document.querySelector(`meta[name="${name}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute("name", name); document.head.appendChild(node); }
      node.setAttribute("content", content);
    };
    if (description) setMeta("description", description);
    if (noindex) setMeta("robots", "noindex, nofollow");
    else document.querySelector('meta[name="robots"]')?.remove();
  }, [title, description, noindex]);
  return null;
}
function SiteLayout({ children }) {
  return <div className="flex min-h-screen flex-col bg-background"><SiteHeader /><main className="flex-1">{children}</main><SiteFooter /></div>;
}
function RequireAuth({ children }) {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  if (isLoadingAuth) return <div className="container-x py-32 text-center font-body text-xs uppercase tracking-widest">Checking session…</div>;
  if (!isAuthenticated) return <Navigate to="/login?returnTo=%2Fprojects" replace />;
  return children;
}
function AppRoutes() {
  return <Routes>
    <Route path="/" element={<SiteLayout><PageMeta title="Skyline Syndicate — Real Estate Decisions, Made With Perspective | Pune" description="Premium real estate consulting and advisory for buyers, investors and businesses across Pune. Residential, commercial, luxury, land, industrial and sale-side advisory." /><HomePage /></SiteLayout>} />
    <Route path="/about" element={<SiteLayout><PageMeta title="About the Practice — Skyline Syndicate, Pune" description="Skyline Syndicate is an independent real estate advisory practice in Pune, retained by the client and working from evidence rather than vendor incentives." /><AboutPage /></SiteLayout>} />
    <Route path="/approach" element={<SiteLayout><PageMeta title="Our Approach — Understand, Research, Evaluate, Advise, Guide | Skyline Syndicate" description="The five-stage Skyline Syndicate advisory process: understand, research, evaluate, advise and guide — applied to every Pune property mandate." /><ApproachPage /></SiteLayout>} />
    <Route path="/contact" element={<SiteLayout><PageMeta title="Contact — Book a Consultation | Skyline Syndicate Pune" description="Request a private real estate advisory consultation with Skyline Syndicate, Pune. Contact the advisory desk by email, phone or WhatsApp." /><ContactPage /></SiteLayout>} />
    <Route path="/services" element={<SiteLayout><PageMeta title="Advisory Services — Residential, Commercial, Luxury, Land & Industrial | Skyline Syndicate" description="Six advisory disciplines: residential, commercial, luxury property, land and plot, industrial real estate, and property selling advisory across Pune." /><ServicesPage /></SiteLayout>} />
    <Route path="/insights" element={<SiteLayout><PageMeta title="Insights — The Skyline Perspective | Skyline Syndicate Pune" description="Editorial notes on Pune real estate: changing corridors, property as an investment, first-time buyer diligence, and residential versus commercial assets." /><InsightsPage /></SiteLayout>} />
    <Route path="/insights/:slug" element={<SiteLayout><InsightPage /></SiteLayout>} />
    <Route path="/projects" element={<RequireAuth><SiteLayout><PageMeta title="Project Desk — Internal Prototype | Skyline Syndicate" description="Internal prototype register for newly opened advisory projects." noindex /><ProjectsPage /></SiteLayout></RequireAuth>} />
    <Route path="/projects/new" element={<RequireAuth><SiteLayout><PageMeta title="New Project — Internal Prototype | Skyline Syndicate" description="Open a new advisory project record in the internal prototype workflow." noindex /><NewProjectPage /></SiteLayout></RequireAuth>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/auth/callback" element={<AuthCallbackPage />} />
    <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
    <Route path="/verify-mfa" element={<MfaChallengePage />} />
    <Route
  path="/account/security"
  element={
    <RequireAuth>
      <AccountSecurityPage />
    </RequireAuth>
  }
/>
  </Routes>;
}
export default function App() {
  return <BrowserRouter><AuthProvider><MotionConfig reducedMotion="user"><AppRoutes /></MotionConfig><Toaster /></AuthProvider></BrowserRouter>;
}
