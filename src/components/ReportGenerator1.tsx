
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UserData, MetricsData, calculateBMI, getBMICategory, analyzeBP } from '@/utils/healthCalculator';
import { Download, FileText, Printer, Share2, FileBarChart } from 'lucide-react';
import { format } from 'date-fns';

// Declare the html2pdf import
declare const window: Window & { 
  html2pdf: any;
};

const ReportGenerator = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
  const [reportSections, setReportSections] = useState({
    personalInfo: true,
    healthMetrics: true,
    bmiAnalysis: true,
    bloodPressure: true,
    recommendations: true
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load user data from localStorage
    const savedUserData = localStorage.getItem('healthTrackerUserData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    // Load metrics data from localStorage
    const savedMetrics = localStorage.getItem('healthTrackerMetrics');
    if (savedMetrics) {
      setMetricsData(JSON.parse(savedMetrics));
    }

    // Load the html2pdf.js script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSectionToggle = (section: keyof typeof reportSections) => {
    setReportSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const generatePdf = () => {
    if (!userData) {
      toast({
        title: "Profile Information Not Found",
        description: "Please fill your profile information first to generate a report.",
        variant: "destructive"
      });
      return;
    }

    const element = document.getElementById('report-content');
    
    if (!element) {
      toast({
        title: "Problem Generating Report",
        description: "Could not find report content to generate PDF.",
        variant: "destructive"
      });
      return;
    }

    if (window.html2pdf) {
      setIsGenerating(true);
      
      // Clone the element to prevent styling issues
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Apply print-specific styling to ensure proper formatting
      clonedElement.classList.add('pdf-export');
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `health-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          logging: false,
          dpi: 300,
          scrollY: 0,
          scrollX: 0,
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true,
          precision: 16
        },
        pagebreak: { mode: 'avoid-all' }
      };

      // Use a promise to handle the PDF generation
      window.html2pdf().from(element).set(opt).save()
        .then(() => {
          setIsGenerating(false);
          toast({
            title: "Report Downloaded",
            description: "Your health report has been generated and downloaded successfully.",
          });
        })
        .catch((error: any) => {
          console.error("PDF generation error:", error);
          setIsGenerating(false);
          toast({
            title: "Error Generating Report",
            description: "An error occurred while generating the PDF. Please try again.",
            variant: "destructive"
          });
        });
    } else {
      toast({
        title: "PDF Library Not Loaded",
        description: "Please wait for the PDF library to load and try again.",
        variant: "destructive"
      });
    }
  };

  const printReport = () => {
    window.print();
  };

  const shareReport = () => {
    toast({
      title: "Share Function",
      description: "This feature would allow sharing the report via email or messaging apps.",
    });
  };

  if (!userData || !metricsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Health Report Generator</CardTitle>
          <CardDescription>Generate and download your health report</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <FileBarChart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Data Unavailable</h3>
          <p className="text-center text-muted-foreground mb-6">
            Please fill your profile and health metrics first to generate a report.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.location.href = "/#profile"}>
              Fill Profile
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/#metrics"}>
              Fill Metrics
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const bmi = calculateBMI(userData.height, userData.weight);
  const bmiCategory = getBMICategory(bmi);
  const bpAnalysis = analyzeBP(metricsData.bp.systolic, metricsData.bp.diastolic);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-health-purple" />
              Health Report Preview
            </CardTitle>
            <CardDescription>
              Preview your report before downloading
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto border rounded-md p-6">
            <div id="report-content" className="bg-white p-6">
              <div className="text-center mb-6 print-section">
                <h1 className="text-2xl font-bold text-health-purple">Health Report</h1>
                <p className="text-muted-foreground">
                  Generated: {format(new Date(), 'PPP')}
                </p>
              </div>
              
              {reportSections.personalInfo && (
                <div className="mb-6 print-section">
                  <h2 className="text-xl font-semibold mb-3">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{userData.name || 'Not Available'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{userData.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">
                        {userData.gender === 'male' ? 'Male' : 
                         userData.gender === 'female' ? 'Female' : 'Other'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-medium">{userData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{userData.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Activity Level</p>
                      <p className="font-medium">
                        {userData.activityLevel === 'sedentary' ? 'Sedentary' :
                         userData.activityLevel === 'lightlyActive' ? 'Lightly Active' :
                         userData.activityLevel === 'moderatelyActive' ? 'Moderately Active' :
                         userData.activityLevel === 'veryActive' ? 'Very Active' : 'Extremely Active'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Separator className="my-6" />
              
              {reportSections.bmiAnalysis && (
                <div className="mb-6 print-section">
                  <h2 className="text-xl font-semibold mb-3">BMI Analysis</h2>
                  <div className="flex items-center gap-4">
                    <div className="bg-health-soft-blue rounded-full w-20 h-20 flex items-center justify-center">
                      <span className="text-2xl font-bold">{bmi}</span>
                    </div>
                    <div>
                      <p className={`font-semibold text-lg ${bmiCategory.color}`}>
                        {bmiCategory.category}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bmiCategory.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {reportSections.healthMetrics && (
                <div className="mb-6 print-section">
                  <h2 className="text-xl font-semibold mb-3">Health Metrics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {reportSections.bloodPressure && (
                      <div>
                        <h3 className="font-medium">Blood Pressure</h3>
                        <p className="text-lg font-semibold">
                          {metricsData.bp.systolic}/{metricsData.bp.diastolic} mmHg
                        </p>
                        <p className={`text-sm ${bpAnalysis.color}`}>
                          {bpAnalysis.category}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium">Heart Rate</h3>
                      <p className="text-lg font-semibold">
                        {metricsData.heartRate} BPM
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {metricsData.heartRate < 60 ? 'Bradycardia' :
                         metricsData.heartRate <= 100 ? 'Normal' : 'Tachycardia'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Blood Glucose</h3>
                      <p className="text-lg font-semibold">
                        {metricsData.glucose} mg/dL
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {metricsData.glucose < 70 ? 'Low' :
                         metricsData.glucose <= 140 ? 'Normal' : 'Elevated'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Cholesterol</h3>
                      <p className="text-lg font-semibold">
                        {metricsData.cholesterol.total} mg/dL
                      </p>
                      <p className="text-sm text-muted-foreground">
                        HDL: {metricsData.cholesterol.hdl} mg/dL | 
                        LDL: {metricsData.cholesterol.ldl} mg/dL
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {reportSections.recommendations && (
                <div className="print-section">
                  <h2 className="text-xl font-semibold mb-3">Recommendations</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-health-purple text-xl">•</span>
                      <span>
                        Monitor your health metrics regularly and note any changes.
                      </span>
                    </li>
                    {bmi > 25 && (
                      <li className="flex items-start gap-2">
                        <span className="text-health-purple text-xl">•</span>
                        <span>
                          Consider regular physical activity and balanced diet for healthy weight management.
                        </span>
                      </li>
                    )}
                    {metricsData.bp.systolic > 120 && (
                      <li className="flex items-start gap-2">
                        <span className="text-health-purple text-xl">•</span>
                        <span>
                          Reduce salt intake and exercise regularly to control blood pressure.
                        </span>
                      </li>
                    )}
                    {metricsData.glucose > 140 && (
                      <li className="flex items-start gap-2">
                        <span className="text-health-purple text-xl">•</span>
                        <span>
                          Monitor your blood sugar levels and reduce sugar consumption.
                        </span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <span className="text-health-purple text-xl">•</span>
                      <span>
                        Engage in at least 30 minutes of moderate-intensity physical activity daily.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-health-purple text-xl">•</span>
                      <span>
                        Get adequate sleep and practice stress management techniques.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
              
              <div className="mt-8 border-t pt-6 text-center print-section">
                <p className="text-sm text-muted-foreground">
                  This report is for informational purposes only and is not medical advice.
                  Please always consult with a qualified healthcare professional for your health-related decisions.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-3 justify-between">
            <Button 
              onClick={generatePdf} 
              className="flex-1 sm:flex-none"
              disabled={isGenerating}
            >
              <Download className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
            <Button variant="outline" onClick={printReport} className="flex-1 sm:flex-none">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="secondary" onClick={shareReport} className="flex-1 sm:flex-none">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Options</CardTitle>
            <CardDescription>
              Choose what to include in your report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="personalInfo" 
                  checked={reportSections.personalInfo}
                  onCheckedChange={() => handleSectionToggle('personalInfo')}
                />
                <Label htmlFor="personalInfo">Personal Information</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bmiAnalysis" 
                  checked={reportSections.bmiAnalysis}
                  onCheckedChange={() => handleSectionToggle('bmiAnalysis')}
                />
                <Label htmlFor="bmiAnalysis">BMI Analysis</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="healthMetrics" 
                  checked={reportSections.healthMetrics}
                  onCheckedChange={() => handleSectionToggle('healthMetrics')}
                />
                <Label htmlFor="healthMetrics">Health Metrics</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="bloodPressure" 
                  checked={reportSections.bloodPressure}
                  onCheckedChange={() => handleSectionToggle('bloodPressure')}
                />
                <Label htmlFor="bloodPressure">Blood Pressure Analysis</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="recommendations" 
                  checked={reportSections.recommendations}
                  onCheckedChange={() => handleSectionToggle('recommendations')}
                />
                <Label htmlFor="recommendations">Recommendations</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About the Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-4">
            <p>
              This health report is generated based on the profile data and health metrics provided by you. You can download it as a PDF, print it, or share it with your doctor.
            </p>
            <p>
              Please note that this report is for informational purposes only and should not be taken as medical advice. Always consult with a qualified healthcare professional for your health-related decisions.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add print styles using standard React style attribute */}
      <style>
        {`
        @media print {
          body * {
            visibility: hidden;
          }
          #report-content, 
          #report-content * {
            visibility: visible;
          }
          #report-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
        
        /* Additional styles for PDF output */
        .pdf-export {
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        .print-section {
          page-break-inside: avoid;
        }
        `}
      </style>
    </div>
  );
};

export default ReportGenerator;
