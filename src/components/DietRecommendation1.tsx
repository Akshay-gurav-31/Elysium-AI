
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserData, DietRecommendation as DietRecommendationType, generateDietRecommendation } from '@/utils/healthCalculator';
import { useToast } from "@/components/ui/use-toast";
import { Leaf, Pizza, Apple, Fish, AlertCircle, Check, ChevronDown, ChevronUp, Send, Cherry } from 'lucide-react';

const DietRecommendation = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [dietRecommendation, setDietRecommendation] = useState<DietRecommendationType | null>(null);
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  useEffect(() => {
    const savedUserData = localStorage.getItem('healthTrackerUserData');
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);
      setUserData(parsedUserData);
      
      // Generate diet recommendation on load
      const recommendation = generateDietRecommendation(parsedUserData);
      setDietRecommendation(recommendation);
    } else {
      toast({
        title: "Profile Information Not Found",
        description: "Please fill your profile information first to get personalized diet recommendations.",
        variant: "destructive"
      });
    }
  }, []);

  const handleGenerateRecommendation = () => {
    if (!userData) {
      toast({
        title: "Profile Information Not Found",
        description: "Please fill your profile information first.",
        variant: "destructive"
      });
      return;
    }
    
    const recommendation = generateDietRecommendation(userData);
    setDietRecommendation(recommendation);
    
    toast({
      title: "New Diet Recommendations Generated",
      description: "Your personalized diet plan has been updated.",
    });
  };

  const toggleMeal = (mealName: string) => {
    if (expandedMeal === mealName) {
      setExpandedMeal(null);
    } else {
      setExpandedMeal(mealName);
    }
  };

  const getMealIcon = (mealName: string) => {
    switch(mealName.toLowerCase()) {
      case 'breakfast':
        return <Apple className="h-5 w-5 text-health-orange" />;
      case 'lunch':
        return <Pizza className="h-5 w-5 text-health-purple" />;
      case 'dinner':
        return <Fish className="h-5 w-5 text-health-sky-blue" />;
      case 'snacks':
        return <Cherry className="h-5 w-5 text-health-soft-green" />;
      default:
        return <Leaf className="h-5 w-5 text-health-purple" />;
    }
  };

  if (!userData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Diet Recommendations</CardTitle>
          <CardDescription>Get personalized diet plan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Profile Information Required</h3>
          <p className="text-center text-muted-foreground mb-6">
            Please fill your profile information first to receive personalized diet recommendations.
          </p>
          <Button variant="outline" onClick={() => window.location.href = "/#profile"}>
            Fill Your Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!dietRecommendation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Diet Recommendations...</CardTitle>
          <CardDescription>Please wait</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="animate-pulse-gentle">
            <Leaf className="h-16 w-16 text-health-purple mb-4" />
          </div>
          <p className="text-center text-muted-foreground">
            Your personalized diet recommendations are being prepared...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-health-purple" />
              <span>Personalized Diet Recommendations</span>
            </CardTitle>
            <CardDescription>
              Recommended diet plan based on your goals and health details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dietRecommendation.meals.map((meal) => (
                <Card key={meal.name} className="overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleMeal(meal.name)}
                  >
                    <div className="flex items-center space-x-3">
                      {getMealIcon(meal.name)}
                      <h3 className="font-medium">{meal.name}</h3>
                    </div>
                    {expandedMeal === meal.name ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  {expandedMeal === meal.name && (
                    <div className="p-4 pt-0 bg-accent/20">
                      <Separator className="mb-4" />
                      <ul className="space-y-2">
                        {meal.foods.map((food, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="h-5 w-5 text-health-soft-green mt-0.5" />
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
            
            {dietRecommendation.restrictions.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Dietary Restrictions:</h3>
                <div className="flex flex-wrap gap-2">
                  {dietRecommendation.restrictions.map((restriction, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="font-medium mb-2">Diet Recommendations:</h3>
              <div className="space-y-2">
                {dietRecommendation.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-health-purple mt-1" />
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button onClick={handleGenerateRecommendation} className="w-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" /> Generate New Diet Plan
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nutrition Analysis</CardTitle>
            <CardDescription>
              Your daily nutritional requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Daily Calories</span>
                  <span className="text-lg font-bold">{dietRecommendation.calories} kcal</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Calculated based on your goal ({userData.goal === 'loseWeight' ? 'Lose Weight' : 
                    userData.goal === 'maintainWeight' ? 'Maintain Weight' : 'Gain Weight'})
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Macronutrients</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Protein</span>
                      <span className="font-medium">{dietRecommendation.protein}g</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-health-purple" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Carbohydrates</span>
                      <span className="font-medium">{dietRecommendation.carbs}g</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-health-orange" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Fat</span>
                      <span className="font-medium">{dietRecommendation.fat}g</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-health-sky-blue" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Water Intake</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative h-20 w-20">
                    <div className="absolute inset-0 rounded-full border-4 border-health-soft-blue"></div>
                    <div className="absolute inset-1 rounded-full bg-health-soft-blue opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">8+</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Drink at least 8 glasses of water daily</p>
                    <p className="text-xs text-muted-foreground">Essential for proper hydration</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Healthy Eating Tips</CardTitle>
          <CardDescription>
            Additional tips to improve your diet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-accent/10">
              <h3 className="font-medium mb-2 flex items-center">
                <Leaf className="mr-2 h-4 w-4 text-health-purple" />
                Eat More Fruits and Vegetables
              </h3>
              <p className="text-sm text-muted-foreground">Consume at least 5 types of fruits and vegetables daily to get essential vitamins and minerals.</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-accent/10">
              <h3 className="font-medium mb-2 flex items-center">
                <Fish className="mr-2 h-4 w-4 text-health-sky-blue" />
                Healthy Protein Sources
              </h3>
              <p className="text-sm text-muted-foreground">Choose healthy protein sources like legumes, beans, fish, eggs, and low-fat dairy products.</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-accent/10">
              <h3 className="font-medium mb-2 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-health-orange" />
                Limit Processed Foods
              </h3>
              <p className="text-sm text-muted-foreground">Avoid highly processed foods as they often contain excess sugar, salt, and unhealthy fats.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>These dietary recommendations are for general guidance only and are generated based on your personal information. Consult with your doctor or registered dietitian before implementing any dietary changes.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietRecommendation;
