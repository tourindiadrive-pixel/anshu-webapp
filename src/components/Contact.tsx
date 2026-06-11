import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, MapPin, Mail, Sparkles, CheckCircle2, AlertCircle, Shield, Eye, ArrowDown, Link2, Globe, Instagram, Facebook, X, Copy, Check } from 'lucide-react';
import { Enquiry, UploadedFileInfo } from '../types';
import DesignUploader from './DesignUploader';

interface ContactProps {
  onEnquirySubmitted: (enquiry: Enquiry) => void;
  isAdmin?: boolean;
}

export default function Contact({ onEnquirySubmitted, isAdmin }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    serviceType: '',
    budgetRange: '',
    message: '',
    imageUrl: '',
    facebookLink: '',
    instagramLink: '',
    otherLink: ''
  });

  const [uploadedDesigns, setUploadedDesigns] = useState<UploadedFileInfo[]>([]);

  const [errors, setErrors] = useState<Partial<typeof formState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState('');
  const [submittedData, setSubmittedData] = useState<Enquiry | null>(null);
  
  // Real-time animation stages for notification dashboard simulation
  const [notificationStatus, setNotificationStatus] = useState({
    email: 'idle', // 'idle' | 'preparing' | 'sending' | 'delivered'
    whatsapp: 'idle', // 'idle' | 'preparing' | 'sending' | 'delivered'
  });
  const [previewEmailModal, setPreviewEmailModal] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  React.useEffect(() => {
    const handleModalFile = (e: any) => {
      if (e.detail) {
        setUploadedDesigns(prev => [...prev, e.detail].slice(0, 5));
      }
    };
    window.addEventListener('modal-file-uploaded', handleModalFile);
    return () => {
      window.removeEventListener('modal-file-uploaded', handleModalFile);
    };
  }, []);

  const budgetOptions = [
    '₹5,000 - ₹15,000 (Standard)',
    '₹15,000 - ₹50,000 (Premium)',
    '₹50,000 - ₹2,000,000 (Elite Commercial)',
    'Unspecified / Flex Budget'
  ];

  const serviceOptions = [
    'UV Printing',
    'LED Signage',
    'Custom Apparel',
    'Laser Marking',
    'Corporate Gifting',
    'Trophies & Awards',
    'Digital Printing',
    'Custom Packaging',
    'ID & Lanyards',
    'Home Decor',
    'Wedding Stationery',
    'Photo Gifts',
    'Skins & Wraps',
    'Canvas Art',
    'Restaurant Branding'
  ];

  const validate = () => {
    const tempErrors: Partial<typeof formState> = {};
    if (!formState.name.trim()) tempErrors.name = 'Full name is required';
    if (!formState.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formState.phone.trim())) {
      tempErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formState.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formState.city.trim()) tempErrors.city = 'City name is required';
    if (!formState.serviceType) tempErrors.serviceType = 'Please select a service category';
    if (!formState.budgetRange) tempErrors.budgetRange = 'Please select your estimated budget layout';
    if (!formState.message.trim()) tempErrors.message = 'Please share brief requirements';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear singular error dynamically on input
    if (errors[name as keyof typeof formState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const generatedId = "AP-2026-" + Math.random().toString(36).substring(2, 6).toUpperCase();

    // Simulate luxury API response / local persistent synchronization
    setTimeout(() => {
      const newEnquiry: Enquiry = {
        id: generatedId,
        name: formState.name,
        phone: `+91 ${formState.phone.trim()}`,
        email: formState.email.trim(),
        city: formState.city,
        serviceType: formState.serviceType,
        budgetRange: formState.budgetRange,
        message: formState.message,
        timestamp: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'New',
        uploadedFile: uploadedDesigns[0] || undefined, // keeps backward compatibility for single file lookups
        uploadedFiles: uploadedDesigns, // keeps up to 5 files
        imageUrl: formState.imageUrl.trim() || undefined,
        facebookLink: formState.facebookLink.trim() || undefined,
        instagramLink: formState.instagramLink.trim() || undefined,
        otherLink: formState.otherLink.trim() || undefined
      };

      // callback to applet state
      onEnquirySubmitted(newEnquiry);
      
      setLastSubmittedId(generatedId);
      setSubmittedData(newEnquiry);
      setIsSubmitting(false);
      setIsSuccess(true);
      setUploadedDesigns([]);

      // Start real-time simulated notification updates
      setNotificationStatus({ email: 'preparing', whatsapp: 'preparing' });
      
      setTimeout(() => {
        setNotificationStatus(prev => ({ ...prev, email: 'sending' }));
      }, 1000);

      setTimeout(() => {
        setNotificationStatus(prev => ({ ...prev, email: 'delivered', whatsapp: 'sending' }));
      }, 2400);

      setTimeout(() => {
        setNotificationStatus(prev => ({ ...prev, whatsapp: 'delivered' }));
      }, 3850);
      
      // Reset form variables
      setFormState({
        name: '',
        phone: '',
        email: '',
        city: '',
        serviceType: '',
        budgetRange: '',
        message: '',
        imageUrl: '',
        facebookLink: '',
        instagramLink: '',
        otherLink: ''
      });
    }, 1500);
  };

  return (
    <>
      <section id="contact" className="relative py-24 sm:py-32 bg-neutral-900/10 overflow-hidden border-t border-white/5">
      {/* Decorative luxury sphere spots */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Block: Contact Details */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-28">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span className="text-xs font-mono text-gold-400 uppercase tracking-[0.25em] font-semibold">
                  Personal Consultation
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight leading-tight">
                Let's Print <br />
                <span className="font-script text-3xl sm:text-5xl text-gold-400 block mt-2 tracking-normal normal-case text-glow">"Your Masterpiece"</span>
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm pt-2">
                Tell us about your brand vision, structural signage layout, or gifting project. Get a complete custom quote within 24 hours.
              </p>
            </div>

            {/* Direct Contact cards */}
            <div className="space-y-6 pt-2">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center text-gold-400 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm tracking-wide">Corporate Office</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Anshu Prints, G-15 Industrial Area, Sector 3, <br />
                    New Delhi, Pin 110015, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center text-gold-400 shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm tracking-wide">Call / WhatsApp</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    +91 99999 99999 / +91 98888 88888
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center text-gold-400 shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm tracking-wide">Official Email</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    contact@anshuprints.com / design@anshuprints.com
                  </p>
                </div>
              </div>
            </div>

            {/* Static Luxury Map Frame */}
            <div className="relative rounded-2xl border border-white/5 bg-neutral-950 overflow-hidden h-44 shadow-lg group">
              <div className="absolute inset-0 bg-[#0d0d0d] opacity-90 group-hover:opacity-85 transition-opacity" />
              {/* Faux map contours drawing */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%),linear-gradient(#151515_1px,transparent_1px),linear-gradient(90deg,#151515_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="w-3 h-3 rounded-full bg-gold-400 animate-ping absolute" />
                <span className="w-3 h-3 rounded-full bg-gold-500 relative mb-3 hover:scale-110 cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                <h5 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                  DEHLI CENTRAL HUB
                </h5>
                <p className="text-[10px] text-neutral-500 font-mono mt-0.5 uppercase tracking-wide">
                  Dispatching to 28 states & 8 UTs successfully
                </p>
              </div>
            </div>
          </div>

          {/* Right Block: Luxury Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0f0f12] p-8 border border-[#d9869d]/20 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#d9869d] via-[#d9869d]/50 to-[#d9869d]" />

              <h3 className="font-display text-2xl font-bold tracking-wide text-white mb-2">
                PROJECT ENQUIRY
              </h3>
              <p className="text-xs text-neutral-400 font-mono max-w-md uppercase tracking-wider mb-8">
                Submit details representing your specific needs
              </p>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-gold-400 mb-4 animate-bounce" />
                    <h4 className="text-white font-display text-2xl font-bold tracking-wide">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-neutral-400 font-light text-sm max-w-sm mt-2 leading-relaxed">
                      Our Senior Brand Manager is compiling your response now. We will call you on your specified phone number within 2 hours.
                    </p>

                    {/* Highly requested bilingual Guide Card showing Admin exactly where to find the enquiries */}
                    <div className="mt-8 p-5 rounded-2xl border border-[#ff4773]/30 bg-black/60 text-left space-y-4 w-full max-w-lg shadow-[0_10px_30px_rgba(255,71,115,0.05)] backdrop-blur-md">
                      <div className="flex items-center space-x-2.5 text-[#ff4773]">
                        <Shield className="w-4.5 h-4.5" />
                        <span className="text-[11px] font-mono font-black uppercase tracking-widest">
                          Admin Guide (इन्क्वायरी देखने के निर्देश)
                        </span>
                      </div>
                      
                      <div className="text-xs space-y-3.5 text-neutral-300 leading-relaxed font-sans">
                        <div className="space-y-1">
                          <p className="font-extrabold text-[#ffd744] flex items-center gap-1">
                            <span>🇮🇳</span> हिंदी में देखें (Where to see in Hindi):
                          </p>
                          <p className="text-[11px] text-neutral-300">
                            भेजी गई इन्क्वायरी देखने के लिए ऊपर दाएँ कोने (top-right) में <span className="text-white font-bold bg-neutral-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px]">USER VIEW</span> बटन पर क्लिक करके <span className="text-[#ff4773] font-bold">ADMIN ACTIVE</span> चालू करें:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-neutral-400 text-[10.5px] pl-1">
                            <li>ऊपर मेनू बार में <span className="text-white font-bold">"VIEW LEADS"</span> बटन आ जाएगा, उसपर क्लिक करें।</li>
                            <li>या फिर पेज के सबसे नीचे स्क्रॉल करें, वहाँ <span className="text-[#ff4773] font-bold">"ADMIN CONTROL CENTER"</span> लाइव दिख जाएगा!</li>
                          </ul>
                        </div>
                        
                        <div className="h-[1px] bg-white/10 my-2" />
                        
                        <div className="space-y-1">
                          <p className="font-extrabold text-[#ffd744] flex items-center gap-1">
                            <span>🇬🇧</span> English Guidance:
                          </p>
                          <p className="text-[11px] text-neutral-300">
                            Simply switch the <span className="text-white font-bold bg-neutral-900 border border-white/10 px-1.5 py-0.5 rounded text-[10px]">USER VIEW</span> button to <span className="text-[#ff4773] font-bold">ADMIN ACTIVE</span> in the top-right navbar to unlock the Admin views:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-neutral-400 text-[10.5px] pl-1">
                            <li>Click the <span className="text-white font-bold">"VIEW LEADS"</span> menu item in top header to open enquiries stream.</li>
                            <li>Or scroll directly to the bottom page to view the <span className="text-[#ff4773] font-bold">"ADMIN CONTROL CENTER"</span> dashboard.</li>
                          </ul>
                        </div>
                      </div>

                      {/* Interactive Button to automatically handle roles & scroll to dashboard */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isAdmin) {
                              // If not admin, activate from custom event or tell them we'll scroll
                              window.dispatchEvent(new CustomEvent('trigger-admin-auto-toggle'));
                            }
                            
                            // Let's scroll to the dashboard after a short delay so Admin mode state mounts it
                            setTimeout(() => {
                              const el = document.getElementById('admin-crm-dashboard');
                              if (el) {
                                el.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                // If not mounted yet, scroll to the bottom of the page
                                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                              }
                            }, 300);
                          }}
                          className="w-full py-2.5 bg-gradient-to-r from-[#d9869d]/20 to-[#ff4773]/20 hover:from-[#d9869d]/30 hover:to-[#ff4773]/30 border border-[#ff4773]/40 hover:border-[#ff4773] text-[#ff4773] text-xs font-mono font-bold uppercase rounded-xl tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,71,115,0.1)] hover:shadow-[0_0_20px_rgba(255,71,115,0.2)]"
                        >
                          <Eye className="w-4 h-4 animate-pulse" />
                          <span>{isAdmin ? "SCROLL TO ADMIN DASHBOARD" : "AUTO-ACTIVATE ADMIN PORTAL & VIEW"}</span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-xs font-mono text-gold-400 uppercase tracking-widest cursor-pointer underline hover:text-white"
                    >
                      SUBMIT ANOTHER REQUEST
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="relative group">
                        <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="e.g. Rohan Sharma"
                          className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all ${
                            errors.name 
                              ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-gold-500 focus:shadow-[0_0_15px_rgba(217,134,157,0.25)]'
                          }`}
                        />
                        {errors.name && (
                          <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Phone input */}
                      <div className="relative group">
                        <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                          WhatsApp Mobile Number
                        </label>
                        <div className={`flex rounded-xl bg-neutral-950 border overflow-hidden transition-all focus-within:border-gold-500 focus-within:shadow-[0_0_15px_rgba(217,134,157,0.25)] ${
                          errors.phone ? 'border-red-500/50' : 'border-white/10'
                        }`}>
                          <span className="flex items-center justify-center bg-neutral-900 border-r border-white/10 px-4 text-sm font-mono text-[#ffd744] font-bold select-none">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formState.phone}
                            onChange={(e) => {
                              const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
                              if (numbersOnly.length <= 10) {
                                e.target.value = numbersOnly;
                                handleChange(e);
                              }
                            }}
                            placeholder="e.g. 9912345678"
                            className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none"
                          />
                        </div>
                        {errors.phone && (
                          <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" />
                            {errors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="e.g. rohan.sharma@example.com"
                        className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                            : 'border-white/10 focus:border-gold-500 focus:shadow-[0_0_15px_rgba(217,134,157,0.25)]'
                        }`}
                      />
                      {errors.email && (
                        <span className="flex items-center text-xs text-red-450 mt-1.5 font-mono font-bold">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 text-red-500" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* City Input */}
                      <div className="relative group">
                        <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formState.city}
                          onChange={handleChange}
                          placeholder="e.g. Bangalore"
                          className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all ${
                            errors.city 
                              ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-gold-500 focus:shadow-[0_0_15px_rgba(217,134,157,0.25)]'
                          }`}
                        />
                        {errors.city && (
                          <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" />
                            {errors.city}
                          </span>
                        )}
                      </div>

                      {/* Service Type Dropdown */}
                      <div className="relative group flex flex-col">
                        <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                          Service Type
                        </label>
                        <select
                          name="serviceType"
                          value={formState.serviceType}
                          onChange={handleChange}
                          className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-neutral-300 focus:outline-none transition-all cursor-pointer ${
                            errors.serviceType 
                              ? 'border-red-500/50 focus:border-red-500' 
                              : 'border-white/10 focus:border-gold-500'
                          }`}
                        >
                          <option value="">-- Choose Category --</option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-neutral-950 text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.serviceType && (
                          <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" />
                            {errors.serviceType}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Budget Range options custom layout select */}
                    <div className="relative group flex flex-col">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                        Expected Budget Layout
                      </label>
                      <select
                        name="budgetRange"
                        value={formState.budgetRange}
                        onChange={handleChange}
                        className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-neutral-300 focus:outline-none transition-all cursor-pointer ${
                          errors.budgetRange 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-white/10 focus:border-gold-500'
                        }`}
                      >
                        <option value="">-- Choose Budget Range --</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-neutral-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.budgetRange && (
                        <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.budgetRange}
                        </span>
                      )}
                    </div>

                    {/* Message description box */}
                    <div className="relative group">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                        Project Brief Requirements
                      </label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Share your custom dimensions, material choice, quantity needed, or design guidelines..."
                        className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all ${
                          errors.message 
                            ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                            : 'border-white/10 focus:border-gold-500 focus:shadow-[0_0_15px_rgba(217,134,157,0.25)]'
                        }`}
                      />
                      {errors.message && (
                        <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Interactive B2B Design Uploader Field */}
                    <div className="relative group">
                      <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-medium">
                        Reference Artwork & Vector Files (.AI, .EPS, .PDF) (Max 5 Files, Max 5MB each)
                      </label>
                      <DesignUploader 
                        selectedFiles={uploadedDesigns}
                        onFilesSelect={setUploadedDesigns}
                        className="w-full"
                      />
                    </div>

                    {/* Collapsible Design / Portfolio / Social Link Details */}
                    <div className="border border-white/5 rounded-xl bg-neutral-950/40 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('social-inputs-panel');
                          if (el) {
                            el.classList.toggle('hidden');
                          }
                        }}
                        className="w-full px-4 py-3 bg-neutral-950 hover:bg-neutral-900 border-b border-white/5 flex items-center justify-between text-left transition-colors cursor-pointer text-xs font-mono font-bold tracking-wider text-[#d9869d]"
                      >
                        <span className="flex items-center gap-2">
                          <Link2 className="w-3.5 h-3.5 text-[#d9869d] animate-pulse" />
                          OR SHARE WEB DESIGN LINKS / SOCIAL LEADS (OPTIONAL)
                        </span>
                        <span className="text-[10px] text-neutral-500">TOGGLE OVERLAY ▾</span>
                      </button>
                      
                      <div id="social-inputs-panel" className="p-4 space-y-3.5 hidden bg-black/20">
                        <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                          Do you have your layout saved elsewhere? Paste links to images, PDFs, Facebook, or Instagram posts below:
                        </p>
                        
                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-mono text-neutral-450 uppercase tracking-wider block flex items-center gap-1.5">
                            <Globe className="w-3 h-3 text-sky-400" />
                            Direct Web Image URL
                          </label>
                          <input
                            type="url"
                            name="imageUrl"
                            value={formState.imageUrl}
                            onChange={handleChange}
                            placeholder="e.g. https://imgur.com/my-graphic.jpg"
                            className="w-full bg-neutral-950 border border-white/5 focus:border-[#d9869d] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none transition-all font-sans"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-mono text-neutral-450 uppercase tracking-wider block flex items-center gap-1.5">
                            <Facebook className="w-3 h-3 text-[#1877F2]" />
                            Facebook Post or Profile Link
                          </label>
                          <input
                            type="url"
                            name="facebookLink"
                            value={formState.facebookLink}
                            onChange={handleChange}
                            placeholder="e.g. https://facebook.com/mybrand/posts/101"
                            className="w-full bg-neutral-950 border border-white/5 focus:border-[#d9869d] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none transition-all font-sans"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-mono text-neutral-450 uppercase tracking-wider block flex items-center gap-1.5">
                            <Instagram className="w-3 h-3 text-[#E1306C]" />
                            Instagram Design Link
                          </label>
                          <input
                            type="url"
                            name="instagramLink"
                            value={formState.instagramLink}
                            onChange={handleChange}
                            placeholder="e.g. https://instagram.com/p/artwork-signage"
                            className="w-full bg-neutral-950 border border-white/5 focus:border-[#d9869d] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none transition-all font-sans"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[10px] font-mono text-neutral-450 uppercase tracking-wider block flex items-center gap-1.5">
                            <Link2 className="w-3 h-3 text-emerald-450" />
                            Other Asset Link (PDF, Google Drive folder)
                          </label>
                          <input
                            type="url"
                            name="otherLink"
                            value={formState.otherLink}
                            onChange={handleChange}
                            placeholder="e.g. https://drive.google.com/drive/folders/abc"
                            className="w-full bg-neutral-950 border border-white/5 focus:border-[#d9869d] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none transition-all font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit action button with hover neon glow */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gold-500 text-gold-500 bg-transparent font-semibold text-sm tracking-widest uppercase cursor-pointer hover:bg-gold-500 hover:text-black hover:shadow-[0_0_25px_rgba(217,134,157,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                      id="contact-submit"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-neutral-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Synchronizing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span>Send Request</span>
                          <Send className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>

    {/* Dynamic Confirmation Modal Overlay */}
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 170 }}
            className="w-full max-w-xl bg-neutral-950 border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(217,134,157,0.15)] relative p-6 sm:p-8 space-y-6 text-white"
          >
            {/* Gold header accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 via-pink-500 to-[#d9869d]" />

            <button
              type="button"
              onClick={() => setIsSuccess(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-neutral-900 border border-white/10 p-2 rounded-full cursor-pointer hover:scale-105 transition-transform"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
                <CheckCircle2 className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white uppercase font-sans">
                Specifications Secured
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-mono">
                Anshu Luxury Print Studio Registry
              </p>
            </div>

            {/* Unique Enquiry ID box */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center space-y-2 relative group-hover:border-[#d9869d]/40 transition-colors">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-[0.25em]">ENQUIRY REFERENCE ID</span>
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#ffd744] tracking-widest">
                  {lastSubmittedId}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(lastSubmittedId);
                    setCopiedId(true);
                    setTimeout(() => setCopiedId(false), 2000);
                  }}
                  className="p-1 px-2.5 bg-neutral-950 hover:bg-neutral-800 border border-white/10 rounded-lg text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer select-none"
                  title="Copy ID to Clipboard"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <span className="text-[10px] text-neutral-400 text-center font-sans">
                Save this ID to refer directly to your order specifications.
              </span>
            </div>

            {/* Real-time Simulated Delivery Dashboard Console */}
            <div className="bg-black/50 border border-white/5 rounded-2xl p-5 space-y-4 font-mono text-[11px]">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[#d9869d] font-bold">AUTOMATED NOTIFICATION PIPELINE</span>
                <span className="text-[10px] text-neutral-500">REALTIME DISPATCH FEED</span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                {/* Step 1: Database ingestion */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/25 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0 text-xs">
                    ✓
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-[12px]">Database Sync & Ingestion</p>
                    <p className="text-[10.5px] text-neutral-400 font-mono">Status: Securely logged under Enquiry ID {lastSubmittedId}</p>
                  </div>
                </div>

                {/* Step 2: Immediate Confirmation Email */}
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-xs ${
                    notificationStatus.email === 'delivered'
                      ? 'bg-emerald-500/25 border-emerald-500 text-emerald-400'
                      : notificationStatus.email === 'sending' || notificationStatus.email === 'preparing'
                      ? 'bg-amber-500/25 border-amber-500 text-amber-400 animate-pulse'
                      : 'bg-neutral-900 border-white/20 text-neutral-500'
                  }`}>
                    {notificationStatus.email === 'delivered' ? '✓' : '•'}
                  </div>
                  <div className="space-y-1 flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white text-[12px]">Client Confirmation Mail</p>
                      <span className="font-mono text-[10px] uppercase">
                        {notificationStatus.email === 'delivered' && <span className="text-emerald-400">Delivered</span>}
                        {notificationStatus.email === 'sending' && <span className="text-amber-400 animate-pulse">Sending...</span>}
                        {notificationStatus.email === 'preparing' && <span className="text-neutral-500">Preparing Payload...</span>}
                        {notificationStatus.email === 'idle' && <span className="text-neutral-600">Pending</span>}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-neutral-400 font-mono">
                      {notificationStatus.email === 'delivered' && (
                        <span>⚜️ Premium format successfully routed to customer address: <strong className="text-neutral-300">{submittedData?.email}</strong></span>
                      )}
                      {notificationStatus.email === 'sending' && <span>Connecting SMTP Secure Node over SSL/TLS...</span>}
                      {notificationStatus.email === 'preparing' && <span>Compiling template parameters and layout margins...</span>}
                      {notificationStatus.email === 'idle' && <span>Waiting for preceding sync task...</span>}
                    </p>

                    {/* Preview Button */}
                    {notificationStatus.email === 'delivered' && (
                      <button
                        type="button"
                        onClick={() => setPreviewEmailModal(true)}
                        className="mt-2 text-[10px] font-mono text-[#ff4773] hover:underline bg-[#ff4773]/10 hover:bg-[#ff4773]/20 px-2.5 py-1 rounded cursor-pointer border border-[#ff4773]/30 flex items-center gap-1"
                      >
                        👁️ View Sent Premium Email Template
                      </button>
                    )}
                  </div>
                </div>

                {/* Step 3: SMS/WhatsApp Fallback Notification */}
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-xs ${
                    notificationStatus.whatsapp === 'delivered'
                      ? 'bg-emerald-500/25 border-emerald-500 text-emerald-400'
                      : notificationStatus.whatsapp === 'sending'
                      ? 'bg-amber-500/25 border-amber-500 text-amber-400 animate-pulse'
                      : 'bg-neutral-900 border-white/20 text-neutral-500'
                  }`}>
                    {notificationStatus.whatsapp === 'delivered' ? '✓' : '•'}
                  </div>
                  <div className="space-y-1 flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white text-[12px]">Instant SMS/WhatsApp Fallback System</p>
                      <span className="font-mono text-[10px] uppercase">
                        {notificationStatus.whatsapp === 'delivered' && <span className="text-emerald-400">Delivered</span>}
                        {notificationStatus.whatsapp === 'sending' && <span className="text-amber-400 animate-pulse">Pushing...</span>}
                        {notificationStatus.whatsapp === 'preparing' && <span className="text-neutral-500">Queued</span>}
                        {notificationStatus.whatsapp === 'idle' && <span className="text-neutral-600">Pending</span>}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-neutral-400 font-mono">
                      {notificationStatus.whatsapp === 'delivered' && (
                        <span>Instant confirmation dispatched to customer's mobile: <strong className="text-neutral-300">{submittedData?.phone}</strong></span>
                      )}
                      {notificationStatus.whatsapp === 'sending' && <span>Contacting cellular gateway triggers...</span>}
                      {notificationStatus.whatsapp === 'preparing' && <span>Stamping ticket registry numbers into fallback payload...</span>}
                      {notificationStatus.whatsapp === 'idle' && <span>Waiting for email gateway handshake...</span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Faux Direct WhatsApp interaction */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const textContent = `Hello Anshu prints! I just submitted an artwork enquiry on your Luxury Print Studio. My Enquiry ID is: ${lastSubmittedId}. Please review my requirements matching service category: ${submittedData?.serviceType}.`;
                  const waUrl = `https://api.whatsapp.com/send?phone=${submittedData?.phone ? submittedData.phone.replace(/\s+/g, '') : '+919999999999'}&text=${encodeURIComponent(textContent)}`;
                  window.open(waUrl, '_blank');
                }}
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_5px_15px_rgba(16,185,129,0.15)] hover:shadow-[0_5px_20px_rgba(16,185,129,0.25)]"
              >
                💬 Open WhatsApp Chat
              </button>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                ← Exit & Back to Studio
              </button>
            </div>

            {/* Tiny Admin instruction banner inside Success modal */}
            {isAdmin && (
              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-500 text-center">
                🔐 Administrator: Lead has been parsed & saved to the CRM pipeline automatically.
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Premium Sent Email Mockup Overlay Drawer */}
    <AnimatePresence>
      {previewEmailModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="w-full max-w-xl bg-neutral-900 border border-[#ffd744]/30 rounded-2xl overflow-hidden shadow-2xl relative text-white"
          >
            {/* Browser window controls mockup */}
            <div className="bg-neutral-950 px-4 py-3 border-b border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-505/75 shrink-0 block bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-505/75 shrink-0 block bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-505/75 shrink-0 block bg-green-500" />
              </div>
              <span>Secured Email Client Rendering</span>
              <button
                type="button"
                onClick={() => setPreviewEmailModal(false)}
                className="text-neutral-500 hover:text-white bg-neutral-900 border border-white/10 p-1.5 rounded-md cursor-pointer transition-colors"
              >
                ✕ Close Preview
              </button>
            </div>

            {/* Email Envelope Header */}
            <div className="bg-neutral-950 p-4 border-b border-white/5 text-xs text-neutral-400 font-mono space-y-1.5 text-left">
              <div>
                <strong className="text-white font-mono">From:</strong> design@anshuprints.com <span className="opacity-55">&lt;Anshu Luxury Print Studio Automated Gateway&gt;</span>
              </div>
              <div>
                <strong className="text-white font-mono">To:</strong> {submittedData?.email}
              </div>
              <div>
                <strong className="text-white font-mono">Subject:</strong> ⚜️ Confirmation: Your Design Enquiry Received | Anshu Luxury Print Studio
              </div>
            </div>

            {/* Actual HTML Email Body Template Preview */}
            <div className="p-6 bg-stone-950 border-t border-white/5 max-h-[60vh] overflow-y-auto space-y-6 text-left">
              
              {/* Premium Banner */}
              <div className="border border-[#ffd744]/20 p-6 text-center space-y-1.5 rounded bg-gradient-to-b from-[#ffd744]/5 to-transparent">
                <div className="text-xs tracking-[0.3em] uppercase text-[#ffd744] font-semibold font-sans">
                  ANSHU LUXURY PRINT STUDIO
                </div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white italic">
                  "Crafting Your Masterpiece"
                </h1>
              </div>

              <div className="text-xs sm:text-sm text-neutral-300 space-y-4 font-sans leading-relaxed">
                <p>Dear <strong className="text-white">{submittedData?.name}</strong>,</p>
                
                <p>
                  Thank you for conveying your bespoke design specifications to our central planning studio in Delhi. 
                  We are pleased to notify you that your proposal brief has been successfully registered under our luxury design protocol.
                </p>

                <p className="border-l-2 border-[#ffd744] pl-4 italic text-[#ffd744] my-4 font-serif">
                  "Your vision, combined with our state-of-the-art print engineering, is guaranteed to produce an unparalleled structural marvel."
                </p>

                {/* Specification Table in High-End grid */}
                <div className="bg-neutral-900/80 border border-white/10 rounded-lg p-4 space-y-2.5 font-mono text-[11px] text-neutral-450">
                  <div className="border-b border-white/5 pb-1.5 text-[#ffd744] font-bold text-xs">
                    SPECIFICATION TICKET SUMMARY
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <strong>Enquiry Reference:</strong>
                    </div>
                    <div className="text-white">{lastSubmittedId}</div>

                    <div>
                      <strong>Selected Service:</strong>
                    </div>
                    <div className="text-white">{submittedData?.serviceType}</div>

                    <div>
                      <strong>Allocated Budget:</strong>
                    </div>
                    <div className="text-white">{submittedData?.budgetRange}</div>

                    <div>
                      <strong>Destination City:</strong>
                    </div>
                    <div className="text-white">{submittedData?.city}</div>

                    <div>
                      <strong>Contact Phone:</strong>
                    </div>
                    <div className="text-white">{submittedData?.phone}</div>

                    <div>
                      <strong>Contact Email:</strong>
                    </div>
                    <div className="text-white">{submittedData?.email}</div>
                  </div>
                  
                  {submittedData?.message && (
                    <div className="border-t border-white/5 pt-2 mt-2">
                      <strong className="block text-[#ffd744] mb-1">Brief Requirements:</strong>
                      <p className="text-white italic whitespace-pre-wrap font-sans text-xs">{submittedData.message}</p>
                    </div>
                  )}
                </div>

                <p>
                  <strong>What happens next?</strong><br />
                  At Anshu Luxury Print Studio, we prioritize responsive hospitality:
                </p>
                
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-400 text-xs font-sans">
                  <li>Our Senior Account Consultant is reviewing your vector layout or description right now.</li>
                  <li>A customized quote matching your precise dimensional criteria will be compiled.</li>
                  <li>You will receive a call or WhatsApp on your registered phone number <strong className="text-white">{submittedData?.phone}</strong> within <strong>24 hours</strong>.</li>
                </ul>

                <p className="pt-4 border-t border-white/5 text-[11px] text-neutral-500 font-sans italic text-center">
                  This is an automated delivery receipt dispatched immediately upon reservation logging. No reply is necessary.
                </p>
              </div>
            </div>
            
            {/* Footer close option */}
            <div className="bg-neutral-950 p-4 border-t border-white/5 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewEmailModal(false)}
                className="px-5 py-2 bg-[#ffd744] hover:bg-[#ffd744]/90 text-black font-semibold text-xs font-sans rounded-lg cursor-pointer transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
