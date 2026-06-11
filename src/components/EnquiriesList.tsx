import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ClipboardList, Send, Calendar, CheckSquare, MessageSquare, PhoneCall, Link2, Globe, Instagram, Facebook, FileText } from 'lucide-react';
import { Enquiry } from '../types';

interface EnquiriesListProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: Enquiry[];
  onDeleteEnquiry: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: Enquiry['status']) => void;
}

export default function EnquiriesList({
  isOpen,
  onClose,
  enquiries,
  onDeleteEnquiry,
  onUpdateStatus
}: EnquiriesListProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
            id="enquiries-drawer-backdrop"
          />

          {/* Drawer Side panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-neutral-950 border-l border-white/5 shadow-2xl z-50 flex flex-col justify-between"
            id="enquiries-drawer"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/5 bg-neutral-900/50 flex justify-between items-center">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-gold-400">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-display font-bold text-lg">Enquiry Console</h3>
                  <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    Received Submissions ({enquiries.length})
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white border border-transparent hover:border-white/10 transition-all cursor-pointer focus:outline-none"
                id="enquiries-drawer-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inquiries list roll */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6 hide-scrollbar">
              <AnimatePresence initial={false}>
                {enquiries.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20 text-neutral-500"
                  >
                    <div className="w-16 h-16 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-600 mb-4 shadow-inner">
                      <ClipboardList className="w-8 h-8" />
                    </div>
                    <h4 className="text-white font-semibold text-sm">No Enquiries Yet</h4>
                    <p className="text-xs text-neutral-500 max-w-xs mt-1 leading-relaxed">
                      Your submitted project requirements from the contact form will show up immediately here with real-time state tracking.
                    </p>
                  </motion.div>
                ) : (
                  enquiries.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0.95, opacity: 0, y: 15 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.95, opacity: 0, x: 50 }}
                      className="p-5 rounded-xl border border-white/5 bg-neutral-900/60 hover:border-gold-500/20 hover:bg-neutral-900 transition-all duration-300 space-y-4"
                      id={`enquiry-card-${item.id}`}
                    >
                      {/* Name Card and status */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-white tracking-wide text-base">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-neutral-500 font-mono flex items-center mt-1">
                            <Calendar className="w-3.5 h-3.5 mr-1 text-gold-400" />
                            {item.timestamp}
                          </span>
                        </div>

                        {/* Status Select Badge */}
                        <div className="flex items-center space-x-2">
                          <select
                            value={item.status}
                            onChange={(e) => onUpdateStatus(item.id, e.target.value as Enquiry['status'])}
                            className={`text-[10px] font-mono rounded-md border px-2 py-1 bg-neutral-950 focus:outline-none transition-all cursor-pointer font-bold ${
                              item.status === 'New'
                                ? 'border-amber-500/35 text-amber-400'
                                : item.status === 'Contacted'
                                ? 'border-sky-500/35 text-sky-400'
                                : 'border-emerald-500/35 text-emerald-400'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">Active</option>
                          </select>

                          {/* Delete Trigger Button */}
                          <button
                            onClick={() => onDeleteEnquiry(item.id)}
                            className="p-1.5 rounded-md hover:bg-red-500/15 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer focus:outline-none"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Detail attributes grid */}
                      <div className="grid grid-cols-2 gap-3 text-xs border-y border-white/5 py-3">
                        <div>
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                            Service Requested
                          </p>
                          <p className="text-white mt-0.5 font-medium">{item.serviceType}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                            City / Coordinates
                          </p>
                          <p className="text-white mt-0.5 font-medium">{item.city}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                            Phone Callback
                          </p>
                          <p className="text-gold-400 mt-0.5 font-medium flex items-center">
                            <PhoneCall className="w-3 h-3 mr-1 shrink-0" />
                            {item.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide">
                            Expected Budget Range
                          </p>
                          <p className="text-emerald-400 mt-0.5 font-medium">{item.budgetRange}</p>
                        </div>
                      </div>

                      {/* Message block requirements */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-semibold flex items-center">
                          <MessageSquare className="w-3 h-3 mr-1 text-gold-400" />
                          Requirements Brief
                        </span>
                        <p className="text-xs text-neutral-400 leading-relaxed italic bg-neutral-950 p-3 rounded-lg border border-white/5">
                          "{item.message}"
                        </p>
                      </div>

                      {/* Brand Social Leads or Web Design Links */}
                      {(item.imageUrl || item.facebookLink || item.instagramLink || item.otherLink) && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block">
                            Direct Web Assets & Portfolios:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {item.imageUrl && (
                              <a
                                href={item.imageUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-sky-950/40 border border-sky-500/20 hover:border-sky-400 text-sky-400 transition-colors"
                              >
                                <Globe className="w-3 h-3 text-sky-400" />
                                <span>Image Link</span>
                              </a>
                            )}
                            {item.facebookLink && (
                              <a
                                href={item.facebookLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-blue-950/40 border border-blue-500/20 hover:border-blue-400 text-blue-400 transition-colors"
                              >
                                <Facebook className="w-3 h-3 text-[#1877F2]" />
                                <span>Facebook</span>
                              </a>
                            )}
                            {item.instagramLink && (
                              <a
                                href={item.instagramLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-pink-950/40 border border-pink-500/20 hover:border-pink-400 text-pink-400 transition-colors"
                              >
                                <Instagram className="w-3 h-3 text-[#E1306C]" />
                                <span>Instagram</span>
                              </a>
                            )}
                            {item.otherLink && (
                              <a
                                href={item.otherLink}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400 text-emerald-400 transition-colors"
                              >
                                <Link2 className="w-3.5 h-3.5 text-emerald-450" />
                                <span>Drive File</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Attached Vector/Design Files (Multiple upload list layout) */}
                      {((item.uploadedFiles && item.uploadedFiles.length > 0) || item.uploadedFile) && (
                        <div className="space-y-2 pt-1 border-t border-white/[0.03]">
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block">
                            Attached Customer Media / PDFs ({item.uploadedFiles ? item.uploadedFiles.length : 1}):
                          </span>
                          
                          <div className="space-y-1.5">
                            {(item.uploadedFiles || [item.uploadedFile]).map((file, fIdx) => {
                              if (!file) return null;
                              const isImg = file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPEG' || file.type === 'SVG';
                              return (
                                <div key={fIdx} className="text-xs bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-2.5 flex items-center justify-between gap-3">
                                  <div className="flex items-center space-x-2.5 min-w-0">
                                    {isImg && file.previewUrl ? (
                                      <div className="w-10 h-10 rounded overflow-hidden border border-emerald-500/20 bg-black/40 cursor-zoom-in shrink-0"
                                           onClick={() => {
                                             const w = window.open();
                                             if (w) w.document.write(`<img src="${file.previewUrl}" style="max-width:100%; max-height:100vh; display:block; margin:auto; background:#111; padding:20px;" />`);
                                           }}
                                           title="Click to view full image in a new tab"
                                      >
                                        <img src={file.previewUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                      </div>
                                    ) : (
                                      <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                                        <FileText className="w-4 h-4 text-emerald-400" />
                                      </div>
                                    )}
                                    <div className="text-left min-w-0">
                                      <p className="text-white font-bold block truncate max-w-[170px] sm:max-w-xs">{file.name}</p>
                                      <span className="text-[8px] font-mono text-emerald-400 font-extrabold pb-0.5 block">VECTOR DIRECT MATCH ({file.type})</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                                    <span className="text-[9px] text-neutral-400 font-mono bg-neutral-950 px-1.5 py-0.5 rounded border border-white/5">
                                      {file.size}
                                    </span>
                                    {/* Actions to actually Open, Save, and Share photo */}
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
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Console sign-off footer */}
            <div className="p-6 border-t border-white/5 bg-neutral-950 text-center text-xs text-neutral-500 font-mono uppercase tracking-widest">
              Anshu Prints Private CRM Console
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
