import {
  Code,
  MessagesSquare,
  Heart,
  Sparkles,
  Globe,
  Users,
  Github,
  Twitter,
  Linkedin,
  ChevronRight,
  Check,
  User,
  Star,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Cpu,
  GitBranch,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import Footer from "./Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Developer Network",
      desc: "Connect with developers who share your tech stack and project interests.",
    },
    {
      icon: <MessagesSquare className="w-8 h-8" />,
      title: "Real-time Collaboration",
      desc: "Chat, share code snippets, and collaborate seamlessly within the platform.",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Tech Stack Matching",
      desc: "Find partners based on complementary skills and technologies.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Verified Community",
      desc: "All members are verified through GitHub and technical assessments.",
    },
  ];

  const testimonials = [
    {
      quote:
        "I connected with someone who complements my skills. We’re working on a small project together.",
      name: "Rohan Verma",
      role: "Full-stack Developer",
      stars: 5,
    },
    {
      quote:
        "Great platform to find like-minded developers. It made collaboration much easier for me.",
      name: "Priya Kapoor",
      role: "React Developer",
      stars: 5,
    },
    {
      quote:
        "I met a fellow developer here, and we’ve started exploring a side project together.",
      name: "Ankit Shah",
      role: "Backend Engineer",
      stars: 5,
    },
  ];

  const steps = [
    {
      title: "Create Profile",
      desc: "Showcase your skills, projects, and what you're looking for",
      icon: <User className="w-6 h-6" />,
    },
    {
      title: "Find Matches",
      desc: "Browse through curated developer profiles",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Start Building",
      desc: "Connect and collaborate via chats",
      icon: <Terminal className="w-6 h-6" />,
    },
  ];

  const stats = [
    { number: "50+", label: "Active Developers" },
    { number: "200+", label: "Chats Exchanged" },
    { number: "95%", label: "Success Rate" },
    { number: "5+", label: "Weekly Matches" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      <HeroSection />

      <StatsSection stats={stats} />

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Developer-focused</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Features
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Everything you need to find and collaborate with the right
            developers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">What developers</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                are saying
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Join thousands of developers who've found their perfect match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Simple</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              3-step process
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            Get started and find your coding partner in minutes
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 justify-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-xs mx-auto relative"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 border-2 border-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-20 top-1/2 transform -translate-y-1/2">
                    <ChevronRight className="w-10 h-10 text-gray-600" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6 space-x-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white">
              <Code className="h-6 w-6" />
            </div>
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
            Ready to find your development partner?
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Join thousands of developers building amazing projects together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 md:py-4 md:text-lg md:px-10">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
