
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-crimePrimary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-crimeAccent mr-2" />
              <span className="text-lg font-bold">Crime Rate Prediction</span>
            </div>
            <p className="text-sm">
              Empowering citizens and authorities with crime prediction and prevention tools for a safer India.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm hover:underline">Crime Dashboard</Link>
              </li>
              <li>
                <Link to="/prediction" className="text-sm hover:underline">Prediction Tool</Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm hover:underline">Safety Recommendations</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:underline">About & Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://ncrb.gov.in/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  National Crime Records Bureau
                </a>
              </li>
              <li>
                <a href="https://mausam.imd.gov.in/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  Indian Meteorological Department
                </a>
              </li>
              <li>
                <a href="https://censusindia.gov.in/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  Census of India
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-800">
          <p className="text-sm text-center">
            This is a research project. Made by Sahil Bhande , Ishwar Dasana , Ratish Jha and Sahil Sharma .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
