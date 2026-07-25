import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import QuotesSection from "../../components/landing/QuotesSection";
import Footer from "../../components/landing/Footer";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LandingPage() { 
  const { user, loading } = useAuth();
   if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <QuotesSection />
      <Footer />
    </>
  );
}