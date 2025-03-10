import React, { useState, useEffect } from "react";
import { Button } from "./ui/button.jsx";
import { ModeToggle } from "./ui/mode-toggle.jsx";
import { useAuth } from "../contexts/AuthContext"; 

const Navbar = () => {
  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dark mode state
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  // Get userId from AuthContext
  const { userId } = useAuth();
  const isLoggedIn = Boolean(userId);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle dark mode
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <nav className="bg-background text-foreground shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center space-x-2 text-xl font-bold">
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isLoggedIn ? (
              <>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Home
                </a>
                <a
                  href={`/list/${userId}`}
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  List
                </a>
                <a
                  href="/add"
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Add
                </a>

                <a
                  href="/logout"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Logout
                </a>
                <ModeToggle isDark={isDark} toggleTheme={toggleTheme} />
              </>
            ) : (
              <>
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Home
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Register
                </a>
                <a
                  href="/add"
                  className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Add
                </a>
                <ModeToggle isDark={isDark} toggleTheme={toggleTheme} />
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <ModeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <Button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background text-foreground border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {isLoggedIn ? (
              <>
                <a
                  href="/"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Home
                </a>
                <a
                  href={`/list/${userId}`}
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  List
                </a>
                <a
                  href="/add"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Add
                </a>
                <a
                  href="/logout"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Home
                </a>
                <a
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Register
                </a>
                <a
                  href="/add"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Add
                </a>
                <a
                  href="/logout"
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Logout
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
