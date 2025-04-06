
import { useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import AIAssessmentPanel from "./AIAssessmentPanel";

interface AIChatTabProps {
  assessmentCompleted: boolean;
  assessmentSeverity: 'low' | 'medium' | 'high';
  onCompleteAssessment: (severity: 'low' | 'medium' | 'high', details: string) => void;
  onFindSupport: () => void;
}

const AIChatTab = ({ 
  assessmentCompleted, 
  assessmentSeverity,
  onCompleteAssessment,
  onFindSupport
}: AIChatTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <ChatInterface onCompleteAssessment={onCompleteAssessment} />
      </div>
      <div className="lg:col-span-1">
        <AIAssessmentPanel 
          assessmentCompleted={assessmentCompleted}
          assessmentSeverity={assessmentSeverity}
          onFindSupport={onFindSupport}
        />
      </div>
    </div>
  );
};

export default AIChatTab;
