'use client'
import { useState } from "react";
import { X } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import NavBar from "@/components/NavBar";
import Feature from "./Feature";
import Footer from "./Footer";
import { CheckCircle, ArrowRight, Zap, ChevronRight, Calendar, Video, ClipboardCheck } from 'lucide-react';

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Main Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>

        {/* Glow Circles */}
        <div className="absolute w-[1200px] h-[1200px] bg-blue-600 rounded-full opacity-10 blur-3xl -top-1/4 -left-1/4 animate-glow-slow"></div>
        <div className="absolute w-[800px] h-[800px] bg-purple-600 rounded-full opacity-10 blur-3xl bottom-1/4 -right-1/4 animate-glow-slower"></div>

        {/* Meteor Shower */}
        {[...Array(100)].map((_, i) => (
          <span
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full animate-meteor"
            style={{
              top: `0%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${(i % 20) * 0.3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: 0.7,
              boxShadow: `0 0 6px 3px rgba(255,255,255,0.2)`,
            }}
          />
        ))}
      </div>

      <NavBar />

      {/* Hero Section */}
      <section className="w-full min-h-screen relative flex items-center justify-center z-10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
            Conduct Better Technical Interviews in One Place
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300">
            Live coding + video calls + evaluation rubrics – no more app juggling.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

            <div className="flex gap-4 p-4">
              <button onClick={()=>{window.location.href="/interviewer-signup"}} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105">
                Enter as Interviewer
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="border border-neutral-400 text-neutral-300 hover:border-white hover:text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
              >
                Try Demo
              </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all">
                <div className="bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-white hover:text-red-400 transition"
                  >
                    <X size={28} />
                  </button>
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Demo Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="relative py-16 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-900/50 text-blue-300 text-sm sm:text-base font-medium mb-4 backdrop-blur-sm">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              The Interview Revolution
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              From Chaos to <span className="text-blue-400">Clarity</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-semibold text-red-300 mb-3 sm:mb-4">Current Pain Points</h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-300 text-base sm:text-lg">
                {[
                  "Switching between Zoom/LeetCode",
                  "Unreliable screensharing",
                  "Manual note-taking",
                  "Disorganized feedback",
                  "No standardized evaluation"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-800/50 backdrop-blur-sm flex items-center justify-center text-blue-300 hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>

            <div className="bg-blue-900/30 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-blue-700/50 hover:border-blue-400 transition-all duration-300">

              <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-3 sm:mb-4">Our Solution</h3>

              <ul className="space-y-3 sm:space-y-4 text-gray-200 text-base sm:text-lg">
                {[
                  "All tools in one workspace",
                  "Real-time code streaming",
                  "Built-in scoring rubrics",
                  "Collaborative whiteboard",
                  "Automated candidate reports"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-16 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Simple Yet <span className="text-blue-400">Powerful</span>
            </h2>
            <p className="text-lg text-neutral-300">
              Our streamlined process gets you from scheduling to hiring decision faster than ever.
            </p>
          </div>
          <br />
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Schedule & Prepare",
                description: "Set up interviews with custom rubrics and coding exercises.",
                icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              },
              {
                title: "Conduct Interview",
                description: "Integrated video call and collaborative coding environment.",
                icon: <Video className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              },
              {
                title: "Evaluate & Decide",
                description: "Score candidates in real-time and compare results.",
                icon: <ClipboardCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-900/30 rounded-lg flex items-center justify-center mb-5 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{index + 1}</h3>
                <h4 className="text-lg sm:text-xl font-semibold text-blue-300 mb-3 sm:mb-4">{item.title}</h4>
                <p className="text-gray-300 text-base sm:text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Trusted by <span className="text-blue-400">Engineering Teams</span>
            </h2>
            <p className="p-4 text-lg text-neutral-300">
              Don't just take our word for it. Here's what our users say.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                quote: "Reduced our interview setup time by 70% while improving candidate experience significantly.",
                author: "ByteTech",
                role: "Engineering Lead",
                rating: 5
              },
              {
                quote: "Finally eliminated the need to juggle between Zoom and HackerRank. Everything we need is in one place.",
                author: "CodeForge",
                role: "Hiring Manager",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-200 mb-5 sm:mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-blue-300 font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 sm:py-20 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 sm:p-12 rounded-xl relative overflow-hidden">
            {/* Section Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>

            <h2 className="text-3xl text-black sm:text-4xl font-bold mb-5 sm:mb-6">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-lg font-semibold text-blue-100 mb-8">
              Join thousands of teams making better hiring decisions faster with our all-in-one platform.
            </p>
            <div className="p-4 flex flex-col sm:flex-row justify-center gap-4">
              <button className=" bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition transform hover:-translate-y-1 duration-300 shadow-lg text-base sm:text-lg">
                Start Free Trial
              </button>
              <button className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition text-base sm:text-lg">
                Schedule Demo
              </button>
            </div>
            <p className="mt-6 text-white text-sm sm:text-base ">
              <u>No credit card required</u> • <u>14-day free trial</u> • <u>Cancel anytime</u>
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Animation Style */}
      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-400px, 900px) scale(0.1);
            opacity: 0.3;
          }
        }
        @keyframes glow-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes glow-slower {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-meteor {
          animation-name: meteor;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-glow-slow {
          animation: glow-slow 8s ease-in-out infinite;
        }
        .animate-glow-slower {
          animation: glow-slower 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}