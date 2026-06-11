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
  Info,
  Layers,
  FileCheck2
} from 'lucide-react';

export interface UploadedFileInfo {
  name: string;
  size: string;
  type: string;
  previewUrl?: string; // Persistent Base64 Data URL or standard Object URL
}

interface DesignUploaderProps {
  onFileSelect?: (file: UploadedFileInfo | null) => void;
  selectedFile?: UploadedFileInfo | null;
  onFilesSelect?: (files: UploadedFileInfo[]) => void;
  selectedFiles?: UploadedFileInfo[];
  className?: string;
}

export default function DesignUploader({ 
  onFileSelect, 
  selectedFile, 
  onFilesSelect, 
  selectedFiles = [], 
  className = "" 
}: DesignUploaderProps) {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Supported format extensions
  const ACCEPTED_EXTENSIONS = [
    'ai', 'eps', 'pdf', 'cdr', 'svg', 'dxf', 'png', 'jpg', 'jpeg', 'zip'
  ];

  // Helper limits
  const MAX_FILES_LIMIT = 5;
  const MAX_FILE_SIZE_MB = 5;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (filesList: FileList | File[]) => {
    setErrorMsg(null);
    
    // Determine target files count limit
    const currentFilesCount = onFilesSelect ? selectedFiles.length : (selectedFile ? 1 : 0);
    const incomingFilesCount = filesList.length;

    if (onFilesSelect && currentFilesCount + incomingFilesCount > MAX_FILES_LIMIT) {
      setErrorMsg(`Upload limit error: You can upload a maximum of ${MAX_FILES_LIMIT} files.`);
      return;
    }

    const processedList: UploadedFileInfo[] = [];

    setIsUploading(true);
    setUploadProgress(10);

    for (let i = 0; i < filesList.length; i++) {
      const file = filesList[i];
      const extension = file.name.split('.').pop()?.toLowerCase() || '';

      if (!ACCEPTED_EXTENSIONS.includes(extension)) {
        setErrorMsg(`Format not supported (.${extension}). We support: .AI, .EPS, .PDF, .CDR, .SVG, .DXF, or images (.PNG, .JPG).`);
        setIsUploading(false);
        return;
      }

      // Check 5MB size limit
      const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
      if (file.size > maxBytes) {
        setErrorMsg(`File size error: "${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`);
        setIsUploading(false);
        return;
      }

      const sizeStr = file.size < 1024 * 1024 
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

      setUploadProgress(40 + Math.floor((i / filesList.length) * 40));

      let base64Preview: string | undefined;
      try {
        // Read actual image/pdf as Base64 so it persists on page refesh and actually opens!
        base64Preview = await readFileAsBase64(file);
      } catch (e) {
        // Fallback to object URL if base64 conversion fails
        base64Preview = URL.createObjectURL(file);
      }

      processedList.push({
        name: file.name,
        size: sizeStr,
        type: extension.toUpperCase(),
        previewUrl: base64Preview
      });
    }

    setUploadProgress(100);
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);

      if (onFilesSelect) {
        const updatedList = [...selectedFiles, ...processedList];
        onFilesSelect(updatedList.slice(0, MAX_FILES_LIMIT));
      } else if (onFileSelect) {
        // Backward-compatible single file mode
        onFileSelect(processedList[0]);
      }
    }, 450);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const removeFileAtIndex = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onFilesSelect) {
      const updated = selectedFiles.filter((_, idx) => idx !== index);
      onFilesSelect(updated);
    }
  };

  const handleClearSingle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFileSelect) {
      onFileSelect(null);
    }
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerInputFocus = () => {
    fileInputRef.current?.click();
  };

  // Determine files to show under success/display region
  const filesToShow = onFilesSelect ? selectedFiles : (selectedFile ? [selectedFile] : []);

  return (
    <div className={`space-y-4 ${className}`} id="custom-design-uploader-frame">
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        multiple={!!onFilesSelect}
        accept=".ai,.eps,.pdf,.cdr,.svg,.dxf,.png,.jpg,.jpeg,.zip"
      />

      <AnimatePresence mode="wait">
        {/* If uploads limit is met or uploading right now */}
        {(onFilesSelect && selectedFiles.length >= MAX_FILES_LIMIT) ? (
          <div className="p-4 rounded-xl border border-dashed border-[#ff4773]/30 bg-[#ff4773]/5 text-center text-xs text-[#ff4773] font-mono uppercase tracking-wider block">
            ⭐ Maximum limit of {MAX_FILES_LIMIT} files uploaded. Remove files to upload others.
          </div>
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
                  <span className="text-[9px] font-mono tracking-widest text-[#ffd744] uppercase font-black">Pre-validation Check (Max 5MB each)</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                {uploadProgress}%
              </span>
            </div>

            <div className="relative w-full h-[6px] bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff4773] to-[#ffd744] rounded-full"
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="text-[10px] text-left text-neutral-400 font-normal leading-normal italic flex items-center gap-1">
              <Info className="w-3 h-3 text-[#ff4773] flex-shrink-0" />
              Verifying size constraints and digital print layouts...
            </p>
          </motion.div>
        ) : (
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
            <div className={`p-4 rounded-full border transition-transform duration-300 ${
              isDragActive 
                ? 'bg-[#ff4773]/15 border-[#ff4773] text-[#ff4773] scale-108' 
                : 'bg-white/[0.03] border-white/5 text-neutral-400 group-hover:scale-105'
            }`}>
              <Upload className="w-6 h-6" />
            </div>

            <div className="space-y-1 block max-w-sm">
              <p className="text-white text-xs font-sans font-bold tracking-wider uppercase">
                {onFilesSelect ? `Upload up to ${MAX_FILES_LIMIT} Designs / PDFs` : 'Upload Your Design / Logo / Blueprint'}
              </p>
              <p className="text-[11px] text-neutral-400 font-normal leading-normal">
                Drag & drop files or <span className="text-[#ff4773] font-bold underline">browse drives</span>
              </p>
              <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                Max file size: <span className="text-[#ffd744] font-bold">{MAX_FILE_SIZE_MB}MB</span> each
              </p>
            </div>

            <div className="pt-2 border-t border-white/[0.03] w-full mt-2 flex flex-wrap justify-center gap-1.5 text-[8.5px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">PDF Document</span>
              <span className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">Images (.PNG, .JPG)</span>
              <span className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">Vector (.AI, .EPS, .SVG, .CDR)</span>
            </div>

            {isDragActive && (
              <span className="absolute inset-0 rounded-2xl border-2 border-[#ff4773] pointer-events-none scale-102 transition-transform" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render selected files bucket entries */}
      {filesToShow.length > 0 && (
        <div className="space-y-3 pt-1">
          <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold pl-1">
            Attached Files ({filesToShow.length} / {onFilesSelect ? MAX_FILES_LIMIT : 1}):
          </p>
          
          <div className="grid grid-cols-1 gap-2.5">
            {filesToShow.map((file, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-emerald-500/20 p-3.5 bg-[#0a0f0c] shadow-[0_4px_15px_rgba(16,185,129,0.05)] flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  {/* Base64 preview image thumbnail if available */}
                  {file.previewUrl && (file.type === 'PNG' || file.type === 'JPG' || file.type === 'JPEG') ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-emerald-500/20 bg-black/40 shrink-0 cursor-zoom-in"
                         onClick={() => {
                           // Open preview image in new tab or trigger global event to open lightbox
                           const w = window.open();
                           if(w) w.document.write(`<img src="${file.previewUrl}" style="max-width:100%; max-height:100vh; display:block; margin:auto; background:#111; padding:20px;" />`);
                         }}
                         title="Click to view full image in a new tab"
                    >
                      <img 
                        src={file.previewUrl} 
                        alt="Preview" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                      <FileCheck2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[8.5px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded font-black uppercase">
                        {file.type} FORMAT
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {file.size}
                      </span>
                    </div>
                    <p className="text-xs text-white font-sans font-bold block truncate max-w-[180px] sm:max-w-xs mt-1" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={(e) => onFilesSelect ? removeFileAtIndex(idx, e) : handleClearSingle(e)}
                  className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-500/15 text-neutral-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer shrink-0"
                  title="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

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
