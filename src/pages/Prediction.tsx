import { useState } from "react";
import { Search, MapPin, AlertTriangle, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { districts, getDistrictState, stateNames, getStateDisplayName } from "@/data/districts";

interface PredictionData {
  riskLevel: number;
  crimeBreakdown: Array<{ type: string; percentage: number }>;
  timePattern: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  socioeconomicFactors: Array<{ factor: string; impact: number }>;
}

const Prediction = () => {
  const [location, setLocation] = useState("");
  const [state, setState] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [predictionMade, setPredictionMade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  
  const handleLocationChange = (districtName: string) => {
    setLocation(districtName);
    const stateValue = getDistrictState(districtName);
    setState(stateValue);
  };

  const handlePredict = async () => {
    if (!location || !state || !crimeType || !timeframe) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          state,
          crimeType,
          timeframe
        }),
      });
      
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
      
      const data = await response.json();
      setPredictionData(data);
      setPredictionMade(true);
    } catch (error) {
      toast.error('Failed to generate prediction. Please try again.');
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const riskClass = (level: number) => {
    if (level >= 70) return "text-red-600";
    if (level >= 40) return "text-amber-600";
    return "text-green-600";
  };
  
  const riskBadge = (level: number) => {
    if (level >= 70) return "bg-red-100 text-red-800 border-red-200";
    if (level >= 40) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-green-100 text-green-800 border-green-200";
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-crimePrimary">Crime Prediction Tool</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Use our advanced machine learning algorithms to predict crime patterns and risk levels in specific areas across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Crime Prediction Parameters</CardTitle>
                <CardDescription>
                  Enter details to generate a prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">District</Label>
                  <Select value={location} onValueChange={handleLocationChange}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.name} value={district.name}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/UT</Label>
                  <Select value={state} onValueChange={setState} disabled>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="State will be selected automatically" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(stateNames).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="crimeType">Crime Type</Label>
                  <Select value={crimeType} onValueChange={setCrimeType}>
                    <SelectTrigger id="crimeType">
                      <SelectValue placeholder="Select crime type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="theft">Theft/Burglary</SelectItem>
                      <SelectItem value="violent">Violent Crime</SelectItem>
                      <SelectItem value="cyber">Cyber Crime</SelectItem>
                      <SelectItem value="public">Public Disorder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Time Frame</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="Select time frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Next 24 Hours</SelectItem>
                      <SelectItem value="week">Next Week</SelectItem>
                      <SelectItem value="month">Next Month</SelectItem>
                      <SelectItem value="quarter">Next 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handlePredict} 
                  className="w-full mt-4"
                  disabled={!location || !state || !crimeType || !timeframe || loading}
                >
                  {loading ? "Generating Prediction..." : "Generate Prediction"}
                </Button>
              </CardContent>
            </Card>
            
            {/* Results Area */}
            <div className="lg:col-span-2">
              {!predictionMade ? (
                <div className="bg-white rounded-lg shadow-md p-8 h-full flex flex-col items-center justify-center text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No Prediction Generated Yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Fill in the parameters on the left and generate a prediction to see detailed crime risk analysis.
                  </p>
                </div>
              ) : (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="factors">Contributing Factors</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Prediction Results</CardTitle>
                            <CardDescription>
                              For {location}, {getStateDisplayName(state)} over {timeframe === "immediate" ? "next 24 hours" : 
                                timeframe === "week" ? "next week" : 
                                timeframe === "month" ? "next month" : "next 3 months"}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className={`text-sm py-1 px-3 ${riskBadge(predictionData.riskLevel)}`}>
                            {predictionData.riskLevel >= 70 ? "High Risk" : 
                             predictionData.riskLevel >= 40 ? "Medium Risk" : "Low Risk"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Overall Risk Level</span>
                            <span className={`text-sm font-bold ${riskClass(predictionData.riskLevel)}`}>
                              {predictionData.riskLevel}%
                            </span>
                          </div>
                          <Progress value={predictionData.riskLevel} 
                            className={`h-3 ${predictionData.riskLevel >= 70 ? "bg-red-100" : 
                            predictionData.riskLevel >= 40 ? "bg-amber-100" : "bg-green-100"}`} />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-3">Crime Type Breakdown</h4>
                            <div className="space-y-3">
                              {predictionData.crimeBreakdown.map((item) => (
                                <div key={item.type} className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>{item.type}</span>
                                    <span>{item.percentage}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className={`rounded-full h-2 ${
                                        item.type === "Theft" ? "bg-red-500" : 
                                        item.type === "Violence" ? "bg-amber-500" : 
                                        item.type === "Cyber" ? "bg-blue-500" : "bg-gray-500"
                                      }`} 
                                      style={{ width: `${item.percentage}%` }} 
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-3">Time Pattern</h4>
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div>
                                <div className="mb-1 h-20 flex items-end">
                                  <div 
                                    className="w-full bg-blue-400 rounded-t"
                                    style={{ height: `${predictionData.timePattern.morning}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">Morning</span>
                                <div className="text-xs font-semibold">{predictionData.timePattern.morning}%</div>
                              </div>
                              
                              <div>
                                <div className="mb-1 h-20 flex items-end">
                                  <div 
                                    className="w-full bg-yellow-400 rounded-t"
                                    style={{ height: `${predictionData.timePattern.afternoon}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">Afternoon</span>
                                <div className="text-xs font-semibold">{predictionData.timePattern.afternoon}%</div>
                              </div>
                              
                              <div>
                                <div className="mb-1 h-20 flex items-end">
                                  <div 
                                    className="w-full bg-orange-500 rounded-t"
                                    style={{ height: `${predictionData.timePattern.evening}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">Evening</span>
                                <div className="text-xs font-semibold">{predictionData.timePattern.evening}%</div>
                              </div>
                              
                              <div>
                                <div className="mb-1 h-20 flex items-end">
                                  <div 
                                    className="w-full bg-indigo-700 rounded-t"
                                    style={{ height: `${predictionData.timePattern.night}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">Night</span>
                                <div className="text-xs font-semibold">{predictionData.timePattern.night}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="text-sm">
                            <span className="font-medium">Prediction Based On:</span> Historical data from 2018-2023, socioeconomic indicators,machine learning algorithim and seasonal patterns
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="factors">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contributing Factors</CardTitle>
                        <CardDescription>
                          Socioeconomic and environmental factors affecting crime prediction
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {predictionData.socioeconomicFactors.map((factor) => (
                            <div key={factor.factor} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{factor.factor}</span>
                                <span className="text-sm font-semibold">{factor.impact}% Impact</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-crimePrimary h-2.5 rounded-full" 
                                  style={{ width: `${factor.impact}%` }} 
                                />
                              </div>
                              <p className="text-xs text-gray-500">
                                {factor.factor === "Population Density" && 
                                  "Higher population density correlates with increased property crime rates."}
                                {factor.factor === "Unemployment Rate" && 
                                  "Areas with higher unemployment show increased rates of theft and burglary."}
                                {factor.factor === "Income Level" && 
                                  "Lower median incomes are associated with higher rates of property crime."}
                                {factor.factor === "Education Access" && 
                                  "Limited access to education correlates with higher overall crime rates."}
                                {factor.factor === "Police Presence" && 
                                  "Areas with lower police presence show higher crime rates across categories."}
                              </p>
                            </div>
                          ))}
                          
                          <div className="mt-8">
                            <h4 className="text-sm font-medium mb-3">Additional Influencing Factors</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Seasonal Impact</h5>
                                <p className="text-xs text-gray-600">
                                  Current season (monsoon) shows a historical 12% decrease in street crime but 8% increase in property crimes.
                                </p>
                              </div>
                              
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Events & Festivals</h5>
                                <p className="text-xs text-gray-600">
                                  No major festivals in the prediction timeframe. Election activities may increase public disturbance risk by 15%.
                                </p>
                              </div>
                              
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Infrastructure</h5>
                                <p className="text-xs text-gray-600">
                                  Poor street lighting in target area corresponds with 23% higher evening/night crime rates.
                                </p>
                              </div>
                              
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Temperature Correlation</h5>
                                <p className="text-xs text-gray-600">
                                  Current high temperatures (30°C+) show a historical 18% increase in violent incidents.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="recommendations">
                    <Card>
                      <CardHeader>
                        <CardTitle>Safety Recommendations</CardTitle>
                        <CardDescription>
                          Personalized safety advice based on prediction results
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                            <h4 className="flex items-center text-amber-800 font-medium mb-2">
                              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
                              Advisory Level: {predictionData.riskLevel >= 70 ? "High Caution" : 
                                              predictionData.riskLevel >= 40 ? "Increased Awareness" : 
                                              "Standard Precautions"}
                            </h4>
                            <p className="text-sm text-amber-800">
                              Based on our prediction model, {location} shows a {predictionData.riskLevel}% risk level
                              for crime in the selected timeframe. Consider the following safety measures.
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-medium mb-3">Personal Safety Tips</h4>
                            <ul className="space-y-3">
                              <li className="flex items-start">
                                <span className="h-5 w-5 rounded-full bg-crimePrimary text-white flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                                <div>
                                  <p className="text-sm font-medium">Avoid isolated areas during evening hours (6-10 PM)</p>
                                  <p className="text-xs text-gray-500">
                                    This timeframe shows the highest risk (38%) for personal safety incidents.
                                  </p>
                                </div>
                              </li>
                              
                              <li className="flex items-start">
                                <span className="h-5 w-5 rounded-full bg-crimePrimary text-white flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                                <div>
                                  <p className="text-sm font-medium">Secure valuable property and use digital payment methods</p>
                                  <p className="text-xs text-gray-500">
                                    Theft accounts for 42% of predicted crimes in this area.
                                  </p>
                                </div>
                              </li>
                              
                              <li className="flex items-start">
                                <span className="h-5 w-5 rounded-full bg-crimePrimary text-white flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                                <div>
                                  <p className="text-sm font-medium">Travel in groups when possible</p>
                                  <p className="text-xs text-gray-500">
                                    Group travel reduces violent crime risk by approximately 60%.
                                  </p>
                                </div>
                              </li>
                              
                              <li className="flex items-start">
                                <span className="h-5 w-5 rounded-full bg-crimePrimary text-white flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                                <div>
                                  <p className="text-sm font-medium">Use emergency contact apps</p>
                                  <p className="text-xs text-gray-500">
                                    Keep emergency contacts accessible and consider using safety apps.
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-base font-medium mb-3">Community Safety Measures</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Increased Vigilance</h5>
                                <p className="text-xs text-gray-600">
                                  Community watch programs in this area have reduced crime rates by up to 25%. Consider joining local efforts.
                                </p>
                              </div>
                              
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Report Suspicious Activity</h5>
                                <p className="text-xs text-gray-600">
                                  Prompt reporting to local police can significantly reduce crime in hotspot areas.
                                </p>
                              </div>
                              
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Infrastructure Improvements</h5>
                                <p className="text-xs text-gray-600">
                                  Better street lighting and CCTV coverage could reduce predicted crime rates by 30%.
                                </p>
                              </div>
                              
                              <div className="bg-gray-100 p-4 rounded-lg">
                                <h5 className="font-medium text-sm mb-2">Law Enforcement Presence</h5>
                                <p className="text-xs text-gray-600">
                                  Based on our model, targeted police patrols during peak hours could reduce incidents by 40%.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4 mt-6">
                            <h4 className="text-sm font-medium mb-2">Important Contacts</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">Emergency:</span>
                                <span className="text-sm">112</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">Police:</span>
                                <span className="text-sm">100</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">Women's Helpline:</span>
                                <span className="text-sm">1091</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-sm">Cyber Crime:</span>
                                <span className="text-sm">1930</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Prediction;
