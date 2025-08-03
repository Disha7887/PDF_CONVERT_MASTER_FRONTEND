import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Home,
  Wrench,
  BookOpen,
  Menu,
  X
} from "lucide-react";

export const DashboardHeader = (): JSX.Element => {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation menu items data (only Home, Tools, About)
  const navItems = [
    { name: "Home", href: "/dashboard" },
    { name: "Tools", href: "/tools" },
    { name: "About", href: "/about" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      setLocation(href);
    }
  };

  const handleLogoClick = () => {
    setLocation("/dashboard");
  };

  const handleManagePlan = () => {
    setLocation("/dashboard/manage-plans");
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center">
          <div
            onClick={handleLogoClick}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h1 className="[font-family:'Pacifico',Helvetica] font-normal text-gray-900 text-lg sm:text-xl leading-7 whitespace-nowrap">
              <span className="hidden sm:inline">PDF Convert Master</span>
              <span className="sm:hidden">PDF Master</span>
            </h1>
          </div>
        </div>

        {/* Desktop Center - Navigation Menu */}
        <NavigationMenu className="hidden lg:flex justify-center">
          <NavigationMenuList className="flex space-x-6">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className="[font-family:'Roboto',Helvetica] font-medium text-gray-600 text-base leading-6 whitespace-nowrap cursor-pointer hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Right - Plan Status, Notifications and Profile */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {/* Plan Status */}
          <div className="hidden lg:flex items-center px-3 py-2 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm font-medium text-blue-800">{user?.plan || 'Pro Plan'}</span>
          </div>

          {/* Manage Plan Button */}
          <Button variant="outline" className="hidden lg:flex text-sm" onClick={handleManagePlan}>
            <Settings className="w-4 h-4 mr-2" />
            Manage Plan
          </Button>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="px-2 lg:px-4 py-2 rounded-lg flex items-center space-x-2 lg:space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-sm font-semibold">{user?.initials || 'U'}</span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium">{user?.name || 'User'}</p>
                  <p className="text-xs text-red-100">{user?.location || 'Location'}</p>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setLocation("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleManagePlan} className="lg:hidden">
                <Settings className="mr-2 h-4 w-4" />
                <span>Manage Plan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed top-[73px] right-0 left-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className="block w-full text-left [font-family:'Roboto',Helvetica] font-medium text-gray-600 text-base leading-6 hover:text-gray-900 transition-colors py-2"
                    onClick={() => {
                      handleNavClick(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Mobile User Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-base font-semibold text-gray-700">{user?.initials || 'U'}</span>
                  </div>
                  <div>
                    <p className="text-base font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-600">{user?.location || 'Location'}</p>
                  </div>
                </div>

                {/* Plan Status */}
                <div className="flex items-center px-3 py-2 mb-4 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm font-medium text-blue-800">{user?.plan || 'Pro Plan'}</span>
                </div>

                {/* Mobile Action Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      handleManagePlan();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setLocation("/dashboard/profile");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
