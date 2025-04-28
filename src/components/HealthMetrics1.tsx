
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserData, MetricsData, analyzeBP } from '@/utils/healthCalculator';
import { useToast } from '@/components/ui/use-toast';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Droplet, LineChart as LineChartIcon } from 'lucide-react';

const HealthMetrics = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [metrics, setMetrics] = useState<MetricsData>({
    bp: {
      systolic: 120,
      diastolic: 80
    },
    heartRate: 72,
    glucose: 100,
    cholesterol: {
      total: 180,
      hdl: 50,
      ldl: 100
    }
  });

  // Mock historical data
  const [historicalData, setHistoricalData] = useState<any[]>([
    { date: '2025-03-10', systolic: 122, diastolic: 82, heartRate: 74, glucose: 105 },
    { date: '2025-03-17', systolic: 119, diastolic: 79, heartRate: 71, glucose: 102 },
    { date: '2025-03-24', systolic: 121, diastolic: 80, heartRate: 73, glucose: 98 },
    { date: '2025-03-31', systolic: 118, diastolic: 78, heartRate: 70, glucose: 97 },
    { date: '2025-04-07', systolic: 120, diastolic: 80, heartRate: 72, glucose: 100 },
  ]);

  useEffect(() => {
    const savedUserData = localStorage.getItem('healthTrackerUserData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    const savedMetrics = localStorage.getItem('healthTrackerMetrics');
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setMetrics(prev => {
        // Fixed: Create a properly typed object instead of using spread on keyof
        if (parent === 'bp') {
          return {
            ...prev,
            bp: {
              ...prev.bp,
              [child]: parseFloat(value)
            }
          };
        } else if (parent === 'cholesterol') {
          return {
            ...prev,
            cholesterol: {
              ...prev.cholesterol,
              [child]: parseFloat(value)
            }
          };
        }
        return prev;
      });
    } else {
      setMetrics(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save metrics to local storage
    localStorage.setItem('healthTrackerMetrics', JSON.stringify(metrics));
    
    // Add to historical data with current date
    const today = new Date().toISOString().split('T')[0];
    const newHistoricalEntry = {
      date: today,
      systolic: metrics.bp.systolic,
      diastolic: metrics.bp.diastolic,
      heartRate: metrics.heartRate,
      glucose: metrics.glucose
    };
    
    const updatedHistory = [...historicalData, newHistoricalEntry];
    setHistoricalData(updatedHistory);
    localStorage.setItem('healthTrackerHistory', JSON.stringify(updatedHistory));
    
    toast({
      title: "Metrics Updated",
      description: "Your health metrics have been updated successfully.",
    });
  };

  const bpAnalysis = analyzeBP(metrics.bp.systolic, metrics.bp.diastolic);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-health-purple" />
                <span>Enter Health Metrics</span>
              </div>
            </CardTitle>
            <CardDescription>
              Enter your latest health parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base font-medium">Blood Pressure</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bp.systolic">Systolic (mmHg)</Label>
                    <Input 
                      id="bp.systolic" 
                      name="bp.systolic"
                      type="number"
                      value={metrics.bp.systolic}
                      onChange={handleInputChange}
                      min={70}
                      max={220}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bp.diastolic">Diastolic (mmHg)</Label>
                    <Input 
                      id="bp.diastolic" 
                      name="bp.diastolic"
                      type="number"
                      value={metrics.bp.diastolic}
                      onChange={handleInputChange}
                      min={40}
                      max={120}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
                <Input 
                  id="heartRate" 
                  name="heartRate" 
                  type="number"
                  value={metrics.heartRate}
                  onChange={handleInputChange}
                  min={40}
                  max={200}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
                <Input 
                  id="glucose" 
                  name="glucose" 
                  type="number"
                  value={metrics.glucose}
                  onChange={handleInputChange}
                  min={60}
                  max={400}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium">Cholesterol (mg/dL)</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="cholesterol.total">Total</Label>
                    <Input 
                      id="cholesterol.total" 
                      name="cholesterol.total"
                      type="number"
                      value={metrics.cholesterol.total}
                      onChange={handleInputChange}
                      min={100}
                      max={300}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cholesterol.hdl">HDL (Good)</Label>
                    <Input 
                      id="cholesterol.hdl" 
                      name="cholesterol.hdl"
                      type="number"
                      value={metrics.cholesterol.hdl}
                      onChange={handleInputChange}
                      min={20}
                      max={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cholesterol.ldl">LDL (Bad)</Label>
                    <Input 
                      id="cholesterol.ldl" 
                      name="cholesterol.ldl"
                      type="number"
                      value={metrics.cholesterol.ldl}
                      onChange={handleInputChange}
                      min={50}
                      max={200}
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Save Metrics
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analysis</CardTitle>
            <CardDescription>
              Analysis of your health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center">
                    <Heart className="mr-2 h-4 w-4 text-health-purple" /> 
                    Blood Pressure
                  </h4>
                  <span className={`text-sm font-semibold ${bpAnalysis.color}`}>
                    {bpAnalysis.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{bpAnalysis.description}</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      bpAnalysis.category === 'Normal' 
                        ? 'bg-health-soft-green' 
                        : bpAnalysis.category === 'Elevated' 
                          ? 'bg-health-sky-blue' 
                          : bpAnalysis.category === 'Hypertension Stage 1' 
                            ? 'bg-health-orange' 
                            : 'bg-destructive'
                    }`}
                    style={{ width: `${Math.min(metrics.bp.systolic / 2, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center">
                    <Activity className="mr-2 h-4 w-4 text-health-purple" /> 
                    Heart Rate
                  </h4>
                  <span className={`text-sm font-semibold ${
                    metrics.heartRate < 60 ? 'text-health-sky-blue' :
                    metrics.heartRate <= 100 ? 'text-health-soft-green' : 
                    'text-health-orange'
                  }`}>
                    {
                      metrics.heartRate < 60 ? 'Bradycardia' :
                      metrics.heartRate <= 100 ? 'Normal' : 
                      'Tachycardia'
                    }
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {
                    metrics.heartRate < 60 ? 'Heart rate is below normal range' :
                    metrics.heartRate <= 100 ? 'Heart rate is within normal range' : 
                    'Heart rate is above normal range'
                  }
                </p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      metrics.heartRate < 60 ? 'bg-health-sky-blue' :
                      metrics.heartRate <= 100 ? 'bg-health-soft-green' : 
                      'bg-health-orange'
                    }`}
                    style={{ width: `${Math.min((metrics.heartRate / 200) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center">
                    <Droplet className="mr-2 h-4 w-4 text-health-purple" /> 
                    Blood Glucose
                  </h4>
                  <span className={`text-sm font-semibold ${
                    metrics.glucose < 70 ? 'text-health-sky-blue' :
                    metrics.glucose <= 140 ? 'text-health-soft-green' : 
                    'text-health-orange'
                  }`}>
                    {
                      metrics.glucose < 70 ? 'Low' :
                      metrics.glucose <= 140 ? 'Normal' : 
                      'Elevated'
                    }
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {
                    metrics.glucose < 70 ? 'Blood sugar is below normal range' :
                    metrics.glucose <= 140 ? 'Blood sugar is within normal range' : 
                    'Blood sugar is above normal range'
                  }
                </p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      metrics.glucose < 70 ? 'bg-health-sky-blue' :
                      metrics.glucose <= 140 ? 'bg-health-soft-green' : 
                      'bg-health-orange'
                    }`}
                    style={{ width: `${Math.min((metrics.glucose / 300) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center">
                    <LineChartIcon className="mr-2 h-4 w-4 text-health-purple" /> 
                    Cholesterol
                  </h4>
                  <span className={`text-sm font-semibold ${
                    metrics.cholesterol.total < 200 ? 'text-health-soft-green' :
                    metrics.cholesterol.total <= 240 ? 'text-health-orange' : 
                    'text-destructive'
                  }`}>
                    {
                      metrics.cholesterol.total < 200 ? 'Desirable' :
                      metrics.cholesterol.total <= 240 ? 'Borderline' : 
                      'High'
                    }
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {
                    metrics.cholesterol.total < 200 ? 'Total cholesterol is within desirable range' :
                    metrics.cholesterol.total <= 240 ? 'Total cholesterol is borderline high' : 
                    'Total cholesterol is high'
                  }
                </p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      metrics.cholesterol.total < 200 ? 'bg-health-soft-green' :
                      metrics.cholesterol.total <= 240 ? 'bg-health-orange' : 
                      'bg-destructive'
                    }`}
                    style={{ width: `${Math.min((metrics.cholesterol.total / 300) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trends and History</CardTitle>
          <CardDescription>
            Analysis of your health metrics over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bp">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
              <TabsTrigger value="heart">Heart Rate</TabsTrigger>
              <TabsTrigger value="glucose">Blood Glucose</TabsTrigger>
              <TabsTrigger value="cholesterol">Cholesterol</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bp">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="systolic" 
                      stroke="#9b87f5" 
                      name="Systolic" 
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="diastolic" 
                      stroke="#7E69AB" 
                      name="Diastolic" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="heart">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#F97316" 
                      name="Heart Rate (BPM)" 
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="glucose">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#33C3F0" 
                      name="Glucose (mg/dL)" 
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="cholesterol">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Total', value: metrics.cholesterol.total, limit: 200 },
                      { name: 'HDL', value: metrics.cholesterol.hdl, limit: 40 },
                      { name: 'LDL', value: metrics.cholesterol.ldl, limit: 100 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#9b87f5" name="Current" />
                    <Bar dataKey="limit" fill="#D3E4FD" name="Recommended Limit" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;
