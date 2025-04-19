import React from 'react';
import { Code, Video, Shield, Check } from 'lucide-react';

export default function HowItWorksPage() {
  const features = [
    {
      icon: <Code className="w-10 h-10 text-purple-500" />,
      title: "Real-Time Coding",
      description: "Collaborate in real-time with syntax highlighting, auto-completion, and instant error detection."
    },
    {
      icon: <Video className="w-10 h-10 text-purple-500" />,
      title: "Video Conferencing",
      description: "Connect face-to-face with built-in WebRTC powered video and audio capabilities."
    },
    {
      icon: <Shield className="w-10 h-10 text-purple-500" />,
      title: "Secure Environment",
      description: "Advanced anti-cheating mechanisms ensure interview integrity and fairness."
    }
  ];

  const interviewerFeatures = [
    "Custom evaluation forms and scoring",
    "Complete session recording and playback",
    "Automated email notifications and scheduling"
  ];

  const candidateFeatures = [
    "Multi-language code execution support",
    "Integrated chat and collaborative notes",
    "User-friendly interface with instant feedback"
  ];

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <div className="flex flex-col items-center gap-y-20 px-10">
        <div className="text-center mb-12 flex flex-col gap-y-5">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Experience seamless technical interviews with our powerful platform
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {features.map((feature, index) => (
            <div key={index} className="bg-neutral-800 rounded-lg p-8 flex flex-col gap-y-5 cursor-pointer hover:scale-110 transition-transform duration-300 ease-out transform translate-z-0">
              <div className="mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* For Interviewers and Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-neutral-800 rounded-lg p-8 flex flex-col gap-y-5">
            <h3 className="text-2xl font-bold text-white mb-6">
              For Interviewers
            </h3>
            <div className="flex flex-col gap-y-5">
              {interviewerFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-800 rounded-lg p-8 flex flex-col gap-y-5">
            <h3 className="text-2xl font-bold text-white mb-6">
              For Candidates
            </h3>
            <div className="flex flex-col gap-y-5">
              {candidateFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-500 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-400">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}