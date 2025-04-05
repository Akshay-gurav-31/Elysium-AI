
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onCompleteAssessment?: (severity: 'low' | 'medium' | 'high', details: string) => void;
}

const ChatInterface = ({ onCompleteAssessment }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your Mindful Grove assistant. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentProgress, setAssessmentProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample responses based on common mental health concerns
  const responseTemplates = {
    anxiety: [
      "It sounds like you might be experiencing some anxiety. Can you tell me more about when these feelings started?",
      "Have you noticed any specific triggers for these feelings?",
      "Many people experience anxiety. There are several techniques that might help in the moment, like deep breathing or grounding exercises.",
      "Based on what you've shared, it might be helpful to speak with one of our mental health professionals. Would you like me to help you find someone?"
    ],
    depression: [
      "Thank you for sharing that with me. It takes courage to talk about these feelings.",
      "How long have you been feeling this way?",
      "Has anything happened recently that might have triggered these feelings?",
      "It sounds like you might benefit from speaking with one of our mental health professionals who can provide proper support."
    ],
    stress: [
      "It sounds like you're dealing with a lot of stress right now.",
      "What specific situations are causing you the most stress?",
      "Have you tried any stress management techniques that have worked for you in the past?",
      "Would it be helpful to discuss some coping strategies for managing stress?"
    ],
    general: [
      "Thank you for sharing that with me.",
      "Could you tell me a bit more about what's been on your mind?",
      "How long have you been feeling this way?",
      "Is there anything specific that prompted you to seek support today?"
    ]
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Progress bar simulation
  useEffect(() => {
    if (messages.length > 1 && messages.length <= 8) {
      setAssessmentProgress((messages.length - 1) * 14); // Roughly 100% after ~7 interactions
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      generateBotResponse(input);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput: string) => {
    const normalizedInput = userInput.toLowerCase();
    let responseCategory = 'general';
    
    // Simple keyword detection for demo purposes
    if (normalizedInput.includes('anxious') || normalizedInput.includes('anxiety') || normalizedInput.includes('worry') || normalizedInput.includes('scared')) {
      responseCategory = 'anxiety';
    } else if (normalizedInput.includes('sad') || normalizedInput.includes('depress') || normalizedInput.includes('hopeless') || normalizedInput.includes('tired')) {
      responseCategory = 'depression';
    } else if (normalizedInput.includes('stress') || normalizedInput.includes('overwhelm') || normalizedInput.includes('pressure')) {
      responseCategory = 'stress';
    }

    // Get a response from the appropriate category
    const responses = responseTemplates[responseCategory as keyof typeof responseTemplates];
    const messageIndex = Math.min(
      messages.filter(m => m.sender === 'bot').length % responses.length,
      responses.length - 1
    );
    
    const botResponse: Message = {
      id: Date.now().toString(),
      content: responses[messageIndex],
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botResponse]);
    
    // Check if assessment is complete
    if (assessmentProgress >= 90) {
      completeAssessment(responseCategory);
    }
  };
  
  const completeAssessment = (category: string) => {
    let severity: 'low' | 'medium' | 'high' = 'low';
    
    // Simple severity determination based on conversation
    const userMessages = messages.filter(m => m.sender === 'user').map(m => m.content.toLowerCase());
    const urgentWords = ['suicid', 'kill', 'die', 'end my life', 'cannot go on'];
    const moderateWords = ['everyday', 'constant', 'always', 'can\'t function', 'unable to work'];
    
    if (urgentWords.some(word => userMessages.some(msg => msg.includes(word)))) {
      severity = 'high';
    } else if (moderateWords.some(word => userMessages.some(msg => msg.includes(word)))) {
      severity = 'medium';
    }
    
    // Show completion toast
    toast({
      title: "Initial Assessment Complete",
      description: "Thank you for sharing. We've evaluated your responses.",
    });
    
    // Call the callback with assessment results
    if (onCompleteAssessment) {
      onCompleteAssessment(severity, category);
    }
  };

  return (
    <Card className="w-full h-[600px] max-h-[80vh] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Mindful Grove Assistant</CardTitle>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {assessmentProgress < 100 ? 'Initial Assessment' : 'Assessment Complete'}
          </Badge>
        </div>
        {assessmentProgress > 0 && assessmentProgress < 100 && (
          <Progress value={assessmentProgress} className="h-1" />
        )}
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'} fade-in`}
            >
              {message.content}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble chat-bubble-bot flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <form 
          className="flex w-full gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!input.trim() || isTyping}>
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
