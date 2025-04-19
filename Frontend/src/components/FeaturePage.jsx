import React from 'react';
import { Code, Video, Shield, FileText, Calendar, MessageSquare } from 'lucide-react';

export default function FeaturesPage() {

  const features = [
    {
      icon: <Code className="w-6 h-6 text-white" />,
      iconBg: "bg-blue-600",
      title: "Real-Time Coding Environment",
      description: "Syntax highlighting, auto-completion, and real-time error detection for seamless coding experience."
    },
    {
      icon: <Video className="w-6 h-6 text-white" />,
      iconBg: "bg-purple-600",
      title: "Video Conferencing",
      description: "Built-in WebRTC powered video and audio calls for face-to-face interactions."
    },
    {
      icon: <Shield className="w-6 h-6 text-white" />,
      iconBg: "bg-green-600",
      title: "Anti-Cheating System",
      description: "Advanced tab-switch detection and real-time alerts for interview integrity."
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      iconBg: "bg-red-600",
      title: "Session Recording",
      description: "Complete interview recording including code, video, and chat for later review."
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      iconBg: "bg-yellow-600",
      title: "Automated Scheduling",
      description: "Email notifications and calendar integration for interview management."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      iconBg: "bg-indigo-600",
      title: "Collaborative Tools",
      description: "Integrated chat and shared notes for effective communication."
    }
  ];

  return (
      <div className="max-w-6xl mx-auto flex flex-col gap-y-5">
        <div className="text-center mb-16 flex flex-col gap-y-5">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features for Technical Interviews
          </h2>
          <p className="text-gray-300 text-lg">
            Everything you need to conduct seamless coding interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-neutral-700 rounded-lg p-6 flex flex-col items-center gap-y-5 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out transform translate-z-0"
            >
              <div className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
  );
}