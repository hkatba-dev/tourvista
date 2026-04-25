'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  Eye, EyeOff, Mail, Lock, User, Phone,
  Loader2, CheckCircle2, Copy, Check, ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

interface LoginData {
  email: string;
  password: string;
  remember: boolean;
}

interface SignupData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const DEMO_CREDENTIALS = [
  { role: 'Super Admin', email: 'rahul@tourvista.in', password: 'TourVista@2026' },
  { role: 'Travel Agent', email: 'priya.agent@tourvista.in', password: 'Agent@Secure99' },
];

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded-md text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
      title="Copy to clipboard"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
    </button>
  );
}

export default function AuthScreen() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [heroIdx] = useState(0);

  const loginForm = useForm<LoginData>({ defaultValues: { remember: false } });
  const signupForm = useForm<SignupData>();

  const handleLoginSubmit = async (data: LoginData) => {
    // Backend integration point: POST /api/auth/login
    await new Promise((r) => setTimeout(r, 1400));
    const valid = DEMO_CREDENTIALS.some(
      (c) => c.email === data.email && c.password === data.password
    );
    if (!valid) {
      loginForm.setError('email', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      return;
    }
    setLoginSuccess(true);
    toast.success('Welcome back, Rahul! Redirecting to dashboard...');
    setTimeout(() => {
      window.location.href = '/admin-dashboard';
    }, 1500);
  };

  const handleSignupSubmit = async (data: SignupData) => {
    // Backend integration point: POST /api/auth/register
    if (data.password !== data.confirmPassword) {
      signupForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! Please log in.');
    setTab('login');
    signupForm.reset();
  };

  const fillCredentials = (cred: typeof DEMO_CREDENTIALS[0]) => {
    loginForm.setValue('email', cred.email);
    loginForm.setValue('password', cred.password);
    loginForm.clearErrors();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand/Visual */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative overflow-hidden flex-col">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url('${HERO_IMAGES[heroIdx]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-primary-900/70" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <AppLogo size={40} />
            <span className="font-display font-bold text-white text-2xl">TourVista</span>
          </div>

          {/* Middle */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 bg-accent-500/20 text-accent-300 text-sm font-semibold rounded-full mb-6 border border-accent-500/30">
                🌍 Admin Portal
              </span>
              <h1 className="font-display font-extrabold text-white text-4xl xl:text-5xl leading-tight mb-5">
                Manage Your{' '}
                <span className="text-accent-400">Travel Empire</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-md mb-10">
                Access your dashboard to manage leads, packages, destinations, and WhatsApp inquiries — all in one place.
              </p>

              {/* Feature list */}
              <div className="space-y-3">
                {[
                  '📊 Real-time lead pipeline dashboard',
                  '✈️ Manage 40+ tour packages effortlessly',
                  '💬 WhatsApp inquiry tracking & outreach',
                  '📍 Destination performance analytics',
                ].map((item) => (
                  <div key={`feature-${item}`} className="flex items-center gap-3 text-white/80 text-sm">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '1,847', label: 'Total Leads' },
              { value: '28.3%', label: 'Conversion Rate' },
              { value: '$284K', label: 'Pipeline Value' },
            ].map((s) => (
              <div key={`auth-stat-${s.label}`} className="glass rounded-2xl p-4 text-center">
                <div className="font-display font-bold text-white text-xl tabular-nums">{s.value}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-2.5 px-6 py-5 border-b border-gray-100">
          <AppLogo size={32} />
          <span className="font-display font-bold text-primary-600 text-xl">TourVista</span>
          <Link href="/home-landing-page" className="ml-auto flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={15} />
            Back to site
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-10 max-w-md mx-auto w-full">
          {/* Back link — desktop */}
          <Link href="/home-landing-page" className="hidden lg:flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-8 w-fit transition-colors">
            <ArrowLeft size={14} />
            Back to TourVista
          </Link>

          {loginSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <h2 className="font-display font-bold text-gray-900 text-2xl mb-2">Login Successful!</h2>
              <p className="text-gray-500">Redirecting to your dashboard...</p>
              <div className="mt-4 flex justify-center">
                <Loader2 size={20} className="animate-spin text-primary-500" />
              </div>
            </motion.div>
          ) : (
            <>
              {/* Heading */}
              <div className="mb-8">
                <h2 className="font-display font-bold text-gray-900 text-2xl md:text-3xl mb-1.5">
                  {tab === 'login' ? 'Welcome back' : 'Create your account'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {tab === 'login' ?'Sign in to your TourVista admin panel' :'Join the TourVista team and start managing trips'}
                </p>
              </div>

              {/* Tab switcher */}
              <div className="flex bg-gray-100 rounded-xl p-1 mb-7">
                {(['login', 'signup'] as const).map((t) => (
                  <button
                    key={`auth-tab-${t}`}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      tab === t ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tab === 'login' ? (
                  <motion.div
                    key="login-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4" noValidate>
                      {/* Email */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            {...loginForm.register('email', {
                              required: 'Email is required',
                              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                            })}
                            placeholder="rahul@tourvista.in"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${loginForm.formState.errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {loginForm.formState.errors.email && (
                          <p className="text-red-500 text-xs mt-1.5">{loginForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-gray-700 text-sm font-medium">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <button type="button" className="text-primary-500 text-xs font-medium hover:text-primary-700 transition-colors">
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPass ? 'text' : 'password'}
                            {...loginForm.register('password', {
                              required: 'Password is required',
                              minLength: { value: 6, message: 'Min 6 characters' },
                            })}
                            placeholder="Your password"
                            className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${loginForm.formState.errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label={showPass ? 'Hide password' : 'Show password'}
                          >
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {loginForm.formState.errors.password && (
                          <p className="text-red-500 text-xs mt-1.5">{loginForm.formState.errors.password.message}</p>
                        )}
                      </div>

                      {/* Remember me */}
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          {...loginForm.register('remember')}
                          className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-300"
                        />
                        <span className="text-sm text-gray-600">Remember me for 30 days</span>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loginForm.formState.isSubmitting}
                        className="w-full btn-primary py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        style={{ minHeight: '52px' }}
                      >
                        {loginForm.formState.isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Signing in...
                          </>
                        ) : 'Sign In to Dashboard'}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                      <div className="flex-1 h-px bg-gray-200" />
                      <span className="text-gray-400 text-xs">or continue with</span>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <button className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2.5 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </button>
                    </div>

                    {/* Demo Credentials */}
                    <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
                      <p className="text-primary-700 text-xs font-semibold uppercase tracking-wider mb-3">
                        🔑 Demo Admin Credentials
                      </p>
                      <div className="space-y-2">
                        {DEMO_CREDENTIALS.map((cred) => (
                          <div
                            key={`cred-${cred.role}`}
                            className="bg-white rounded-xl p-3 border border-primary-100"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-primary-700 uppercase tracking-wide">{cred.role}</span>
                              <button
                                onClick={() => fillCredentials(cred)}
                                className="text-xs font-semibold text-accent-600 hover:text-accent-700 bg-accent-50 px-2.5 py-1 rounded-lg transition-colors"
                              >
                                Use this
                              </button>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500 text-xs">Email:</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-800 text-xs font-mono">{cred.email}</span>
                                  <CopyButton text={cred.email} />
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-500 text-xs">Password:</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-800 text-xs font-mono">{cred.password}</span>
                                  <CopyButton text={cred.password} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4" noValidate>
                      {/* Name */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            {...signupForm.register('name', { required: 'Full name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                            placeholder="Your full name"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${signupForm.formState.errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {signupForm.formState.errors.name && <p className="text-red-500 text-xs mt-1.5">{signupForm.formState.errors.name.message}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            {...signupForm.register('phone', { required: 'Phone is required', pattern: { value: /^[+\d\s-]{8,15}$/, message: 'Invalid phone number' } })}
                            placeholder="+91 98765 43210"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${signupForm.formState.errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {signupForm.formState.errors.phone && <p className="text-red-500 text-xs mt-1.5">{signupForm.formState.errors.phone.message}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Work Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            {...signupForm.register('email', {
                              required: 'Email is required',
                              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                            })}
                            placeholder="you@tourvista.in"
                            className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${signupForm.formState.errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                        </div>
                        {signupForm.formState.errors.email && <p className="text-red-500 text-xs mt-1.5">{signupForm.formState.errors.email.message}</p>}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Password <span className="text-red-500">*</span>
                        </label>
                        <p className="text-gray-400 text-xs mb-1.5">Min 8 characters with a number and special character</p>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPass ? 'text' : 'password'}
                            {...signupForm.register('password', {
                              required: 'Password is required',
                              minLength: { value: 8, message: 'Minimum 8 characters' },
                              pattern: { value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/, message: 'Must include a number and special character' },
                            })}
                            placeholder="Create a strong password"
                            className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${signupForm.formState.errors.password ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {signupForm.formState.errors.password && <p className="text-red-500 text-xs mt-1.5">{signupForm.formState.errors.password.message}</p>}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={showConfirmPass ? 'text' : 'password'}
                            {...signupForm.register('confirmPassword', { required: 'Please confirm your password' })}
                            placeholder="Repeat your password"
                            className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all ${signupForm.formState.errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                          />
                          <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                            {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {signupForm.formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5">{signupForm.formState.errors.confirmPassword.message}</p>}
                      </div>

                      {/* Terms */}
                      <div>
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            {...signupForm.register('terms', { required: 'You must accept the terms' })}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-300 mt-0.5 shrink-0"
                          />
                          <span className="text-sm text-gray-600">
                            I agree to TourVista's{' '}
                            <a href="#" className="text-primary-500 hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>
                          </span>
                        </label>
                        {signupForm.formState.errors.terms && <p className="text-red-500 text-xs mt-1.5">{signupForm.formState.errors.terms.message}</p>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={signupForm.formState.isSubmitting}
                        className="w-full btn-primary py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        style={{ minHeight: '52px' }}
                      >
                        {signupForm.formState.isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Creating account...
                          </>
                        ) : 'Create Admin Account'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}