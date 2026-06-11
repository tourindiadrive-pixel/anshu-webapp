import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Trash2, 
  ClipboardList, 
  Calendar, 
  MessageSquare, 
  PhoneCall, 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp, 
  Clock, 
  Briefcase, 
  CheckCircle,
  FileCheck,
  Activity,
  AlertCircle,
  Link2,
  Globe,
  Instagram,
  Facebook,
  FileText,
  Mail,
  Download
} from 'lucide-react';
import { Enquiry } from '../types';

interface AdminDashboardSectionProps {
  enquiries: Enquiry[];
  onDeleteEnquiry: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: Enquiry['status']) => void;
  onToggleAdmin: () => void;
}

export default function AdminDashboardSection({
  enquiries,
  onDeleteEnquiry,
  onUpdateStatus,
  onToggleAdmin
}: AdminDashboardSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Enquiry['status']>('All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Safely filter selected ids down to existing enquiries
  const validSelectedIds = useMemo(() => {
    const existingIds = new Set(enquiries.map(e => e.id));
    return selectedIds.filter(id => existingIds.has(id));
  }, [selectedIds, enquiries]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const filteredIds = filteredEnquiries.map(e => e.id);
    if (filteredIds.length === 0) return;
    const allSelected = filteredIds.every(id => selectedIds.includes(id));
    
    if (allSelected) {
      setSelectedIds(prev => prev.filter(id => !filteredIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...filteredIds])));
    }
  };

  const handleBulkUpdateStatus = (newStatus: Enquiry['status']) => {
    validSelectedIds.forEach((id) => {
      onUpdateStatus(id, newStatus);
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to permanently delete the ${validSelectedIds.length} selected lead entries?`)) {
      validSelectedIds.forEach((id) => {
        onDeleteEnquiry(id);
      });
      setSelectedIds([]);
    }
  };

  // Dynamically pull distinct service categories for filtering
  const distinctServices = useMemo(() => {
    const list = enquiries.map((item) => item.serviceType);
    return ['All', ...Array.from(new Set(list))];
  }, [enquiries]);

  // Compute CRM metrics
  const metrics = useMemo(() => {
    const total = enquiries.length;
    const pending = enquiries.filter((e) => e.status === 'New').length;
    const contacted = enquiries.filter((e) => e.status === 'Contacted').length;
    const active = enquiries.filter((e) => e.status === 'In Progress').length;
    
    // Estimate luxury budget pipeline
    let totalValueCount = 0;
    enquiries.forEach((item) => {
      if (item.budgetRange.includes('Elite')) {
        totalValueCount += 150000; // Estimated baseline
      } else if (item.budgetRange.includes('Premium')) {
        totalValueCount += 35000;
      } else {
        totalValueCount += 10000;
      }
    });

    return { total, pending, contacted, active, estPipeline: totalValueCount };
  }, [enquiries]);

  // Filter inquiries matching both search text, selected status, and selected category
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.email ? item.email.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesService = serviceFilter === 'All' || item.serviceType === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [enquiries, searchTerm, statusFilter, serviceFilter]);

  // Export all lead database records to a structured Excel-compatible CSV file
  const handleExportToCSV = () => {
    if (enquiries.length === 0) {
      alert("No active lead records found to export.");
      return;
    }

    // CSV headers to match requested schema: Timestamp, Client Name, WhatsApp Number, Category, City, Budget, and Requirements Brief
    const headers = [
      "Enquiry ID",
      "Timestamp",
      "Client Name",
      "WhatsApp Number",
      "Email Address",
      "Category",
      "City",
      "Estimated Budget",
      "Requirements Brief",
      "Status"
    ];

    const escapeCSVCell = (val: string) => {
      if (val === undefined || val === null) return '""';
      const formatted = val.toString().replace(/"/g, '""');
      return `"${formatted}"`;
    };

    const rows = enquiries.map((item) => [
      escapeCSVCell(item.id),
      escapeCSVCell(item.timestamp),
      escapeCSVCell(item.name),
      escapeCSVCell(item.phone),
      escapeCSVCell(item.email || ""),
      escapeCSVCell(item.serviceType),
      escapeCSVCell(item.city),
      escapeCSVCell(item.budgetRange),
      escapeCSVCell(item.message),
      escapeCSVCell(item.status)
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `anshu_print_studio_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section 
      id="admin-crm-dashboard" 
      className="relative py-24 bg-neutral-950 border-t-2 border-[#ff4773]/30 overflow-hidden"
    >
      {/* Absolute Tech Grid Background Pattern */}
      <div className="absolute inset-0 bg-[#070708] opacity-95" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      
      {/* Fluid Pink and Yellow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[30rem] h-[30rem] bg-[#ff4773]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#ffd744]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff4773]/10 border border-[#ff4773]/20 rounded-full">
              <Shield className="w-3.5 h-3.5 text-[#ff4773]" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff4773] uppercase">
                Anshu Prints Lead CRM
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-black text-white tracking-tight">
              ADMIN CONTROL CENTER
            </h2>
            <p className="text-xs text-neutral-400 font-mono tracking-wider max-w-2xl uppercase">
              Live Leads Routing and Vector Compatibility Submissions Control Board.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full md:w-auto shrink-0">
            <button 
              onClick={handleExportToCSV}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer select-none font-bold shadow-[0_4px_15px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 border border-emerald-500/30"
              title="Compile and download all lead entries to an Excel-compatible CSV file"
            >
              <Download className="w-4 h-4" />
              <span>📥 Export Enquiries to Excel</span>
            </button>

            <button 
              onClick={onToggleAdmin}
              className="px-6 py-3 rounded-full bg-[#ff4773]/10 hover:bg-[#ff4773]/20 text-[#ff4773] hover:text-white border border-[#ff4773]/40 hover:border-[#ff4773] font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer select-none text-center font-bold shadow-[0_0_12px_rgba(255,71,115,0.1)] hover:shadow-[0_0_20px_rgba(255,71,115,0.2)]"
              id="admin-dashboard-exit-btn"
            >
              ← Exit Dashboard
            </button>
          </div>
        </div>

        {/* Analytics cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Total Leads */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-[#ff4773]/20 transition-all duration-300 flex flex-col justify-between">
            <div className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest flex items-center justify-between">
              Total Inquiries
              <ClipboardList className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="mt-4">
              <span className="font-sans font-black text-white text-3xl block">
                {metrics.total}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">Records Tracked</span>
            </div>
          </div>

          {/* Card 2: New Submissions Indicator */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-all duration-300 flex flex-col justify-between">
            <div className="text-neutral-400 font-mono text-[9px] uppercase tracking-widest flex items-center justify-between">
              New Leads
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            </div>
            <div className="mt-4">
              <span className="font-sans font-black text-amber-400 text-3xl block">
                {metrics.pending}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">Needs Action</span>
            </div>
          </div>

          {/* Card 3: Contacted Submissions */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-sky-500/20 transition-all duration-300 flex flex-col justify-between">
            <div className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest flex items-center justify-between">
              Contacted status
              <Clock className="w-4 h-4 text-sky-450" />
            </div>
            <div className="mt-4">
              <span className="font-sans font-black text-sky-400 text-3xl block">
                {metrics.contacted}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">Assigned Manager</span>
            </div>
          </div>

          {/* Card 4: Active Projects */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between">
            <div className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest flex items-center justify-between">
              Active Signage Work
              <TrendingUp className="w-4 h-4 text-emerald-455" />
            </div>
            <div className="mt-4">
              <span className="font-sans font-black text-emerald-400 text-3xl block">
                {metrics.active}
              </span>
              <span className="text-[10px] text-neutral-450 font-mono">Fabrication Status</span>
            </div>
          </div>

          {/* Card 5: Estimated Pipeline Value */}
          <div className="col-span-2 lg:col-span-1 bg-white/[0.02] border border-[#ffd744]/25 rounded-2xl p-5 flex flex-col justify-between shadow-[0_0_15px_rgba(254,215,68,0.05)]">
            <div className="text-neutral-400 font-mono text-[9px] uppercase tracking-widest flex items-center justify-between">
              Est. Pipeline
              <span className="px-1.5 py-0.5 rounded bg-[#ffd744]/10 text-[#ffd744] text-[8px] font-black">VALUED</span>
            </div>
            <div className="mt-4">
              <span className="font-sans font-black text-[#ffd744] text-2.5xl block truncate">
                ₹{metrics.estPipeline.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">Active Value</span>
            </div>
          </div>

        </div>

        {/* Live Filter Controls */}
        <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Live search input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search Client, City, Phone, Message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff4773]/50 transition-colors"
            />
          </div>

          {/* Status selector filter */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#ffd744] mb-1.5 pl-1 font-bold">
              <Filter className="w-3 h-3 text-gold-400" />
              Filter By Status
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-neutral-950 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#ff4773]/50 transition-colors cursor-pointer"
            >
              <option value="All">All Lead Statuses</option>
              <option value="New">🟢 New Leads Only</option>
              <option value="Contacted">🔵 Contacted Leads Only</option>
              <option value="In Progress">🟡 Active Pipeline Only</option>
            </select>
          </div>

          {/* Service filter dropdown */}
          <div className="md:col-span-3 flex flex-col">
            <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#ffd744] mb-1.5 pl-1 font-bold">
              <Briefcase className="w-3 h-3 text-gold-400" />
              Category Required
            </div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-neutral-950 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono text-white focus:outline-none focus:border-[#ff4773]/50 transition-colors cursor-pointer"
            >
              {distinctServices.map((service) => (
                <option key={service} value={service}>
                  {service === 'All' ? 'All Service Categories' : service}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Quick Button */}
          <div className="md:col-span-2 pt-5">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setServiceFilter('All');
              }}
              className="w-full bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white border border-white/10 rounded-xl py-3 text-xs font-mono transition-colors uppercase cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

        </div>

        {/* Lead entries display table list */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/30 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleToggleSelectAll}
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all cursor-pointer ${
                  filteredEnquiries.length > 0 && filteredEnquiries.every(item => selectedIds.includes(item.id))
                    ? 'bg-[#ff4773] border-[#ff4773] text-white'
                    : 'border-white/20 hover:border-white/45 bg-black/40'
                }`}
              >
                {filteredEnquiries.length > 0 && filteredEnquiries.every(item => selectedIds.includes(item.id)) && (
                  <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={handleToggleSelectAll}
                className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold hover:text-white select-none transition-colors align-middle"
              >
                Select All Visible ({filteredEnquiries.length})
              </button>
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd744] font-semibold">
              Showing {filteredEnquiries.length} of {enquiries.length} matching leads
            </span>
          </div>

          {/* Bulk Action Toolbar */}
          <AnimatePresence>
            {validSelectedIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                className="bg-[#141417]/95 border border-[#ff4773]/40 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_0_25px_rgba(255,71,115,0.12)] z-20 backdrop-blur-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#ff4773] animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white">
                    <strong>{validSelectedIds.length}</strong> {validSelectedIds.length === 1 ? 'Lead' : 'Leads'} Selected
                  </span>
                  <button
                    onClick={() => setSelectedIds([])}
                    className="text-[10px] font-mono text-neutral-500 hover:text-[#ff4773] underline cursor-pointer"
                  >
                    Clear Selection
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Bulk Actions:</span>
                  
                  <button
                    onClick={() => handleBulkUpdateStatus('New')}
                    className="bg-neutral-950 hover:bg-neutral-900 border border-amber-500/30 hover:border-amber-500 text-amber-400 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer"
                  >
                    🟢 Set New
                  </button>
                  <button
                    onClick={() => handleBulkUpdateStatus('Contacted')}
                    className="bg-neutral-950 hover:bg-neutral-900 border border-sky-500/30 hover:border-sky-500 text-sky-400 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer"
                  >
                    🔵 Set Contacted
                  </button>
                  <button
                    onClick={() => handleBulkUpdateStatus('In Progress')}
                    className="bg-neutral-950 hover:bg-neutral-900 border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-mono uppercase font-bold transition-all cursor-pointer"
                  >
                    🟡 Set Active
                  </button>

                  <div className="w-[1px] h-6 bg-white/10 mx-1" />

                  <button
                    onClick={handleBulkDelete}
                    className="bg-[#ff4773]/10 hover:bg-[#ff4773]/20 border border-[#ff4773]/40 hover:border-[#ff4773] text-[#ff4773] px-3.5 py-1.5 rounded-xl text-[10px] font-mono uppercase font-black transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Selected
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout" initial={false}>
            {filteredEnquiries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-white/5 bg-neutral-900/10 rounded-2xl p-12 text-center"
              >
                <ClipboardList className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                <h4 className="text-neutral-400 text-sm font-semibold">No Matching Inquiries Found</h4>
                <p className="text-xs text-neutral-600 mt-1 max-w-sm mx-auto leading-relaxed uppercase font-mono">
                  No records match your exact search criteria. Try removing status or query filters.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEnquiries.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`bg-[#0f0f11] hover:bg-[#121215] border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4 ${
                      selectedIds.includes(item.id)
                        ? 'border-[#ff4773]/50 shadow-[0_0_15px_rgba(255,71,115,0.05)] bg-[#121013]'
                        : 'border-white/5 hover:border-[#ff4773]/20'
                    }`}
                    id={`dashboard-inquiry-card-${item.id}`}
                  >
                    
                    {/* Top block */}
                    <div className="space-y-3">
                      
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Checkbox for single card selection */}
                          <button
                            type="button"
                            onClick={() => handleToggleSelect(item.id)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 ${
                              selectedIds.includes(item.id)
                                ? 'bg-[#ff4773] border-[#ff4773] text-white shadow-[0_0_8px_rgba(255,71,115,0.3)]'
                                : 'border-white/20 hover:border-white/45 bg-black/40'
                            }`}
                            title="Select lead"
                          >
                            {selectedIds.includes(item.id) && (
                              <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </button>

                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-sans font-black text-white text-lg tracking-wide leading-tight uppercase truncate">
                                {item.name}
                              </h3>
                              <span className="px-1.5 py-0.5 bg-neutral-950 border border-white/10 rounded font-mono text-[9px] text-[#ffd744] uppercase tracking-wider font-bold shrink-0">
                                {item.id}
                              </span>
                            </div>
                            <span className="inline-flex items-center text-[9px] font-mono text-neutral-500">
                              <Calendar className="w-3 h-3 mr-1 text-[#ffd744]" />
                              {item.timestamp}
                            </span>
                          </div>
                        </div>

                        {/* Actions block row */}
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => {
                              const digits = item.phone.replace(/[^0-9]/g, '');
                              let waPhone = digits;
                              if (digits.length === 10) {
                                waPhone = '91' + digits;
                              } else if (digits.length === 12 && digits.startsWith('91')) {
                                waPhone = digits;
                              } else if (digits.length > 10 && !digits.startsWith('91')) {
                                waPhone = '91' + digits.slice(-10);
                              }
                              window.open(`https://wa.me/${waPhone}`, '_blank');
                            }}
                            className="inline-flex items-center gap-1 text-[9px] font-mono font-bold rounded-lg px-2 py-1.5 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all cursor-pointer focus:outline-none"
                            title="🟢 Manual WhatsApp"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span>WhatsApp</span>
                          </button>

                          <select
                            value={item.status}
                            onChange={(e) => onUpdateStatus(item.id, e.target.value as any)}
                            className={`text-[9px] font-mono font-bold rounded-lg px-2 py-1 bg-neutral-950 border focus:outline-none transition-all cursor-pointer ${
                              item.status === 'New'
                                ? 'border-amber-500/40 text-amber-400'
                                : item.status === 'Contacted'
                                ? 'border-sky-500/40 text-sky-450'
                                : 'border-emerald-500/40 text-emerald-400'
                            }`}
                          >
                            <option value="New">🟢 New Leads</option>
                            <option value="Contacted">🔵 Contacted</option>
                            <option value="In Progress">🟡 Active Signage</option>
                          </select>

                          <button
                            onClick={() => onDeleteEnquiry(item.id)}
                            className="p-1.5 rounded-lg border border-white/5 bg-neutral-950 hover:bg-red-500/10 text-neutral-500 hover:text-red-400 hover:border-red-500/20 transition-all cursor-pointer focus:outline-none"
                            title="Delete Lead Entry Permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Detail attributes grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs border-y border-white/5 py-3">
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                            Category Selection
                          </p>
                          <p className="text-white font-bold block">{item.serviceType}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                            Estimated Budget
                          </p>
                          <p className="text-emerald-400 font-bold block">{item.budgetRange}</p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                            Location City
                          </p>
                          <p className="text-white/80 font-semibold flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gold-400" />
                            {item.city}
                          </p>
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                            Callback Line
                          </p>
                          <p className="text-[#ffd744] font-bold flex items-center">
                            <PhoneCall className="w-3 h-3 mr-1 shrink-0" />
                            {item.phone}
                          </p>
                        </div>
                        {item.email && (
                          <div className="col-span-2 space-y-0.5 border-t border-white/[0.03] pt-2">
                            <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wide">
                              Customer Email Address
                            </p>
                            <p className="text-neutral-350 hover:text-white font-mono text-[11px] truncate flex items-center gap-1.5 transition-colors">
                              <Mail className="w-3 h-3 text-[#ffd744] shrink-0" />
                              {item.email}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Brief text */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-semibold flex items-center">
                          <MessageSquare className="w-3.5 h-3.5 mr-1 text-gold-400" />
                          Requirements Brief
                        </span>
                        <p className="text-xs text-neutral-400 leading-relaxed italic bg-neutral-950 p-3 rounded-xl border border-white/5">
                          "{item.message}"
                        </p>
                      </div>

                    </div>

                    {/* Brand Social Leads or Web Design Links */}
                    {(item.imageUrl || item.facebookLink || item.instagramLink || item.otherLink) && (
                      <div className="space-y-2 pt-2 border-t border-white/[0.03]">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block">
                          Specified Design Asset Links:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {item.imageUrl && (
                            <a
                              href={item.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-950/40 border border-sky-500/20 hover:border-sky-450 hover:bg-sky-900/40 text-sky-400 transition-colors"
                            >
                              <Globe className="w-3.5 h-3.5 text-sky-400" />
                              <span>Image Link</span>
                            </a>
                          )}
                          {item.facebookLink && (
                            <a
                              href={item.facebookLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-950/40 border border-blue-500/20 hover:border-blue-450 hover:bg-blue-900/40 text-blue-400 transition-colors"
                            >
                              <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                              <span>Facebook Lead</span>
                            </a>
                          )}
                          {item.instagramLink && (
                            <a
                              href={item.instagramLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-950/40 border border-pink-500/20 hover:border-pink-450 hover:bg-pink-900/40 text-pink-400 transition-colors"
                            >
                              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                              <span>Instagram Portfolio</span>
                            </a>
                          )}
                          {item.otherLink && (
                            <a
                              href={item.otherLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-450 hover:bg-emerald-900/40 text-emerald-400 transition-colors"
                            >
                              <Link2 className="w-3.5 h-3.5 text-emerald-450" />
                              <span>Drive Folder</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Attachment details block for multi-file customer uploads */}
                    {((item.uploadedFiles && item.uploadedFiles.length > 0) || item.uploadedFile) && (
                      <div className="space-y-2 pt-2 border-t border-white/[0.03]">
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block">
                          Attached Customer Artwork Files ({item.uploadedFiles ? item.uploadedFiles.length : 1}):
                        </span>

                        <div className="grid grid-cols-1 gap-2">
                          {(item.uploadedFiles || [item.uploadedFile]).map((file, fIdx) => {
                            if (!file) return null;
                            const isImg = file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPEG' || file.type === 'SVG';
                            
                            return (
                              <div key={fIdx} className="text-xs bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 flex items-center justify-between gap-3 text-left">
                                <div className="flex items-center space-x-2.5 min-w-0">
                                  {isImg && file.previewUrl ? (
                                    <div className="w-10 h-10 rounded overflow-hidden border border-emerald-500/20 bg-black/40 cursor-zoom-in shrink-0"
                                         onClick={() => {
                                           const w = window.open();
                                           if (w) w.document.write(`<img src="${file.previewUrl}" style="max-width:100%; max-height:100vh; display:block; margin:auto; background:#111; padding:20px;" />`);
                                         }}
                                         title="Click to zoom in"
                                    >
                                      <img src={file.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                  ) : (
                                    <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-455 shrink-0">
                                      <FileText className="w-4 h-4 text-emerald-400" />
                                    </div>
                                  )}
                                  <div className="text-left min-w-0">
                                    <p className="text-white font-bold block truncate max-w-[150px] sm:max-w-xs">{file.name}</p>
                                    <span className="text-[8px] font-mono text-emerald-400 font-extrabold pb-0.5 block">VECTOR COMPATIBLE ({file.type})</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                                  <span className="text-[10px] text-neutral-400 font-mono bg-neutral-950 px-2 py-0.5 rounded border border-white/5">
                                    {file.size}
                                  </span>
                                  {file.previewUrl && (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const w = window.open();
                                          if (w) {
                                            if (file.previewUrl?.startsWith('data:application/pdf')) {
                                              w.document.write(`<iframe src="${file.previewUrl}" style="width:100%; height:100vh; border:none;"></iframe>`);
                                            } else {
                                              w.document.write(`<img src="${file.previewUrl}" style="max-width:100%; max-height:100vh; display:block; margin:auto; background:#111; padding:20px;" />`);
                                            }
                                          }
                                        }}
                                        className="text-[9px] font-mono text-[#ff4773] hover:underline bg-[#ff4773]/10 hover:bg-[#ff4773]/20 px-2 py-1 rounded cursor-pointer border border-[#ff4773]/30 flex items-center gap-0.5"
                                        title="Open file in a new window"
                                      >
                                        👁️ OPEN
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          const link = document.createElement('a');
                                          link.href = file.previewUrl || '';
                                          link.download = file.name;
                                          document.body.appendChild(link);
                                          link.click();
                                          document.body.removeChild(link);
                                        }}
                                        className="text-[9px] font-mono text-emerald-400 hover:underline bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded cursor-pointer border border-emerald-500/30 flex items-center gap-0.5"
                                        title="Save file to device"
                                      >
                                        💾 SAVE
                                      </button>

                                      <button
                                        type="button"
                                        onClick={async () => {
                                          if (navigator.share) {
                                            try {
                                              await navigator.share({
                                                title: `Artwork: ${file.name}`,
                                                text: `Check out the artwork file from lead: ${item.name}`,
                                                url: window.location.href
                                              });
                                            } catch (err) {
                                              console.log("Sharing failed", err);
                                            }
                                          } else {
                                            const shareText = `Lead Name: ${item.name}%0AFile: ${file.name}`;
                                            window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
                                          }
                                        }}
                                        className="text-[9px] font-mono text-sky-400 hover:underline bg-sky-500/10 hover:bg-sky-500/20 px-2 py-1 rounded cursor-pointer border border-sky-500/30 flex items-center gap-0.5"
                                        title="Share file details"
                                      >
                                        🔗 SHARE
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
