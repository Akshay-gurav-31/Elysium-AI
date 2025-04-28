import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircle, LogOut, Menu, X } from "lucide-react";
import logo from "@/img/logo.png"; // Ensure this exists, or replace with placeholder

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Use user.type instead of userType
  const userType = user?.type;

  return (
    <nav className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-gradient-to-r from-black to-blue-950 shadow-lg" 
        : "bg-gradient-to-r from-black via-blue-950 to-black"
    )}>
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-900 bg-opacity-20 rounded-full p-1 backdrop-blur-sm transition-all duration-300 group-hover:bg-opacity-30 border border-blue-800/30">
              <img
                src={logo}
                alt="Elysium AI Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  // Show fallback "E" if image fails to load
                  const span = e.currentTarget.nextElementSibling as HTMLElement;
                  if (span) span.classList.remove("hidden");
                }}
              />
              <span className="hidden text-lg font-bold text-blue-300">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">Elysium AI</span>
              <span className="text-xs text-blue-400">Advanced Intelligence</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: "/", label: "Home" },
              { path: "/services", label: "Services" },
              { path: "/shop", label: "Shop" }, // Lowercase to match App.tsx
              { path: "/library", label: "Library" },
              { path: "/tracker", label: "Tracker" }, // Lowercase to match App.tsx
              { path: "/about", label: "About" },
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "relative py-1 font-medium transition-colors",
                  isActive(item.path) 
                    ? "text-white" 
                    : "text-blue-200 hover:text-white"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300",
                  isActive(item.path) ? "w-full" : "group-hover:w-full"
                )}></span>
              </Link>
            ))}
            
            {(!isAuthenticated || userType === "patient") && (
              <Link 
                to="/chatbot" 
                className={cn(
                  "relative py-1 font-medium transition-colors",
                  isActive("/chatbot") 
                    ? "text-white" 
                    : "text-blue-200 hover:text-white"
                )}
              >
                AI Support
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300",
                  isActive("/chatbot") ? "w-full" : "group-hover:w-full"
                )}></span>
              </Link>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to={userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"} // Use lowercase route to match App.tsx
                  className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-900 bg-opacity-40 flex items-center justify-center border border-blue-800/30">
                    <UserCircle size={20} className="text-blue-200" />
                  </div>
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <Button
                  variant="ghost"
                  className="border border-blue-800 bg-black bg-opacity-40 hover:bg-blue-900 text-blue-100 hover:text-white transition-all"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    className="border border-blue-800 bg-black bg-opacity-40 hover:bg-blue-900 text-blue-100 hover:text-white transition-all"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white transition-all shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white bg-blue-900 bg-opacity-40 p-2 rounded-lg border border-blue-800/30"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-screen pt-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4 pb-4">
            {[
              { path: "/", label: "Home" },
              { path: "/services", label: "Services" },
              { path: "/shop", label: "Shop" }, // Lowercase to match App.tsx
              { path: "/library", label: "Library" },
              { path: "/tracker", label: "Tracker" }, // Lowercase to match App.tsx
              { path: "/about", label: "About" },
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={cn(
                  "py-2 px-3 rounded-lg transition-all",
                  isActive(item.path) 
                    ? "bg-blue-900 bg-opacity-40 text-white border-l-2 border-blue-500" 
                    : "text-blue-200 hover:bg-blue-900 hover:bg-opacity-20 hover:text-white hover:border-l-2 hover:border-blue-700"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {(!isAuthenticated || userType === "patient") && (
              <Link 
                to="/chatbot" 
                className={cn(
                  "py-2 px-3 rounded-lg transition-all",
                  isActive("/chatbot") 
                    ? "bg-blue-900 bg-opacity-40 text-white border-l-2 border-blue-500" 
                    : "text-blue-200 hover:bg-blue-900 hover:bg-opacity-20 hover:text-white hover:border-l-2 hover:border-blue-700"
                )}
              >
                AI Support
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3 pt-2 border-t border-blue-900 mt-2">
                <Link
                  to={userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard"} // Use lowercase route to match App.tsx
                  className="flex items-center space-x-3 py-2 px-3 text-blue-100 hover:bg-blue-900 hover:bg-opacity-20 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-900 bg-opacity-40 flex items-center justify-center border border-blue-800/30">
                    <UserCircle size={20} className="text-blue-200" />
                  </div>
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <Button
                  variant="ghost"
                  className="border border-blue-800 bg-black bg-opacity-40 hover:bg-blue-900 text-blue-100 hover:text-white transition-all w-full"
                  onClick={handleLogout}
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-2 border-t border-blue-900 mt-2">
                <Link to="/login" className="w-full">
                  <Button 
                    variant="ghost" 
                    className="border border-blue-800 bg-black bg-opacity-40 hover:bg-blue-900 text-blue-100 hover:text-white transition-all w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button 
                    className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white transition-all shadow-md hover:shadow-lg w-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;