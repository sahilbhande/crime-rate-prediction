
import { ArrowRight, BarChart3, MapPin, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="crime-gradient text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Advanced Crime Prediction for a Safer India
                </h1>
                <p className="text-lg md:text-xl">
                  Using data analytics and machine learning to predict, prevent, and protect communities across India.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-crimeAccent hover:bg-amber-500 text-crimePrimary">
                    <Link to="/dashboard">
                      Explore Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-crimePrimary">
                    <Link to="/prediction">
                      Try Prediction Tool
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://1.bp.blogspot.com/-KDdz3pYiaWU/YQ6P5Wm0ceI/AAAAAAAAChw/BJTaZqADxLcFGnDbjAhn_GyWy9AwlP1VwCLcBGAsYHQ/s900/Cyber-Crime-SQ1-1920-x-1080.jpg" 
                  alt="Crime prediction visualization" 
                  className="rounded-lg shadow-lg w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-crimePrimary">Key Features</h2>
              <p className="mt-4 text-lg text-gray-600">
                Comprehensive tools to analyze, predict, and prevent crime
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="crime-card p-6">
                <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
                  <BarChart3 className="h-6 w-6 text-crimePrimary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-crimePrimary">Data Analytics</h3>
                <p className="text-gray-600">
                  Comprehensive crime statistics analysis from across India, integrating multiple data sources.
                </p>
              </div>

              <div className="crime-card p-6">
                <div className="inline-block p-3 bg-amber-100 rounded-lg mb-4">
                  <MapPin className="h-6 w-6 text-crimeAccent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-crimePrimary">Hotspot Mapping</h3>
                <p className="text-gray-600">
                  Identify high-risk areas using advanced geographical and temporal pattern recognition.
                </p>
              </div>

              <div className="crime-card p-6">
                <div className="inline-block p-3 bg-red-100 rounded-lg mb-4">
                  <AlertTriangle className="h-6 w-6 text-crimeSecondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-crimePrimary">Predictive Modeling</h3>
                <p className="text-gray-600">
                  Machine learning algorithms to forecast crime trends and potential incidents.
                </p>
              </div>

              <div className="crime-card p-6">
                <div className="inline-block p-3 bg-green-100 rounded-lg mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-crimePrimary">Safety Recommendations</h3>
                <p className="text-gray-600">
                  Personalized safety tips and resource allocation advice based on predictions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-crimePrimary mb-6">About This Project</h2>
                <p className="text-gray-600 mb-4">
                  Crime Rate Prediction is an innovative platform that leverages advanced data analytics and 
                  machine learning to predict crime patterns across India. We combine data from various 
                  sources including the National Crime Records Bureau, meteorological data, socio-economic 
                  indicators, and more.
                </p>
                <p className="text-gray-600 mb-4">
                  Our mission is to assist law enforcement agencies in resource allocation, help policymakers 
                  develop more effective prevention strategies, and provide citizens with tools to enhance 
                  their personal safety.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="crime-stat-card border-crimeSecondary">
                    <h4 className="text-xl font-bold text-gray-800">28+</h4>
                    <p className="text-gray-600">Indian states and territories analyzed</p>
                  </div>
                  <div className="crime-stat-card border-crimeAccent">
                    <h4 className="text-xl font-bold text-gray-800">95%</h4>
                    <p className="text-gray-600">Prediction accuracy in test regions</p>
                  </div>
                  <div className="crime-stat-card border-crimePrimary">
                    <h4 className="text-xl font-bold text-gray-800">10+</h4>
                    <p className="text-gray-600">Types of crime patterns analyzed</p>
                  </div>
                  <div className="crime-stat-card border-green-500">
                    <h4 className="text-xl font-bold text-gray-800">5</h4>
                    <p className="text-gray-600">Years of historical data integrated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        {/* CTA Section */}
        <section className="bg-crimePrimary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to explore crime data?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Start using our dashboard to view crime statistics, predictions, and safety recommendations for your area.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-crimeAccent hover:bg-amber-500 text-crimePrimary">
                <Link to="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent border-white hover:bg-white hover:text-crimePrimary">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
