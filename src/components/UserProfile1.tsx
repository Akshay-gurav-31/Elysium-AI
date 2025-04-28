import React, { useState } from 'react';
import { UserData } from '@/utils/healthCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { calculateBMI, getBMICategory } from '@/utils/healthCalculator';
import { useToast } from '@/components/ui/use-toast';

const UserProfile = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: 30,
    gender: 'male',
    height: 170,
    weight: 65,
    activityLevel: 'moderatelyActive',
    goal: 'maintainWeight',
    medicalConditions: [],
  });

  const medicalConditionOptions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hypertension' },
    { id: 'cholesterol', label: 'High Cholesterol' },
    { id: 'thyroid', label: 'Thyroid Issues' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? parseInt(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleMedicalConditionChange = (id: string, checked: boolean) => {
    setUserData({
      ...userData,
      medicalConditions: checked
        ? [...(userData.medicalConditions || []), id]
        : (userData.medicalConditions || []).filter(item => item !== id)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would save this data to a database
    localStorage.setItem('healthTrackerUserData', JSON.stringify(userData));
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const bmi = userData.height && userData.weight ? calculateBMI(userData.height, userData.weight) : 0;
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-2/3 w-full">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Enter your basic health information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age"
                    name="age"
                    type="number"
                    min={1}
                    max={120}
                    value={userData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={userData.gender} 
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height - cm</Label>
                  <Input 
                    id="height"
                    name="height"
                    type="number"
                    min={50}
                    max={250}
                    value={userData.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight - kg</Label>
                  <Input 
                    id="weight"
                    name="weight"
                    type="number"
                    min={10}
                    max={300}
                    value={userData.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select 
                    value={userData.activityLevel} 
                    onValueChange={(value) => handleSelectChange('activityLevel', value)}
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="lightlyActive">Lightly Active</SelectItem>
                      <SelectItem value="moderatelyActive">Moderately Active</SelectItem>
                      <SelectItem value="veryActive">Very Active</SelectItem>
                      <SelectItem value="extraActive">Extremely Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <Select 
                    value={userData.goal} 
                    onValueChange={(value) => handleSelectChange('goal', value)}
                  >
                    <SelectTrigger id="goal">
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loseWeight">Lose Weight</SelectItem>
                      <SelectItem value="maintainWeight">Maintain Weight</SelectItem>
                      <SelectItem value="gainWeight">Gain Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Medical Conditions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {medicalConditionOptions.map((condition) => (
                    <div key={condition.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={condition.id} 
                        checked={(userData.medicalConditions || []).includes(condition.id)}
                        onCheckedChange={(checked) => handleMedicalConditionChange(condition.id, checked === true)}
                      />
                      <Label htmlFor={condition.id}>{condition.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="md:w-1/3 w-full">
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription>
              Your Body Mass Index
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-flex items-center justify-center rounded-full w-32 h-32 bg-health-soft-blue">
                <span className="text-3xl font-bold">{bmi}</span>
              </div>
              <div className="mt-4">
                <p className={`text-lg font-semibold ${bmiCategory.color}`}>
                  {bmiCategory.category}
                </p>
                <p className="text-sm text-muted-foreground">
                  {bmiCategory.description}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-2">BMI Range:</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Underweight:</span>
                  <span className="text-health-sky-blue">{"<18.5"}</span>
                </li>
                <li className="flex justify-between">
                  <span>Normal:</span>
                  <span className="text-health-soft-green">18.5-24.9</span>
                </li>
                <li className="flex justify-between">
                  <span>Overweight:</span>
                  <span className="text-health-orange">25-29.9</span>
                </li>
                <li className="flex justify-between">
                  <span>Obese:</span>
                  <span className="text-destructive">{"≥30"}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>This health tracking app provides general information only and is not medical advice. Consult with your doctor for any health decisions. We do not guarantee the accuracy of the information provided.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
