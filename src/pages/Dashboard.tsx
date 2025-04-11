import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, MapPin, TrendingUp, TrendingDown, Users, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import IndiaMap from "@/components/IndiaMap";


const crimeData = [
  { state: "Maharashtra", violent: 2345, property: 5432, cyber: 1234 },
  { state: "Delhi", violent: 3456, property: 4321, cyber: 2345 },
  { state: "Uttar Pradesh", violent: 4567, property: 3456, cyber: 1345 },
  { state: "Karnataka", violent: 1678, property: 4567, cyber: 3456 },
  { state: "Tamil Nadu", violent: 2789, property: 3678, cyber: 1567 },
];

const trendData = [
  { month: "Jan", violent: 1000, property: 1200, cyber: 800 },
  { month: "Feb", violent: 1200, property: 1100, cyber: 900 },
  { month: "Mar", violent: 900, property: 1300, cyber: 950 },
  { month: "Apr", violent: 1100, property: 1400, cyber: 1000 },
  { month: "May", violent: 1300, property: 1350, cyber: 1100 },
  { month: "Jun", violent: 1250, property: 1450, cyber: 1200 },
];

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState<string>("all");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-crimePrimary">Crime Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Visualize and analyze crime patterns across India
              </p>
            </div>
            
            
          </div>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Crimes</CardTitle>
                <AlertTriangle className="h-4 w-4 text-crimeSecondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28,459</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">3.6%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Violent Crimes</CardTitle>
                <AlertTriangle className="h-4 w-4 text-crimeSecondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,295</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">2.1%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Property Crimes</CardTitle>
                <BarChart2 className="h-4 w-4 text-crimePrimary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14,389</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">5.2%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Cyber Crimes</CardTitle>
                <Users className="h-4 w-4 text-crimeAccent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,775</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12.8%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Crime by State</CardTitle>
                  <CardDescription>
                    Comparison of different crime categories across states
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={crimeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="state" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="violent" name="Violent Crimes" fill="#dc2626" />
                      <Bar dataKey="property" name="Property Crimes" fill="#1a365d" />
                      <Bar dataKey="cyber" name="Cyber Crimes" fill="#eab308" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crime Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of crime categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={crimeData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="state" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="violent" name="Violent" fill="#dc2626" />
                          <Bar dataKey="property" name="Property" fill="#1a365d" />
                          <Bar dataKey="cyber" name="Cyber" fill="#eab308" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Crime Factors</CardTitle>
                    <CardDescription>
                      Key contributing factors to crime rates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Unemployment Rate</p>
                          <span className="text-sm text-gray-500">72%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-crimePrimary h-2 rounded-full w-[72%]"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Population Density</p>
                          <span className="text-sm text-gray-500">64%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-crimePrimary h-2 rounded-full w-[64%]"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Income Inequality</p>
                          <span className="text-sm text-gray-500">56%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-crimePrimary h-2 rounded-full w-[56%]"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Education Level</p>
                          <span className="text-sm text-gray-500">48%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-crimePrimary h-2 rounded-full w-[48%]"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Law Enforcement Presence</p>
                          <span className="text-sm text-gray-500">42%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-crimePrimary h-2 rounded-full w-[42%]"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Crime Trends (Monthly)</CardTitle>
                  <CardDescription>
                    Crime patterns over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="violent" name="Violent Crimes" stroke="#dc2626" strokeWidth={2} />
                      <Line type="monotone" dataKey="property" name="Property Crimes" stroke="#1a365d" strokeWidth={2} />
                      <Line type="monotone" dataKey="cyber" name="Cyber Crimes" stroke="#eab308" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Patterns</CardTitle>
                    <CardDescription>
                      Crime rates by season and festivals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Festival Season (Oct-Nov)</h4>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-crimeSecondary h-3 rounded-full w-[85%]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Theft</span>
                          <span>+85%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Summer (Apr-Jun)</h4>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-crimeSecondary h-3 rounded-full w-[65%]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Violent Crime</span>
                          <span>+65%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Election Period</h4>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-crimeSecondary h-3 rounded-full w-[72%]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Public Disturbances</span>
                          <span>+72%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Monsoon (Jul-Sep)</h4>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-crimeAccent h-3 rounded-full w-[45%]"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Overall Crime</span>
                          <span>+45%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Time-based Analysis</CardTitle>
                    <CardDescription>
                      Crime patterns by time of day and day of week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Time of Day</h4>
                        <div className="grid grid-cols-4 gap-2 text-center mb-2">
                          <div className="text-xs">Morning<br/>(6-12)</div>
                          <div className="text-xs">Afternoon<br/>(12-18)</div>
                          <div className="text-xs">Evening<br/>(18-24)</div>
                          <div className="text-xs">Night<br/>(0-6)</div>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-green-200 py-2 rounded text-center text-xs font-medium">22%</div>
                          <div className="bg-yellow-200 py-2 rounded text-center text-xs font-medium">28%</div>
                          <div className="bg-red-200 py-2 rounded text-center text-xs font-medium">35%</div>
                          <div className="bg-red-300 py-2 rounded text-center text-xs font-medium">15%</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Day of Week</h4>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          <div className="text-xs">M</div>
                          <div className="text-xs">T</div>
                          <div className="text-xs">W</div>
                          <div className="text-xs">T</div>
                          <div className="text-xs">F</div>
                          <div className="text-xs">S</div>
                          <div className="text-xs">S</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          <div className="bg-yellow-200 py-2 rounded text-center text-xs font-medium">12%</div>
                          <div className="bg-yellow-200 py-2 rounded text-center text-xs font-medium">10%</div>
                          <div className="bg-yellow-200 py-2 rounded text-center text-xs font-medium">11%</div>
                          <div className="bg-yellow-200 py-2 rounded text-center text-xs font-medium">10%</div>
                          <div className="bg-red-200 py-2 rounded text-center text-xs font-medium">18%</div>
                          <div className="bg-red-300 py-2 rounded text-center text-xs font-medium">22%</div>
                          <div className="bg-yellow-200 py-2 rounded text-center text-xs font-medium">17%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="hotspots" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Crime Hotspots Map</CardTitle>
                  <CardDescription>
                    Geographic distribution of crime across India
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-[500px] relative">
                  <IndiaMap />
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Top High-Risk Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <span className="bg-red-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Dharavi, Mumbai</p>
                          <p className="text-sm text-gray-500">Property crime, 85% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-red-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">East Delhi</p>
                          <p className="text-sm text-gray-500">Violence, 78% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-red-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Lalbagh, Lucknow</p>
                          <p className="text-sm text-gray-500">Theft, 74% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-amber-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Marathahalli, Bangalore</p>
                          <p className="text-sm text-gray-500">Cyber crime, 68% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-amber-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">T. Nagar, Chennai</p>
                          <p className="text-sm text-gray-500">Property crime, 65% risk</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Medium-Risk Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <span className="bg-amber-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Koramangala, Bangalore</p>
                          <p className="text-sm text-gray-500">Theft, 58% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-amber-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Borivali, Mumbai</p>
                          <p className="text-sm text-gray-500">Property crime, 55% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-amber-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Rajouri Garden, Delhi</p>
                          <p className="text-sm text-gray-500">Violence, 53% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-yellow-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Deccan, Pune</p>
                          <p className="text-sm text-gray-500">Theft, 49% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-yellow-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Salt Lake, Kolkata</p>
                          <p className="text-sm text-gray-500">Cyber crime, 47% risk</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Low-Risk Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start space-x-3">
                        <span className="bg-green-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Indiranagar, Bangalore</p>
                          <p className="text-sm text-gray-500">General, 32% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-green-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Juhu, Mumbai</p>
                          <p className="text-sm text-gray-500">Property crime, 28% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-green-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Defence Colony, Delhi</p>
                          <p className="text-sm text-gray-500">Violence, 25% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-green-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Adyar, Chennai</p>
                          <p className="text-sm text-gray-500">Theft, 22% risk</p>
                        </div>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-green-500 h-5 w-5 rounded-full flex-shrink-0 mt-1"></span>
                        <div>
                          <p className="font-medium">Aundh, Pune</p>
                          <p className="text-sm text-gray-500">General, 18% risk</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
