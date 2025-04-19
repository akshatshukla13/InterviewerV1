'use client'

import { useEffect, useState, Suspense, lazy } from 'react';
import { SplineScene } from "@/components/ui/splite";
import NavBar from "@/components/NavBar";
import Feature from "./Feature";
import Footer from "./Footer";
import FeaturesPage from "./FeaturePage";
import HowItWorksPage from "./HowItWorksPage";
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from './ui/code-block';

export function LandingPage() {
  const [showSpline, setShowSpline] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check if device is likely to struggle with 3D
    const checkPerformance = () => {
      // Mobile detection
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      // Lower-end device detection (approximate)
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
      
      setIsLowPerformance(isMobile || isLowEnd);
    };

    checkPerformance();
    
    // Delay loading the 3D scene for better initial page load
    const timer = setTimeout(() => {
      setShowSpline(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Alternative component for low-performance devices
  const RobotFallback = () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[450px]">
        <CodeBlock>
          <CodeBlockGroup className="border-border border-b px-4 py-2 bg-neutral-900">
            <div className="flex items-center gap-2">
              <div className="bg-neutral-600 text-white rounded px-2 py-1 text-xs font-medium">
                JavaScript
              </div>
              <span className="text-muted-foreground text-sm">
                GitHub Dark Theme
              </span>
            </div>
          </CodeBlockGroup>
          <CodeBlockCode 
            code={`function calculateTotal(items) {
              return items
                .filter(item => item.price > 0)
                .reduce((total, item) => {
                  return total + item.price * item.quantity;
                }, 0);
            }` }
            language="javascript" 
            theme="github-dark" 
          />
        </CodeBlock>
      </div>
    </div>
  );

  const LoadingPlaceholder = () => (
    <div className="w-full h-full bg-neutral-800 opacity-50 animate-pulse"></div>
  );

  return (
    <>
      <NavBar />
      
      {/* Hero Section */}
      <div className="w-full h-[600px] bg-neutral-950 relative overflow-hidden text-white">
        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center px-12 md:px-28 gap-y-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-300">
              Conduct Better Technical Interviews in One Place
            </h1>
            <p className="mt-4 text-neutral-300 max-w-xl">
              Live coding + video calls + evaluation rubrics – no more app juggling.
            </p>
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition">
                Try Free Demo
              </button>
              <button className="border border-neutral-500 text-neutral-300 hover:text-white hover:border-white font-semibold py-2 px-6 rounded-lg transition">
                See How It Works
              </button>
            </div>
          </div>

          {/* Right visual - optimized with conditional rendering */}
          <div className="flex-1 relative hidden md:block">
              {showSpline && !isLowPerformance ? (
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  // Add performance props if your SplineScene component supports them
                  options={{
                    quality: "low", // If your component accepts quality settings
                    powerPreference: "low-power" // WebGL power preference
                  }}
                />
              ) : (
                <RobotFallback />
              )}
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <section className="bg-neutral-700 py-16 px-6 md:px-28">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          The Interview Chaos Ends Here
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-2">Current Pain Points</h3>
            <ul className="text-white space-y-2">
              <li>Switching between Zoom/LeetCode</li>
              <li>Unreliable screensharing</li>
              <li>Manual note-taking</li>
            </ul>
          </div>
          <div className="md:col-span-1 flex justify-center items-center text-4xl font-bold text-blue-500">→</div>
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Our Solution</h3>
            <ul className="text-white space-y-2">
              <li>All tools in one tab</li>
              <li>Real-time code streaming</li>
              <li>Built-in scoring rubrics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <div className="flex flex-col items-center gap-y-5 w-full bg-neutral-800 py-16 px-4">
        <FeaturesPage/>
      </div>

      {/* How It Works Section */}
      <div className="w-full bg-neutral-900">
        <HowItWorksPage/>
      </div>

      {/* Testimonials */}
      <section className="bg-neutral-900 py-20 px-6 md:px-28">
        <div className="flex flex-col items-center gap-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Trusted by Engineering Teams
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-neutral-100">
            <blockquote>
              "Cut our interview setup time by 70%."  
              <footer className="mt-2 text-sm text-neutral-400">– ByteTech, Engineering Lead</footer>
            </blockquote>
            <blockquote>
              "Finally, no more juggling between Zoom and HackerRank."  
              <footer className="mt-2 text-sm text-neutral-400">– CodeForge, Hiring Manager</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-16 text-white text-center px-6">
        <div className="flex flex-col items-center gap-y-5">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Simplify Your Interviews?
          </h2>
          <p className="mb-3">Start using CodeInterview Pro – no credit card required.</p>
          <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}