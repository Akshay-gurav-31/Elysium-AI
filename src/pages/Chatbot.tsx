import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { Loader2, Trash2, Mic, MicOff, Image as ImageIcon, X } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  image?: string;
}

const MAX_IMAGE_SIZE = 500 * 1024; // 500KB
const MAX_DIMENSION = 800; // pixels
const GEMINI_API_KEY = "AIzaSyCzttZnO6DLgH8obqo0W6tlrRSq7HxMlzY";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const HEALTH_KEYWORDS = [
  'health', 'mental', 'stress', 'anxiety', 'depression',
  'therapy', 'counseling', 'doctor', 'psychologist',
  'feeling', 'emotion', 'mind', 'wellbeing', 'sleep',
  'exercise', 'diet', 'pain', 'headache', 'treatment',
  'medication', 'counselor', 'psychiatrist', 'fatigue',
  'insomnia', 'wellness', 'diagnosis', 'illness', 'disorder',
  'trauma', 'panic', 'mood', 'burnout', 'addiction',
  'support', 'recovery', 'therapy', 'symptom', 'nutrition',
  'fitness', 'hydration', 'injury', 'relaxation', 'selfcare',
  'checkup', 'appointment', 'specialist', 'clinic', 'hospital',
  'infection', 'immune', 'virus', 'flu', 'covid', 'cold',
  'blood', 'pressure', 'cholesterol', 'diabetes', 'weight',
  'obesity', 'thyroid', 'vitamin', 'deficiency', 'sleeping',
  'muscle', 'bone', 'joints', 'backache', 'posture', 'vision',
  'hearing', 'skin', 'allergy', 'rash', 'eczema', 'asthma',
  'breathing', 'lungs', 'cardio', 'heart', 'stroke', 'cancer',
  'oncology', 'meditate', 'mindfulness', 'bipolar', 'autism',
  'adhd', 'neurology', 'dementia', 'alzheimer', 'infection',
  'nausea', 'vomit', 'diarrhea', 'constipation', 'digestion',
  'gut', 'colon', 'stomach', 'surgery', 'operation',
  'vaccine', 'screening', 'xray', 'mri', 'scan', 'test',
  'lab', 'pathology', 'clinic', 'rehab', 'detox', 'wellbeing'
];

const Chatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your mental health assistant. How can I help you today?.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        toast({
          title: "Voice input failed..",
          description: "Could not access your microphone..",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isListening, toast]);

  // Analyze image using Gemini AI (ends with two dots)
  const analyzeImageWithGemini = async (imageBase64: string) => {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Analyze this image and provide a helpful response as a mental health assistant. Be compassionate and supportive. End your response with two dots (..)"
            }, {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64.split(',')[1]
              }
            }]
          }]
        })
      });

      const data = await response.json();
      let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                       "I've received your image. How can I help you with it?..";
      
      // Ensure the response ends with two dots
      if (!responseText.trim().endsWith("..")) {
        responseText = responseText.trim() + "..";
      }
      
      return responseText;
    } catch (error) {
      console.error("Gemini AI error:", error);
      return "I couldn't analyze the image properly. Could you describe what you need help with?..";
    }
  };

  // Handle text messages with Groq Cloud (ends with one dot)
  const handleTextWithGroq = async (message: string) => {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a compassionate mental health assistant. Provide supportive responses. Always end your response with a single dot (.)"
            },
            ...messages.map(msg => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            })),
            {
              role: "user",
              content: message
            }
          ]
        })
      });
      
      const data = await response.json();
      let responseText = data.choices[0].message.content;
      
      // Ensure the response ends with one dot
      if (!responseText.trim().endsWith(".")) {
        responseText = responseText.trim() + ".";
      }
      
      return responseText;
    } catch (error) {
      console.error("Groq API error:", error);
      return "I'm having trouble connecting right now. Please try again later..";
    }
  };

  // Image compression
  const compressImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Could not create canvas");

          let width = img.width;
          let height = img.height;

          if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
            const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
            width = Math.floor(width * ratio);
            height = Math.floor(height * ratio);
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject("Compression failed");
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = () => reject("Failed to read blob");
              reader.readAsDataURL(blob);
            },
            "image/jpeg",
            0.7
          );
        };
        img.onerror = () => reject("Image loading failed");
      };
      reader.onerror = () => reject("File reading failed");
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file..",
        description: "Please upload an image file..",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const compressedImage = await compressImage(file);
      setPreviewImage(compressedImage);
    } catch (error) {
      toast({
        title: "Upload failed..",
        description: "Could not process the image..",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !previewImage) return;

    // Create user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
      ...(previewImage && { image: previewImage }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPreviewImage(null);
    setIsTyping(true);

    try {
      let botResponse = "";
      
      if (previewImage) {
        // Use Gemini AI for image analysis (will end with ..)
        botResponse = await analyzeImageWithGemini(userMessage.image!);
      } else {
        // Use Groq Cloud for text messages (will end with .)
        botResponse = await handleTextWithGroq(userMessage.text);
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again..",
        sender: "bot",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreviewImage(null);
  };

  const toggleVoiceInput = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!recognitionRef.current) {
      toast({
        title: "Voice input not supported..",
        description: "Your browser doesn't support speech recognition..",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        toast({
          title: "Microphone access denied..",
          description: "Please allow microphone access to use voice input..",
          variant: "destructive",
        });
      }
    }
  };

  const clearChat = (e: React.MouseEvent) => {
    e.preventDefault();
    setMessages([{
      id: 1,
      text: "Hi there! I'm your mental health assistant. How can I help you today?.",
      sender: "bot",
      timestamp: new Date(),
    }]);
    toast({
      title: "Chat cleared..",
      description: "The conversation has been reset..",
    });
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-220px)] bg-[#0a1128]/10 py-8 text-white">
        <div className="elysium-container flex flex-col space-y-8 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display text-foreground mb-4">
              AI <span className="text-primary">Support Chat</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chat with our AI assistant to get immediate support and guidance.
            </p>
          </div>

          <Card className="shadow-md flex flex-col h-[600px] bg-background border-border">
            <CardContent className="flex flex-col h-full p-0">
              <div className="bg-primary text-white py-3 px-4 rounded-t-lg flex items-center">
                <div className="w-3 h-3 bg-secondary rounded-full mr-2 animate-pulse"></div>
                <span className="font-display">Elysium AI Assistant</span>
                <span className="ml-auto text-sm opacity-80">Online</span>
              </div>
              
              <div ref={messagesContainerRef} className="flex-grow overflow-y-auto p-4 bg-background">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
                    <div className={`max-w-xs sm:max-w-md rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-white rounded-br-none" : "bg-[#0a1128]/10 text-foreground rounded-bl-none"}`}>
                      {message.image && (
                        <div className="mb-2">
                          <img 
                            src={message.image} 
                            alt="User upload" 
                            className="max-w-full max-h-60 rounded-md object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18945b7b9b6%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18945b7b9b6%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22110.5%22%20y%3D%22107.1%22%3EImage%20not%20displayed..</text>%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                            }}
                          />
                        </div>
                      )}
                      <p>{message.text}</p>
                      <div className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-200" : "text-muted-foreground"}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#0a1128]/10 text-foreground rounded-lg rounded-bl-none p-3 max-w-xs sm:max-w-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-border space-y-3">
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearChat}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Chat
                  </Button>
                </div>

                {previewImage && (
                  <div className="relative mb-2 bg-[#0a1128]/10 p-2 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Image to send:</span>
                      <button
                        onClick={removeImage}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="mt-2 max-w-[200px] h-auto rounded-md border border-border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20150%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18945b7b9b6%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18945b7b9b6%22%3E%3Crect%20width%3D%22200%22%20height%3D%22150%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2273.5%22%20y%3D%2280.1%22%3EPreview%20failed..</text>%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                      }}
                    />
                  </div>
                )}
                
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <div className="relative flex-grow flex items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute left-2 p-1 rounded-full text-muted-foreground hover:text-primary"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ImageIcon className="h-4 w-4" />
                      )}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      disabled={isUploading}
                    />
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                      placeholder="Type your message here..."
                      className="flex-grow bg-background border-border text-foreground pl-10"
                      disabled={isTyping || isUploading}
                    />
                    <button
                      type="button"
                      onClick={toggleVoiceInput}
                      className={`absolute right-2 p-1 rounded-full ${
                        isListening ? "text-red-500 animate-pulse" : "text-muted-foreground"
                      }`}
                    >
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={isTyping || isUploading || (!input.trim() && !previewImage)}
                  >
                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need more personalized help? Our professional therapists are available.
            </p>
            <Button
              onClick={() => 
                toast({
                  title: "Feature Coming Soon..",
                  description: "Professional consultation booking will be available soon..",
                })
              }
              className="bg-secondary hover:bg-secondary/90"
            >
              Connect with a Professional
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
// Add this function to check if message is health-related
const isHealthRelated = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return HEALTH_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
};

// Modify the handleTextWithGroq function to handle off-topic questions
const handleTextWithGroq = async (message: string) => {
  // First check if the message is health-related
  if (!isHealthRelated(message)) {
    return "I'm sorry, I'm specialized in mental health topics. I can help with stress, anxiety, depression, or other mental health concerns. Could you tell me how you're feeling or what's on your mind?.";
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a compassionate mental health assistant. Provide supportive responses. Always end your response with a single dot (.)"
          },
          
        (msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text
          })),
          {
            role: "user",
            content: message
          }
        ]
      })
    });
    
    const data = await response.json();
    let responseText = data.choices[0].message.content;
    
    // Ensure the response ends with one dot
    if (!responseText.trim().endsWith(".")) {
      responseText = responseText.trim() + ".";
    }
    
    return responseText;
  } catch (error) {
    console.error("Groq API error:", error);
    return "I'm having trouble connecting right now. Please try again later..";
  }
};

export default Chatbot;