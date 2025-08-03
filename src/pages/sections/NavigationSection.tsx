import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const NavigationSection = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { login, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu items data
  const navItems = [
    { name: "Home", width: "w-[42.98px]", href: "/" },
    { name: "Tools", width: "w-[38.66px]", href: "/tools" },
    { name: "Pricing", width: "w-[50.38px]", href: "/pricing" },
    { name: "About", width: "w-[42.98px]", href: "/about" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      setLocation(href);
    }
  };

  // Simulated login function (replace with real authentication)
  const handleLogin = () => {
    const mandaUser = {
      id: 'manda_onzale_001',
      name: 'Manda Onzale',
      email: 'manda@example.com',
      location: 'London, UK',
      initials: 'MO',
      plan: 'Pro Plan'
    };

    login(mandaUser);
    console.log('User logged in successfully');
  };

  const handleGetStarted = () => {
    // Redirect to signup page
    setLocation('/signup');
  };

  return (
    <header className="w-full h-[65px] bg-[#111726] border-b border-[#374050] shadow-[0px_10px_15px_-3px_#0000001a,0px_4px_6px_-4px_#0000001a]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-[65px]">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center h-7">
            <h1 className="[font-family:'Pacifico',Helvetica] font-normal text-white text-lg sm:text-xl leading-7 whitespace-nowrap">
              <span className="hidden sm:inline">PDF Convert Master</span>
              <span className="sm:hidden">PDF Master</span>
            </h1>
          </div>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden lg:flex justify-center">
            <NavigationMenuList className="flex space-x-8">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index} className={item.width}>
                  <NavigationMenuLink
                    className="[font-family:'Roboto',Helvetica] font-medium text-[#d0d5da] text-base leading-6 whitespace-nowrap cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleNavClick(item.href)}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              className="h-[42px] px-3 lg:px-[17px] py-[9px] rounded-lg border border-[#4a5462] [font-family:'Roboto',Helvetica] font-medium !text-white text-sm lg:text-base hover:!text-white hover:bg-[#4a5462] transition-colors bg-transparent flex items-center gap-2"
              onClick={() => setLocation('/dashboard')}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden lg:inline">Dashboard</span>
            </Button>
            <Button
              variant="outline"
              className="h-[42px] px-3 lg:px-[17px] py-[9px] rounded-lg border border-[#4a5462] [font-family:'Roboto',Helvetica] font-medium !text-white text-sm lg:text-base hover:!text-white hover:bg-[#4a5462] transition-colors bg-transparent"
              onClick={() => setLocation('/signin')}
            >
              Log In
            </Button>
            <Button
              className="h-10 px-4 lg:px-6 py-2 rounded-lg [font-family:'Roboto',Helvetica] font-medium text-sm lg:text-base [text-shadow:0px_10px_15px_#0000001a]"
              onClick={handleGetStarted}
            >
              <span className="hidden lg:inline">Get Started</span>
              <span className="lg:hidden">Start</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border border-[#4a5462] !text-white hover:!text-white hover:bg-[#4a5462] transition-colors bg-transparent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed top-[65px] right-0 left-0 bg-[#111726] border-b border-[#374050] shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left [font-family:'Roboto',Helvetica] font-medium text-[#d0d5da] text-base leading-6 hover:text-white transition-colors py-2"
                    onClick={() => {
                      handleNavClick(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-[#374050] space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-[42px] rounded-lg border border-[#4a5462] [font-family:'Roboto',Helvetica] font-medium !text-white text-base hover:!text-white hover:bg-[#4a5462] transition-colors bg-transparent flex items-center justify-center gap-2"
                  onClick={() => {
                    setLocation('/dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-[42px] rounded-lg border border-[#4a5462] [font-family:'Roboto',Helvetica] font-medium !text-white text-base hover:!text-white hover:bg-[#4a5462] transition-colors bg-transparent"
                  onClick={() => {
                    setLocation('/signin');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="w-full h-10 rounded-lg [font-family:'Roboto',Helvetica] font-medium text-base [text-shadow:0px_10px_15px_#0000001a]"
                  onClick={() => {
                    handleGetStarted();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
