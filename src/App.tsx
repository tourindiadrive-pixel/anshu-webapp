/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import GalleryModal from './components/GalleryModal';
import TrustedBy from './components/TrustedBy';
import Testimonials from './components/Testimonials';
import TrustPortfolio from './components/TrustPortfolio';
import Process from './components/Process';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AIVoiceSupport from './components/AIVoiceSupport';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import EnquiriesList from './components/EnquiriesList';
import BottomNavBar from './components/BottomNavBar';
import AdminDashboardSection from './components/AdminDashboardSection';
import { ServiceItem, Enquiry } from './types';

export default function App() {
  const [activeGalleryService, setActiveGalleryService] = useState<ServiceItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    // Attempt to load from localStorage, otherwise pre-seed high quality luxury leads
    const saved = localStorage.getItem('anshu_enquiries_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved enquiries:', err);
      }
    }
    
    // Default luxury seed records
    const initialSeed: Enquiry[] = [
      {
        id: 'seed-1',
        name: 'Vardhaman Developers',
        phone: '99203 11456',
        city: 'Mumbai',
        serviceType: 'LED Signage',
        budgetRange: '₹50,000 - ₹2,000,000 (Elite Commercial)',
        message: 'We require a premium gold stainless steel backlit LED sign board for our luxurious commercial lobby. High weatherproof coating is preferred.',
        timestamp: '09 Jun 2026, 04:12 PM',
        status: 'In Progress'
      },
      {
        id: 'seed-2',
        name: 'Celeste Cosmetics',
        phone: '98114 99042',
        city: 'New Delhi',
        serviceType: 'Custom Packaging',
        budgetRange: '₹15,000 - ₹50,000 (Premium)',
        message: 'Looking to construct 2,500 matte velvet textured perfume cartons carrying embossed hot-stamped gold foil monograms.',
        timestamp: '09 Jun 2026, 11:24 AM',
        status: 'Contacted'
      }
    ];
    
    localStorage.setItem('anshu_enquiries_v1', JSON.stringify(initialSeed));
    return initialSeed;
  });

  // Keep localStorage perfectly in sync
  useEffect(() => {
    localStorage.setItem('anshu_enquiries_v1', JSON.stringify(enquiries));
  }, [enquiries]);

  // Handle incoming new custom enquiries
  const handleEnquirySubmitted = (newEnquiry: Enquiry) => {
    setEnquiries((prev) => [newEnquiry, ...prev]);
  };

  // Delete an enquiry
  const handleDeleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // Update status (e.g. New -> Contacted -> In Progress)
  const handleUpdateStatus = (id: string, newStatus: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // State to check and configure administrator status dynamically
  const [isAdmin, setIsAdmin] = React.useState<boolean>(() => {
    const saved = localStorage.getItem('anshu_is_admin');
    return saved === 'true';
  });

  const handleToggleAdmin = () => {
    setIsAdmin((prev) => {
      const next = !prev;
      localStorage.setItem('anshu_is_admin', String(next));
      return next;
    });
  };

  // Open the gallery modal for a specific chosen service card
  const handleSelectService = (service: ServiceItem) => {
    setActiveGalleryService(service);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between selection:bg-gold-500 selection:text-neutral-950 font-sans" id="approot">
      
      {/* Decorative vertical lines on frame margin edge for modern luxury aesthetic */}
      <div className="fixed left-14 top-0 bottom-0 w-[1px] bg-white/[0.02] z-30 pointer-events-none hidden xl:block" />
      <div className="fixed right-14 top-0 bottom-0 w-[1px] bg-white/[0.02] z-30 pointer-events-none hidden xl:block" />

      {/* Header and navigation bar */}
      <Navbar 
        onOpenEnquiries={() => setIsEnquiriesOpen(true)} 
        enquiriesCount={enquiries.length} 
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Sub sections components division */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero />

        {/* Elegant Thin Gold Rose Separator */}
        <div className="relative w-full flex items-center justify-center py-0 my-0 pointer-events-none select-none z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 via-[#d9869d]/35 via-[#d4af37]/25 to-transparent" />
        </div>

        {/* Brand Continuous Scrolling Marquee */}
        <TrustedBy />

        {/* Who We Are: About Section */}
        <About />

        {/* Elegant Thin Gold Rose Separator */}
        <div className="relative w-full flex items-center justify-center py-0 my-0 pointer-events-none select-none z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 via-[#d9869d]/35 via-[#d4af37]/25 to-transparent" />
        </div>

        {/* Catalog: Services Grid */}
        <Services onSelectService={handleSelectService} />

        {/* Elegant Thin Gold Rose Separator */}
        <div className="relative w-full flex items-center justify-center py-0 my-0 pointer-events-none select-none z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 via-[#d9869d]/35 via-[#d4af37]/25 to-transparent" />
        </div>

        {/* Timeline Process: Build Flow */}
        <Process />

        {/* Elegant Thin Gold Rose Separator */}
        <div className="relative w-full flex items-center justify-center py-0 my-0 pointer-events-none select-none z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 via-[#d9869d]/35 via-[#d4af37]/25 to-transparent" />
        </div>

        {/* Client Testimonials */}
        <Testimonials />

        {/* Elegant Thin Gold Rose Separator */}
        <div className="relative w-full flex items-center justify-center py-0 my-0 pointer-events-none select-none z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 via-[#d9869d]/35 via-[#d4af37]/25 to-transparent" />
        </div>

        {/* High-Trust B2B Proof & Client Portfolio Grid */}
        <TrustPortfolio />

        {/* Elegant Thin Gold Rose Separator */}
        <div className="relative w-full flex items-center justify-center py-0 my-0 pointer-events-none select-none z-10">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/25 via-[#d9869d]/35 via-[#d4af37]/25 to-transparent" />
        </div>

        {/* Luxury contact enquiry panel */}
        <Contact onEnquirySubmitted={handleEnquirySubmitted} />

        {/* Dedicated Admin Dashboard CRM Panel — Protected to be visible ONLY to administrators */}
        {isAdmin && (
          <AdminDashboardSection 
            enquiries={enquiries}
            onDeleteEnquiry={handleDeleteEnquiry}
            onUpdateStatus={handleUpdateStatus}
            onToggleAdmin={handleToggleAdmin}
          />
        )}

      </main>

      {/* Footer block */}
      <div className="pb-16 md:pb-0" id="main-footer-wrapper">
        <Footer />
      </div>

      {/* Persistent Floating WhatsApp quickconnect */}
      <FloatingWhatsApp />

      {/* Aura AI Design Consulting with Voice and Chat support features */}
      <AIVoiceSupport />

      {/* Fixed Sticky Bottom Navigation Bar for Native PWA Mobile Experience */}
      <BottomNavBar />

      {/* Circular Gold Gradient Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Fullscreen Portfolio Masonry Showcases Gallery */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => {
          setIsGalleryOpen(false);
          setActiveGalleryService(null);
        }}
        service={activeGalleryService}
        isAdmin={isAdmin}
      />

      {/* Slide-out CRM Enquiries Monitor Panel — Protected to render only if isAdmin is true */}
      {isAdmin && (
        <EnquiriesList
          isOpen={isEnquiriesOpen}
          onClose={() => setIsEnquiriesOpen(false)}
          enquiries={enquiries}
          onDeleteEnquiry={handleDeleteEnquiry}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

    </div>
  );
}
