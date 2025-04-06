
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AIAssessmentPanelProps {
  assessmentCompleted: boolean;
  assessmentSeverity: 'low' | 'medium' | 'high';
  onFindSupport: () => void;
}

const AIAssessmentPanel = ({ 
  assessmentCompleted, 
  assessmentSeverity, 
  onFindSupport 
}: AIAssessmentPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Assessment</CardTitle>
        <CardDescription>
          Our AI will analyze your responses to help determine the best support for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Status:</span>
            <Badge variant={assessmentCompleted ? "default" : "outline"}>
              {assessmentCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
          
          {assessmentCompleted && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm">Priority Level:</span>
                <Badge 
                  variant="outline" 
                  className={
                    assessmentSeverity === 'high' ? "border-red-500 text-red-500" :
                    assessmentSeverity === 'medium' ? "border-amber-500 text-amber-500" :
                    "border-green-500 text-green-500"
                  }
                >
                  {assessmentSeverity === 'high' ? "High" : 
                   assessmentSeverity === 'medium' ? "Medium" : "Low"}
                </Badge>
              </div>
              
              <div className="pt-2">
                <Button 
                  onClick={onFindSupport}
                  className="w-full"
                >
                  Find Professional Support
                </Button>
              </div>
            </>
          )}
        </div>
        
        <div className="rounded-lg bg-muted p-4 text-sm">
          <h4 className="font-medium mb-2">How this works</h4>
          <p className="text-muted-foreground">
            Our AI assistant will ask you questions to understand your concerns. 
            Based on your responses, we'll determine the best support options for you.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssessmentPanel;
