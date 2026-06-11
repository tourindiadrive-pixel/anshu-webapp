import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, MapPin, Mail, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Enquiry } from '../types';
import DesignUploader from './DesignUploader';

interface ContactProps {
  onEnquirySubmitted: (enquiry: Enquiry) => void;
}

export default function Contact({ onEnquirySubmitted }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    city: '',
    serviceType: '',
    budgetRange: '',
    message: ''
  });

  const [uploadedDesign, setUploadedDesign] = useState<{
    name: string;
    size: string;
    type: string;
    previewUrl?: string;
  } | null>(null);

  const [errors, setErrors] = useState<Partial<typeof formState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    const handleModalFile = (e: any) => {
      if (e.detail) {
        setUploadedDesign(e.detail);
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
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(formState.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number (10+ digits)';
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

    // Simulate luxury API response / local persistent synchronization
    setTimeout(() => {
      const newEnquiry: Enquiry = {
        id: Math.random().toString(36).substring(2, 11),
        name: formState.name,
        phone: formState.phone,
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
        uploadedFile: uploadedDesign || undefined
      };

      // callback to applet state
      onEnquirySubmitted(newEnquiry);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setUploadedDesign(null);
      
      // Reset form variables
      setFormState({
        name: '',
        phone: '',
        city: '',
        serviceType: '',
        budgetRange: '',
        message: ''
      });

      // Clear success screen after a couple of seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
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
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-gold-400 mb-4 animate-bounce" />
                    <h4 className="text-white font-display text-2xl font-bold tracking-wide">
                      Enquiry Submitted Successfully
                    </h4>
                    <p className="text-neutral-400 font-light text-sm max-w-sm mt-2 leading-relaxed">
                      Our Senior Brand Manager is compiling your response now. We will call you on your specified phone number within 2 hours.
                    </p>
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
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="e.g. 99123 45678"
                          className={`w-full bg-neutral-950 border rounded-xl px-4.5 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none transition-all ${
                            errors.phone 
                              ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'border-white/10 focus:border-gold-500 focus:shadow-[0_0_15px_rgba(217,134,157,0.25)]'
                          }`}
                        />
                        {errors.phone && (
                          <span className="flex items-center text-xs text-red-400 mt-1.5 font-mono">
                            <AlertCircle className="w-3.5 h-3.5 mr-1" />
                            {errors.phone}
                          </span>
                        )}
                      </div>
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
                        Reference Artwork & Vector Files (.AI, .EPS, .PDF)
                      </label>
                      <DesignUploader 
                        selectedFile={uploadedDesign}
                        onFileSelect={setUploadedDesign}
                        className="w-full"
                      />
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
  );
}
