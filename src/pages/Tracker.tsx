import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface UserData {
  name: string;
  age: string;
  weight: string;
  height: string;
  bloodPressure: string;
  bloodSugar: string;
  cholesterol: string;
  diet: { item: string; calories: string; time: string }[];
}

interface HealthAnalysis {
  bmi: number | null;
  bmiCategory: string;
  bloodPressureStatus: string;
  bloodSugarStatus: string;
  cholesterolStatus: string;
  overallHealth: string;
}

const HealthTracker = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    weight: "",
    height: "",
    bloodPressure: "",
    bloodSugar: "",
    cholesterol: "",
    diet: []
  });

  const [analysis, setAnalysis] = useState<HealthAnalysis>({
    bmi: null,
    bmiCategory: "",
    bloodPressureStatus: "",
    bloodSugarStatus: "",
    cholesterolStatus: "",
    overallHealth: ""
  });

  const [dietItem, setDietItem] = useState("");
  const [dietCalories, setDietCalories] = useState("");
  const [dietTime, setDietTime] = useState("");
  const [dietChartData, setDietChartData] = useState<{name: string, calories: number}[]>([]);

  // Generate diet chart data
  useEffect(() => {
    const chartData = userData.diet.map(item => ({
      name: item.item.substring(0, 15) + (item.item.length > 15 ? "..." : ""),
      calories: parseFloat(item.calories) || 0
    }));
    setDietChartData(chartData);
  }, [userData.diet]);

  const validateNumberInput = (value: string, min: number, max: number): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const calculateBMI = () => {
    if (!validateNumberInput(userData.weight, 20, 300) || 
        !validateNumberInput(userData.height, 100, 250)) {
      alert("Please enter valid weight (20-300kg) and height (100-250cm)");
      return;
    }

    const weight = parseFloat(userData.weight);
    const height = parseFloat(userData.height) / 100;
    const bmiValue = parseFloat((weight / (height * height)).toFixed(1));

    let bmiCategory = "";
    if (bmiValue < 18.5) bmiCategory = "Underweight";
    else if (bmiValue < 25) bmiCategory = "Normal weight";
    else if (bmiValue < 30) bmiCategory = "Overweight";
    else bmiCategory = "Obese";

    setAnalysis(prev => ({
      ...prev,
      bmi: bmiValue,
      bmiCategory
    }));
  };

  const analyzeBloodReport = () => {
    if (!validateNumberInput(userData.bloodPressure, 50, 200) ||
        !validateNumberInput(userData.bloodSugar, 50, 300) ||
        !validateNumberInput(userData.cholesterol, 50, 400)) {
      alert("Please enter valid blood values");
      return;
    }

    const bp = parseFloat(userData.bloodPressure);
    const bs = parseFloat(userData.bloodSugar);
    const chol = parseFloat(userData.cholesterol);

    let bpStatus = "";
    if (bp > 140) bpStatus = "High (Hypertension)";
    else if (bp < 90) bpStatus = "Low (Hypotension)";
    else bpStatus = "Normal";

    let bsStatus = "";
    if (bs > 126) bsStatus = "High (Risk of Diabetes)";
    else if (bs < 70) bsStatus = "Low (Hypoglycemia)";
    else bsStatus = "Normal";

    let cholStatus = "";
    if (chol > 200) cholStatus = "High";
    else cholStatus = "Normal";

    let overallHealth = "Excellent";
    if (bpStatus !== "Normal" || bsStatus !== "Normal" || cholStatus !== "Normal" || 
        (analysis.bmi && (analysis.bmi < 18.5 || analysis.bmi >= 25))) {
      overallHealth = "Needs Improvement";
    }

    setAnalysis(prev => ({
      ...prev,
      bloodPressureStatus: bpStatus,
      bloodSugarStatus: bsStatus,
      cholesterolStatus: cholStatus,
      overallHealth
    }));
  };

  const addDietItem = () => {
    if (!dietItem.trim() || !validateNumberInput(dietCalories, 0, 5000)) {
      alert("Please enter valid food item and calories (0-5000)");
      return;
    }

    setUserData(prev => ({
      ...prev,
      diet: [
        ...prev.diet,
        {
          item: dietItem,
          calories: dietCalories,
          time: dietTime || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]
    }));

    setDietItem("");
    setDietCalories("");
    setDietTime("");
  };

  const removeDietItem = (index: number) => {
    setUserData(prev => {
      const newDiet = [...prev.diet];
      newDiet.splice(index, 1);
      return {...prev, diet: newDiet};
    });
  };

  const clearAll = () => {
    setUserData({
      name: "",
      age: "",
      weight: "",
      height: "",
      bloodPressure: "",
      bloodSugar: "",
      cholesterol: "",
      diet: []
    });
    setAnalysis({
      bmi: null,
      bmiCategory: "",
      bloodPressureStatus: "",
      bloodSugarStatus: "",
      cholesterolStatus: "",
      overallHealth: ""
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 space-y-6 bg-black">
        <Card className="bg-black border-blue-900">
          <CardHeader>
            <CardTitle className="text-white">Comprehensive Health Tracker</CardTitle>
            <CardDescription className="text-blue-300">Monitor all your health metrics in one place</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Full Name</Label>
                <Input
                  value={userData.name}
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  placeholder="Akshay Gurav"
                  className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                />
              </div>
              <div>
                <Label className="text-white">Age (years)</Label>
                <Input
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData({...userData, age: e.target.value})}
                  placeholder="20"
                  min="1"
                  max="120"
                  className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                />
              </div>
            </div>

            {/* BMI Calculator */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Body Mass Index (BMI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white">Weight (kg)</Label>
                  <Input
                    type="number"
                    value={userData.weight}
                    onChange={(e) => setUserData({...userData, weight: e.target.value})}
                    placeholder="70"
                    min="20"
                    max="300"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div>
                  <Label className="text-white">Height (cm)</Label>
                  <Input
                    type="number"
                    value={userData.height}
                    onChange={(e) => setUserData({...userData, height: e.target.value})}
                    placeholder="175"
                    min="100"
                    max="250"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={calculateBMI} className="w-full bg-blue-800 hover:bg-blue-900 text-white">
                    Calculate BMI
                  </Button>
                </div>
              </div>
              {analysis.bmi && (
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="font-medium text-white">BMI: {analysis.bmi} - {analysis.bmiCategory}</p>
                  <p className="text-sm text-blue-300 mt-1">
                    {analysis.bmi < 18.5 ? "You may need to gain weight" :
                     analysis.bmi < 25 ? "You're at a healthy weight" :
                     analysis.bmi < 30 ? "Consider weight loss for better health" :
                     "Weight loss recommended for health improvement"}
                  </p>
                </div>
              )}
            </div>

            {/* Blood Analysis */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Blood Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white">Blood Pressure (mmHg)</Label>
                  <Input
                    type="number"
                    value={userData.bloodPressure}
                    onChange={(e) => setUserData({...userData, bloodPressure: e.target.value})}
                    placeholder="120"
                    min="50"
                    max="200"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div>
                  <Label className="text-white">Blood Sugar (mg/dL)</Label>
                  <Input
                    type="number"
                    value={userData.bloodSugar}
                    onChange={(e) => setUserData({...userData, bloodSugar: e.target.value})}
                    placeholder="90"
                    min="50"
                    max="300"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div>
                  <Label className="text-white">Cholesterol (mg/dL)</Label>
                  <Input
                    type="number"
                    value={userData.cholesterol}
                    onChange={(e) => setUserData({...userData, cholesterol: e.target.value})}
                    placeholder="180"
                    min="50"
                    max="400"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
              </div>
              <Button 
                onClick={analyzeBloodReport} 
                className="w-full md:w-auto bg-blue-800 hover:bg-blue-900 text-white"
              >
                Analyze Blood Report
              </Button>
              {(analysis.bloodPressureStatus || analysis.bloodSugarStatus || analysis.cholesterolStatus) && (
                <div className="p-3 bg-gray-800 rounded-lg space-y-2">
                  <h4 className="font-medium text-white">Blood Analysis Results:</h4>
                  <p className="text-blue-300">Blood Pressure: {analysis.bloodPressureStatus}</p>
                  <p className="text-blue-300">Blood Sugar: {analysis.bloodSugarStatus}</p>
                  <p className="text-blue-300">Cholesterol: {analysis.cholesterolStatus}</p>
                  {analysis.overallHealth && (
                    <p className="font-medium mt-2 text-white">
                      Overall Health Status: <span className={analysis.overallHealth === "Excellent" ? "text-green-500" : "text-yellow-500"}>
                        {analysis.overallHealth}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Diet Tracker */}
            <div className="space-y-4">
              <h3 className="font-semibold text-white">Diet Tracker</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-white">Food Item</Label>
                  <Input
                    value={dietItem}
                    onChange={(e) => setDietItem(e.target.value)}
                    placeholder="e.g., Apple"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div>
                  <Label className="text-white">Calories</Label>
                  <Input
                    type="number"
                    value={dietCalories}
                    onChange={(e) => setDietCalories(e.target.value)}
                    placeholder="95"
                    min="0"
                    max="5000"
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div>
                  <Label className="text-white">Time (optional)</Label>
                  <Input
                    type="time"
                    value={dietTime}
                    onChange={(e) => setDietTime(e.target.value)}
                    className="bg-gray-800 border-blue-900 text-white placeholder-blue-300"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={addDietItem} 
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white"
                  >
                    Add Item
                  </Button>
                </div>
              </div>

              {/* Diet Visualization */}
              {dietChartData.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2 text-white">Calorie Intake Visualization</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dietChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis 
                          stroke="#ffffff" 
                          label={{ 
                            value: 'Calories', 
                            angle: -90, 
                            position: 'insideLeft', 
                            fill: '#ffffff' 
                          }} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1f2937', color: '#ffffff', borderColor: '#4b5563' }}
                        />
                        <Bar dataKey="calories" fill="#60a5fa" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Diet List */}
              {userData.diet.length > 0 && (
                <div className="border border-blue-900 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-white">Today's Diet</h4>
                  <div className="space-y-2">
                    {userData.diet.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center border-b border-blue-900 pb-2"
                      >
                        <div>
                          <span className="font-medium text-white">{item.item}</span>
                          <span className="text-blue-300 ml-2">{item.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500">{item.calories} kcal</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeDietItem(index)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="font-medium pt-2 text-white">
                      Total Calories: {userData.diet.reduce((sum, item) => sum + (parseFloat(item.calories) || 0), 0)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={clearAll}
                className="border-blue-900 text-white hover:bg-blue-900"
              >
                Clear All Data
              </Button>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="secondary" 
                  className="bg-gray-800 text-white hover:bg-gray-700"
                >
                  Save Progress
                </Button>
                <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                  Generate Full Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HealthTracker;