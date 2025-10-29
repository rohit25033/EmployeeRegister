import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, UserCircle, ChefHat, Store, ArrowRight, HelpCircle, Users } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary" data-testid="icon-logo">
                <ChefHat className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground" data-testid="text-brand-name">QSRConnect</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              data-testid="button-help"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="w-full max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-primary" data-testid="icon-blue-collar" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground" data-testid="text-hero-headline">
                Empowering restaurants with
                <br />
                <span className="text-primary">Blue-collar talent</span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-hero-subtext">
              Find verified staff or discover job opportunities with trusted brands.
            </p>
          </div>

          {/* Call-to-Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Worker CTA */}
            <Card
              className="p-8 sm:p-10 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 group bg-gradient-to-br from-primary/5 to-transparent"
              onClick={() => setLocation("/employee-register")}
              data-testid="card-worker-cta"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <UserCircle className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-worker-cta-heading">
                    I Want to Work
                  </h2>
                  <p className="text-muted-foreground" data-testid="text-worker-cta-subtext">
                    Find verified restaurant jobs near you.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full gap-2 text-base"
                  data-testid="button-worker-register"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation("/employee-register");
                  }}
                >
                  <Briefcase className="w-5 h-5" />
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>

            {/* Employer CTA */}
            <Card
              className="p-8 sm:p-10 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 group bg-gradient-to-br from-secondary/5 to-transparent"
              onClick={() => setLocation("/qsr-register")}
              data-testid="card-employer-cta"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Store className="w-8 h-8 text-secondary" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="text-employer-cta-heading">
                    I Want to Hire
                  </h2>
                  <p className="text-muted-foreground" data-testid="text-employer-cta-subtext">
                    Hire verified staff for your restaurant or franchise.
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full gap-2 text-base"
                  data-testid="button-employer-register"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation("/qsr-register");
                  }}
                >
                  <ChefHat className="w-5 h-5" />
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-trust-heading">Trusted by leading QSR brands</p>
            <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap" data-testid="list-trust-brands">
              <span className="text-lg font-semibold text-muted-foreground/60" data-testid="text-brand-mcdonalds">McDonald's</span>
              <span className="text-lg font-semibold text-muted-foreground/60" data-testid="text-brand-starbucks">Starbucks</span>
              <span className="text-lg font-semibold text-muted-foreground/60" data-testid="text-brand-kfc">KFC</span>
              <span className="text-lg font-semibold text-muted-foreground/60" data-testid="text-brand-dominos">Domino's</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-about">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">
                Terms of Use
              </a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-contact">
                Contact
              </a>
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © 2025 QSRConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
