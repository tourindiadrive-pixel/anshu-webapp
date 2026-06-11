import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  File, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  Info
} from 'lucide-react';

interface UploadedFileInfo {
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

interface DesignUploaderProps {
  onFileSelect: (file: UploadedFileInfo | null) => void;
  selectedFile: UploadedFileInfo | null;
  className?: string;
}

export default function DesignUploader({ onFileSelect, selectedFile, className = "" }: DesignUploaderProps) {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    };
  }, []);

  // High quality design formats validated
  const ACCEPTED_EXTENSIONS = [
    'ai', 'eps', 'pdf', 'cdr', 'svg', 'dxf', 'png', 'jpg', 'jpeg', 'zip'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setErrorMsg(null);
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension || !ACCEPTED_EXTENSIONS.includes(extension)) {
      setErrorMsg(`Unsupported format (.${extension}). We support professional vector files: .AI, .EPS, .PDF, .CDR, .SVG, .DXF or high-res images.`);
      return;
    }

    // Max limit is 50MB for luxury high volume specs
    const maxBytes = 50 * 1024 * 1024;
    if (file.size > maxBytes) {
      setErrorMsg('Selected file exceeds high-speed direct upload limits (Max 50MB). For grand scale assets, continue enquiry and we will share a private Google Drive folder link.');
      return;
    }

    // Format bytes to human readable text
    const sizeStr = file.size < 1024 * 1024 
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
    }

    // Start simulation ticks
    setIsUploading(true);
    setUploadProgress(0);

    // Create a local virtual preview url if it's an image
    let localPreview: string | undefined;
    if (file.type.startsWith('image/')) {
      localPreview = URL.createObjectURL(file);
    }

    let progressAccumulator = 0;
    uploadIntervalRef.current = setInterval(() => {
      progressAccumulator += Math.floor(Math.random() * 15) + 12;
      const finalProgress = Math.min(progressAccumulator, 100);
      
      setUploadProgress(finalProgress);

      if (finalProgress >= 100) {
        if (uploadIntervalRef.current) {
          clearInterval(uploadIntervalRef.current);
        }
        setIsUploading(false);
        onFileSelect({
          name: file.name,
          size: sizeStr,
          type: extension.toUpperCase(),
          previewUrl: localPreview
        });
      }
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFileSelect(null);
    setUploadProgress(0);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerInputFocus = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`} id="custom-design-uploader-frame">
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept=".ai,.eps,.pdf,.cdr,.svg,.dxf,.png,.jpg,.jpeg,.zip"
      />

      <AnimatePresence mode="wait">
        {!selectedFile && !isUploading ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerInputFocus}
            className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-3 bg-[#000000]/40 ${
              isDragActive 
                ? 'border-[#ff4773] bg-[#ff4773]/5 shadow-[0_0_20px_rgba(255,71,115,0.15)]' 
                : 'border-white/10 hover:border-[#ffd744]/30 hover:bg-[#000000]/60'
            }`}
          >
            {/* Visual Vector Icon Container */}
            <div className={`p-4 rounded-full border transition-transform duration-300 ${
              isDragActive 
                ? 'bg-[#ff4773]/15 border-[#ff4773] text-[#ff4773] scale-108' 
                : 'bg-white/[0.03] border-white/5 text-neutral-450 group-hover:scale-105'
            }`}>
              <Upload className="w-6 h-6" />
            </div>

            <div className="space-y-1 block max-w-sm">
              <p className="text-white text-xs font-sans font-bold tracking-wider uppercase">
                Upload Your Design / Logo / Blueprint
              </p>
              <p className="text-[11px] text-neutral-400 font-normal leading-normal">
                Drag & drop files or <span className="text-[#ff4773] font-bold underline">browse drives</span>
              </p>
            </div>

            {/* Micro warning regarding layout support */}
            <div className="pt-2 border-t border-white/[0.03] w-full mt-2 flex flex-wrap justify-center gap-1.5 text-[8.5px] font-mono tracking-widest text-neutral-450 uppercase">
              <span className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">Vector (.AI, .EPS, .PDF)</span>
              <span className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">Graphics (.SVG, .PNG, .ZIP)</span>
            </div>

            {isDragActive && (
              <span className="absolute inset-0 rounded-2xl border-2 border-[#ff4773] pointer-events-none scale-102 transition-transform" />
            )}
          </motion.div>
        ) : isUploading ? (
          <motion.div
            key="uploading-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-white/10 p-6 bg-[#000000]/50 backdrop-blur-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#ffd744]/15 border border-[#ffd744]/35 flex items-center justify-center text-[#ffd744]">
                  <FileText className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-neutral-200 font-bold block truncate max-w-[180px]">Analysing Artwork Assets</p>
                  <span className="text-[9px] font-mono tracking-widest text-[#ffd744] uppercase font-black">Pre-validation Check</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                {uploadProgress}%
              </span>
            </div>

            {/* Custom high fidelity progress tracker row */}
            <div className="relative w-full h-[6px] bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff4773] to-[#ffd744] rounded-full"
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="text-[10px] text-left text-neutral-450 font-normal leading-normal italic flex items-center gap-1">
              <Info className="w-3 h-3 text-[#ff4773] flex-shrink-0" />
              Scanning vectors for color separation profile alignments...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="rounded-2xl border border-emerald-500/25 p-5 bg-[#0a0f0c] shadow-[0_4px_25px_rgba(16,185,129,0.08)] space-y-4 text-left"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center text-emerald-450 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono tracking-widest text-emerald-450 bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 rounded-full font-black uppercase">
                      Vector Pre-Verified
                    </span>
                    <span className="text-[8px] font-mono text-neutral-450">
                      Format: {selectedFile?.type}
                    </span>
                  </div>
                  <p className="text-xs text-white font-sans font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">
                    {selectedFile?.name}
                  </p>
                  <p className="text-[10px] text-neutral-450 font-mono">
                    File Weight: {selectedFile?.size} bytes
                  </p>
                </div>
              </div>

              {/* Clear File Action */}
              <button 
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 text-neutral-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
                title="Remove uploaded design"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Virtual thumbnail render check if image */}
            {selectedFile?.previewUrl && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                <img 
                  src={selectedFile.previewUrl} 
                  alt="Review preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="pt-2 border-t border-white/[0.04] flex items-center gap-1.5 text-[10px] font-mono text-emerald-450/90 leading-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              This asset is safely cached & linked to your enquiry!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic format validation warning banner */}
      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2.5 p-3.5 rounded-xl border border-red-500/25 bg-red-500/[0.03] text-left"
        >
          <AlertTriangle className="w-4.5 h-4.5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-neutral-300 leading-normal font-sans font-normal">
            <span className="text-red-400 font-bold block mb-0.5">Asset rejected</span>
            {errorMsg}
          </p>
        </motion.div>
      )}
    </div>
  );
}
