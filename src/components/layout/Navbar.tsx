
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Shield, MapPin, AlertTriangle, Info, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-crimePrimary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-crimeAccent" />
              <span className="text-xl font-bold">Crime Rate Prediction</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              <BarChart3 className="mr-1 h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/prediction" className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              <MapPin className="mr-1 h-5 w-5" />
              <span>Prediction</span>
            </Link>
            <Link to="/safety" className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              <AlertTriangle className="mr-1 h-5 w-5" />
              <span>Safety</span>
            </Link>
            <Link to="/about" className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors">
              <Info className="mr-1 h-5 w-5" />
              <span>About</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-blue-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-crimePrimary">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/dashboard" 
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart3 className="mr-1 h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/prediction" 
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="mr-1 h-5 w-5" />
              <span>Prediction</span>
            </Link>
            <Link 
              to="/safety" 
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <AlertTriangle className="mr-1 h-5 w-5" />
              <span>Safety</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-3 py-2 rounded-md hover:bg-blue-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Info className="mr-1 h-5 w-5" />
              <span>About</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
