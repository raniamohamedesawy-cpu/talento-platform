import { useState } from 'react';
import { motion } from 'framer-motion';
import { Logo } from './components/Logo';
import { Sparkles, Users, Zap, Menu, X, Shield } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Skill Matching',
      description: 'AI-powered algorithm connects you with the perfect skill exchange partner',
    },
    {
      icon: Sparkles,
      title: 'Smart Learning',
      description: 'Personalized learning paths tailored to your goals and experience',
    },
    {
      icon: Zap,
      title: 'Instant Connect',
      description: 'Real-time matching and scheduling with verified professionals',
    },
    {
      icon: Shield,
      title: 'Verified Skills',
      description: 'Trust-based system with verified credentials and peer reviews',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '200+', label: 'Skills Available' },
    { value: '95%', label: 'Match Success' },
    { value: '4.9/5', label: 'User Rating' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080F1A] via-[#0D1A2D] to-[#080F1A] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#0D1A2D]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between">
            <div className="flex items-center">
              <Logo variant="navbar" className="h-8 w-auto" />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
                How it Works
              </a>
              <button
                onClick={onEnterApp}
                className="text-sm text-white/55 hover:text-white transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={onEnterApp}
                className="rounded-lg bg-[#F5A060] px-5 py-2 text-[13px] font-medium text-[#1A0E00] shadow-[0_0_8px_rgba(245,160,96,0.25)] hover:shadow-[0_0_12px_rgba(245,160,96,0.35)] transition-all"
              >
                Get started
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0A0E27]/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-sm text-gray-300 hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="block py-2 text-sm text-gray-300 hover:text-white">
                How it Works
              </a>
              <button
                onClick={onEnterApp}
                className="block w-full py-2 text-left text-sm text-white/55 hover:text-white"
              >
                Sign in
              </button>
              <button
                onClick={onEnterApp}
                className="block w-full rounded-lg bg-[#F5A060] px-4 py-2 text-sm font-medium text-[#1A0E00]"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0D1A2D] to-[#080F1A]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F5A060]/[0.07] rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5A060]/20 bg-[#F5A060]/[0.08] px-3.5 py-1.5 mb-7">
              <div className="h-1.5 w-1.5 rounded-full bg-[#F5A060] animate-pulse" />
              <span className="text-xs text-[#F5A060] tracking-wide">Now in public beta</span>
            </div>

            <h1
              style={{ fontFamily: "'Tenor Sans', Georgia, serif" }}
              className="mx-auto max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.1] mb-5"
            >
              Exchange skills.<br />
              Grow <span className="text-[#F5A060]">together</span><br />
              with AI.
            </h1>

            <p className="mx-auto max-w-lg text-base text-white/55 leading-[1.65] font-light mb-9">
              Connect with experts, share what you know, and let AI match you with the right people — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
              <button
                onClick={onEnterApp}
                className="w-full sm:w-auto rounded-[10px] bg-[#F5A060] px-7 py-3.5 font-medium text-[#1A0E00] shadow-[0_4px_20px_rgba(245,160,96,0.35)] hover:shadow-[0_4px_24px_rgba(245,160,96,0.45)] transition-all flex items-center justify-center gap-2"
              >
                Start exchanging →
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto rounded-[10px] border border-white/[0.08] bg-transparent px-7 py-3.5 font-medium text-white backdrop-blur-sm hover:bg-white/5 transition-all text-center"
              >
                See how it works
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F5A060] mb-1">{stat.value}</div>
                  <div className="text-sm text-white/55">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5A060]/20 bg-[#F5A060]/5 px-4 py-1.5 mb-4">
              <Zap className="h-4 w-4 text-[#F5A060]" />
              <span className="text-sm text-gray-300">Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Built for Modern Learners
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to connect, learn, and grow with a global community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl border border-white/[0.08] bg-[#0F2035] p-6 backdrop-blur-sm hover:bg-white/[0.02] hover:border-[#F5A060]/20 transition-all"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5A060]/10 text-[#F5A060] group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F2035]/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, Fast, Effective
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our streamlined process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Create Profile', description: 'Share your skills and what you want to learn' },
              { step: '02', title: 'AI Matching', description: 'Our algorithm finds your perfect exchange partner' },
              { step: '03', title: 'Start Learning', description: 'Connect and begin exchanging knowledge' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F5A060] text-2xl font-bold text-[#1A0E00] mb-4 shadow-[0_0_8px_rgba(245,160,96,0.25),_0_0_24px_rgba(245,160,96,0.12)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-[#F5A060]/20 bg-[#F5A060]/[0.05] p-12 text-center backdrop-blur-sm">
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals exchanging skills and building meaningful connections
              </p>
              <button
                onClick={onEnterApp}
                className="rounded-[10px] bg-[#F5A060] px-8 py-3.5 font-medium text-[#1A0E00] shadow-[0_4px_20px_rgba(245,160,96,0.35)] hover:shadow-[0_4px_24px_rgba(245,160,96,0.45)] transition-all inline-flex items-center gap-2"
              >
                Get started free →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Logo variant="footer" className="h-5 w-auto mb-4" />
              <p className="text-sm text-gray-400 max-w-sm">
                The AI-powered platform for skill exchange. Learn from the best, share your expertise.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2026 Talento. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
