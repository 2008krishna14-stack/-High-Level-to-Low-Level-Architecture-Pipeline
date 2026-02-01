import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const blogHeadlines = [
    "Turn Business Ideas into Technical Specs Instantly",
    "From High-Level Requirements to Detailed Solutions",
    "Automate the Gap Between Business and Engineering",
    "AI That Translates Vision into Technical Reality",
    "Simplifying Requirement-to-Specification Workflows",
    "Smart Automation for Precise Technical Documentation",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % blogHeadlines.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24 relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full -z-10 animate-pulse" />

        {/* Badge */}
        <div className="mb-6 animate-fade-in">
          <span className="badge badge-primary badge-lg gap-2 px-6 py-4 shadow-lg glass">
            <Zap className="w-4 h-4" />
            AI-Powered Automation
          </span>
        </div>

        {/* Animated Headline */}
        <h1
          key={index}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6
          bg-gradient-to-r from-primary via-secondary to-accent
          bg-clip-text text-transparent
          transition-all duration-700 ease-out
          animate-fade-in-up"
          style={{ minHeight: "1.3em" }}
        >
          {blogHeadlines[index]}
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-base md:text-lg text-base-content/70 mb-10 animate-fade-in delay-200">
          Convert complex business requirements into clear, structured, and
          developer-ready technical specifications using intelligent AI
          automation.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center animate-fade-in delay-300">
          <button
            className="btn btn-primary btn-lg gap-2 shadow-xl hover:scale-105 transition-transform"
            onClick={() => navigate("/DashBoard")}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            className="btn btn-outline btn-lg hover:bg-base-200"
            onClick={() => navigate("/DashBoard")}
          >
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
}
