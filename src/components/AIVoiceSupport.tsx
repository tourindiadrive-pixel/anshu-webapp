import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX, 
  X, 
  MessageSquare,
  HelpCircle,
  CornerDownLeft,
  Minimize2,
  Maximize2,
  Settings,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

// Custom local chimes synthesizer for a highly responsive, high-end sensory feedback
const playTone = (type: 'tap' | 'listening' | 'success' | 'toggle') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.012, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'listening') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.06);
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.08);
      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    }
  } catch (error) {
    // Autoplay or audio context permission blocks are caught silently
  }
};

// Define allowed services as an array to cross-reference
const RECOGNIZED_SERVICES = [
  "UV Printing",
  "LED Signage",
  "Custom Apparel Printing",
  "Laser Marking",
  "Corporate Gifting",
  "Trophies & Awards",
  "Digital Printing",
  "Custom Packaging",
  "ID Cards & Lanyards",
  "Home Decor",
  "Wedding Stationery",
  "Photo Gifts",
  "Skins & Wraps",
  "Canvas Art",
  "Restaurant Branding"
];

interface LeadForm {
  name?: string;
  phone?: string;
  city?: string;
  service?: string;
  quantity?: string;
  budget?: string;
  details?: string;
  customization?: string;
}

const collectFields: { key: keyof LeadForm; questionEn: string; questionHi: string; questionHinglish: string }[] = [
  {
    key: 'service',
    questionEn: "Which service from our premium collection (such as UV Printing, LED Signage, Custom Apparel, or Corporate Gifting) do you require?",
    questionHi: "आप अंशू के प्रीमियम कलेक्शन (जैसे UV प्रिंटिंग, LED साइनेज, अपैरल, या कॉर्पोरेट गिफ्टिंग) में से किस सेवा का विवरण जानना चाहते हैं?",
    questionHinglish: "Aapko hamari collections me se kaun sih service chahiye, jaise UV Printing, LED Signage, Custom Apparel ya Corporate Gifting?"
  },
  {
    key: 'quantity',
    questionEn: "Understood. What is the expected quantity required for your project?",
    questionHi: "ठीक है। आपके प्रोजेक्ट के लिए आवश्यक अनुमानित मात्रा (Quantity) क्या है?",
    questionHinglish: "Understood! Aapko is project ke liye approximate kitni quantity chahiye?"
  },
  {
    key: 'customization',
    questionEn: "What customization details, branding preferences, or material elements do you need?",
    questionHi: "आपको किस प्रकार का कस्टमाइजेशन, विशेष डिज़ाइन या ब्रांडिंग प्राथमिकताएँ चाहिए?",
    questionHinglish: "Design me koi special choice, logo customization ya custom specifications hai toh batayein?"
  },
  {
    key: 'name',
    questionEn: "Thank you. May I please have your Name to customize your proposal?",
    questionHi: "धन्यवाद। कोटेशन तैयार करने के लिए कृपया अपना शुभ नाम साझा करें।",
    questionHinglish: "Bohat dhanyawad! Please aap apna Name batayein taaki custom proposal ready kiya ja sake?"
  },
  {
    key: 'phone',
    questionEn: "Could you please share your Mobile Number so we can provide a custom quotation directly?",
    questionHi: "कृपया अपना मोबाइल नंबर साझा करें ताकि हमारी टीम विवरण के साथ आपसे संपर्क कर सके।",
    questionHinglish: "Kya aap apna Mobile / Whatsapp Number share kar sakte hain coordinations ke liye?"
  },
  {
    key: 'city',
    questionEn: "Which City is this order to be delivered or installed in?",
    questionHi: "यह ऑर्डर किस शहर (City) में डिलीवर या इंस्टॉल किया जाना है?",
    questionHinglish: "Yeh order kis City ya Location par deliver custom-install karna hai?"
  },
  {
    key: 'budget',
    questionEn: "What is your estimated Budget Range for this project?",
    questionHi: "इस प्रोजेक्ट के लिए आपका अनुमानित बजट रेंज क्या है?",
    questionHinglish: "Aapka approximate Budget Range kitna rahega is premium collection ke liye?"
  },
  {
    key: 'details',
    questionEn: "Are there any specific project details, sizing preferences, or deadlines we should note?",
    questionHi: "क्या कोई और विशिष्ट प्रोजेक्ट विवरण या आवश्यक समय सीमा (Deadlines) है जिसका हमें ध्यान रखना चाहिए?",
    questionHinglish: "Iske alawa koi extra layout preferences, sizing ya deadline jo hum note kar sakein?"
  }
];

const parseInitialDetails = (input: string): LeadForm => {
  const low = input.toLowerCase();
  const form: LeadForm = {};

  // Detect Service
  if (low.includes("uv") && low.includes("print")) form.service = "UV Printing";
  else if (low.includes("neon") || low.includes("sign") || low.includes("led")) form.service = "LED Signage";
  else if (low.includes("apparel") || low.includes("t-shirt") || low.includes("tshirt") || low.includes("shirt")) form.service = "Custom Apparel Printing";
  else if (low.includes("laser") || low.includes("mark")) form.service = "Laser Marking";
  else if (low.includes("corporate") || low.includes("gift")) form.service = "Corporate Gifting";
  else if (low.includes("trophy") || low.includes("award")) form.service = "Trophies & Awards";
  else if (low.includes("digital") && low.includes("print")) form.service = "Digital Printing";
  else if (low.includes("pack") || low.includes("box")) form.service = "Custom Packaging";
  else if (low.includes("id card") || low.includes("lanyard")) form.service = "ID Cards & Lanyards";
  else if (low.includes("home") || low.includes("decor")) form.service = "Home Decor";
  else if (low.includes("wedding") || low.includes("stationery") || low.includes("invitation")) form.service = "Wedding Stationery";
  else if (low.includes("photo")) form.service = "Photo Gifts";
  else if (low.includes("skin") || low.includes("wrap")) form.service = "Skins & Wraps";
  else if (low.includes("canvas") || low.includes("art")) form.service = "Canvas Art";
  else if (low.includes("restaurant")) form.service = "Restaurant Branding";

  // Detect Quantity
  const qtyMatch = input.match(/\b(\d+)\s*(pcs|qty|pieces|units|quantity|pices|items|दर|पीस)\b/i) || input.match(/\b(quantty|quantity|qty|pcs)[:\s=]+(\d+)\b/i);
  if (qtyMatch) {
    form.quantity = qtyMatch[1] || qtyMatch[2];
  } else {
    const standaloneNum = input.match(/\b(\d{1,4})\b/);
    if (standaloneNum && parseInt(standaloneNum[1]) > 5 && !low.includes("rs") && !low.includes("₹") && !low.includes("phone") && !low.includes("mobile") && !low.includes("year")) {
      form.quantity = standaloneNum[1];
    }
  }

  // Detect City
  const cities = ["mumbai", "delhi", "bangalore", "bengaluru", "kolkata", "chennai", "hyderabad", "pune", "ahmedabad", "jaipur", "lucknow", "noida", "gurgaon", "gurugram", "indore", "surat", "patna", "bhopal", "chandigarh"];
  for (const city of cities) {
    if (low.includes(city)) {
      form.city = city.charAt(0).toUpperCase() + city.slice(1);
      break;
    }
  }

  // Detect Budget
  const budgetMatch = input.match(/(?:rs|inr|₹|budget|price|range|approx)\.?\s*(\d+[\d,]*k?)/i);
  if (budgetMatch) {
    form.budget = budgetMatch[1];
  }

  return form;
};

const UI_TRANSLATIONS = {
  en: {
    subtitle: "Premium Design Consultant",
    speakTab: "Speak",
    typeTab: "Type",
    placeholderStatusListening: "Speak now. I am listening...",
    placeholderStatusSpeaking: "Aura is speaking...",
    placeholderStatusStandby: "Tap the sphere and describe your vision. Tap again when done to print magic.",
    inputPlaceholder: "Type premium brand custom specifications...",
    listeningLabel: "Listening",
    speakingLabel: "Speaking",
    tapSpeakLabel: "Tap Speak",
    settingsTitle: "Aura Settings",
    selectLanguage: "Language Preference",
    langEn: "English (US/UK)",
    langHi: "हिन्दी (Hindi)",
    langHing: "Hinglish (Hindi + English)",
    saveBtn: "Close & Save",
    quickActionTitle: "Suggested Quick Actions (📍 Location, 💬 WhatsApp, etc):",
    directSupportTitle: "Direct Premium Support",
    suggestedTriggersTitle: "💡 Direct Quick Suggestions (Auto-Chat Triggers):",
    leadTimesBadge: "🕒 Lead Times",
    directSalesBadge: "📞 Direct Sales",
    leatherDiariesBadge: "📔 Leather Diaries",
    sendButtonTitle: "Send query",
    activeMicCapture: "🎙️ Active microphone capture...",
    chatMinimized: "💬 Chat session is minimized",
    settingsBack: "Back to Chat",
    descriptionText: "Customize your real-time chat & vocal interaction language preference. Aura adapts seamlessly to your natural language style."
  },
  hi: {
    subtitle: "लक्जरी प्रिंट सलाहकार",
    speakTab: "बोलें",
    typeTab: "लिखें",
    placeholderStatusListening: "अभी बोलें। मैं सुन रही हूँ...",
    placeholderStatusSpeaking: "ऑरा बोल रही है...",
    placeholderStatusStandby: "गोले पर टैप करें और अपना विचार बताएं। मैजिक प्रिंट करने के लिए फिर से टैप करें।",
    inputPlaceholder: "प्रीमियम ब्रांड कस्टमाइजेशन विवरण टाइप करें...",
    listeningLabel: "सुन रही हूँ",
    speakingLabel: "बोल रही हूँ",
    tapSpeakLabel: "टैप करें",
    settingsTitle: "ऑरा सेटिंग्स",
    selectLanguage: "भाषा प्राथमिकता",
    langEn: "अंग्रेजी (English)",
    langHi: "हिन्दी (Hindi)",
    langHing: "हिंग्लिश (Hinglish)",
    saveBtn: "बंद करें और सहेजें",
    quickActionTitle: "त्वरित कार्रवाई सुझाव (📍 लोकेशन, 💬 व्हाट्सएप आदि):",
    directSupportTitle: "सीधा प्रीमियम सपोर्ट",
    suggestedTriggersTitle: "💡 त्वरित सुझाव (ऑटो-चैट ट्रिगर):",
    leadTimesBadge: "🕒 डिलीवरी समय",
    directSalesBadge: "📞 सीधा संपर्क",
    leatherDiariesBadge: "📔 लेदर डायरी",
    sendButtonTitle: "संदेश भेजें",
    activeMicCapture: "🎙️ सक्रिय माइक्रोफ़ोन कैप्चर...",
    chatMinimized: "💬 चैट सत्र छोटा किया गया है",
    settingsBack: "चैट पर वापस जाएं",
    descriptionText: "अपनी रीयल-टाइम चैट और वॉयस इंटरैक्शन के लिए भाषा प्राथमिकता चुनें। ऑरा आपकी प्राकृतिक भाषा शैली के अनुसार ढल जाती है।"
  },
  hinglish: {
    subtitle: "Premium Design Consultant",
    speakTab: "Bolkar",
    typeTab: "Type karke",
    placeholderStatusListening: "Abhi boliye. Main sun rahi hoon...",
    placeholderStatusSpeaking: "Aura bol rahi hai...",
    placeholderStatusStandby: "Sphere par tap karein aur apna idea share karein. Print magic ke liye fir se tap karein.",
    inputPlaceholder: "Premium brand custom details type karein...",
    listeningLabel: "Sun rahi hoon",
    speakingLabel: "Speak kar rahi",
    tapSpeakLabel: "Tap Speak",
    settingsTitle: "Aura Settings",
    selectLanguage: "Language Preference",
    langEn: "English (Angrezi)",
    langHi: "Hindi (हिन्दी)",
    langHing: "Hinglish (Hindi + English)",
    saveBtn: "Close & Save",
    quickActionTitle: "Suggested Quick Actions (📍 Location, 💬 WhatsApp, etc):",
    directSupportTitle: "Direct Premium Support",
    suggestedTriggersTitle: "💡 Direct Quick Suggestions (Auto-Chat Triggers):",
    leadTimesBadge: "🕒 Delivery Time",
    directSalesBadge: "📞 Direct Contact",
    leatherDiariesBadge: "📔 Leather Diary",
    sendButtonTitle: "Send karein",
    activeMicCapture: "🎙️ Microphone active hai...",
    chatMinimized: "💬 Chat session minimized hai",
    settingsBack: "Chat par wapas",
    descriptionText: "Apni language setting customize karein. Aura aapki natural language style ke sath instantly adapt ho jayegi."
  }
};

const getWelcomeText = (lang: 'en' | 'hi' | 'hinglish') => {
  switch (lang) {
    case 'hi':
      return "नमस्ते! अंशू के प्रीमियम बुकिंग एंड इन्क्वायरी लाउंज में आपका स्वागत है। मैं आपकी डिज़ाइन सलाहकार ऑरा हूँ। हम नए ऑर्डर्स स्वीकार कर रहे हैं! क्या आप अपनी ब्रांडिंग आवश्यकताओं के बारे में बोलना या लिखना पसंद करेंगे?";
    case 'hinglish':
      return "Greetings! Anshu's Premium Booking & Enquiry Lounge mein aapka swagat hai. Main hoon Aura, aapki design consultant. Hum new orders accept kar rahe hain! Kya aap bolna chahenge ya type karke details share karenge?";
    default:
      return "Greetings! Welcome to Anshu's Premium Booking & Enquiry Lounge. I am Aura, your premium design consultant. We are fully accepting new orders! Would you like to speak or type your custom branding specifications today?";
  }
};

export default function AIVoiceSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // 'voice' implies voice-to-voice interaction; 'text' implies text chat
  const [interactionMode, setInteractionMode] = useState<'voice' | 'text'>('voice');
  
  // Conversational state variables
  const [leadForm, setLeadForm] = useState<LeadForm>({});
  const [isCollecting, setIsCollecting] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi' | 'hinglish'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aura_selected_lang');
      if (saved === 'en' || saved === 'hi' || saved === 'hinglish') {
        return saved;
      }
    }
    return 'en';
  });
  const [isHindiMode, setIsHindiMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aura_selected_lang');
      return saved === 'hi' || saved === 'hinglish';
    }
    return false;
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const t = UI_TRANSLATIONS[selectedLang];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pre-chat quick actions and price estimate flows
  const [printingOptionsActive, setPrintingOptionsActive] = useState(false);
  const [priceEstimateActive, setPriceEstimateActive] = useState(false);
  const [priceEstimateStep, setPriceEstimateStep] = useState(0);

  // Unified Message History (Session Continuity preserved)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('aura_selected_lang') as 'en' | 'hi' | 'hinglish' || 'en') : 'en';
    const lang = (savedLang === 'en' || savedLang === 'hi' || savedLang === 'hinglish') ? savedLang : 'en';
    return [
      {
        id: 'welcome-1',
        role: 'assistant',
        text: getWelcomeText(lang),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  
  // Voice Synthesis & Recognition states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Refs for auto scrolling & API instances
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-scroll chat history on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, interimTranscript, interactionMode]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Set up Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Native Speech-to-Text is not supported on this browser. Aura will use high-intelligence keyboard simulation instead!");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => {
      setIsListening(true);
      setInterimTranscript('');
      setSpeechError(null);
      // Stop speech synthesis if user talks
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };

    rec.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interim || final);

      if (final.trim()) {
        handleUserSpeechCommitted(final);
      }
    };

    rec.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error === 'not-allowed') {
        setSpeechError("Microphone permission denied. Please grant microphone access in browser settings.");
      } else {
        setSpeechError(`Voice capture error: ${event.error}.`);
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, []);

  // Sync browser speech-to-text capture language preference dynamically
  useEffect(() => {
    if (recognitionRef.current) {
      if (selectedLang === 'hi' || selectedLang === 'hinglish') {
        recognitionRef.current.lang = 'hi-IN';
      } else {
        recognitionRef.current.lang = 'en-US';
      }
    }
  }, [selectedLang]);

  // Manage manual language preference selections & persistence
  const handleLanguageChange = (newLang: 'en' | 'hi' | 'hinglish') => {
    playTone('toggle');
    setSelectedLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_selected_lang', newLang);
    }
    setIsHindiMode(newLang === 'hi' || newLang === 'hinglish');
    
    // Dynamic welcome message updates for seamless localization
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome-1') {
        return [
          {
            ...prev[0],
            text: getWelcomeText(newLang)
          }
        ];
      }
      return prev;
    });
  };

  // Listen to toggle trigger: Stop listening/synthesis when switching modes to keep clean states
  const handleToggleMode = (mode: 'voice' | 'text') => {
    playTone('toggle');
    setInteractionMode(mode);
    setSpeechError(null);
    setInterimTranscript('');
    
    // Stop speaking & listening instantly
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (err) {}
      setIsListening(false);
    }
  };

  // Speaks out the AI text with beautiful synthesis and highlight
  const speakAIText = (text: string) => {
    if (isMuted || !window.speechSynthesis) return;

    // Stop current voice
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to pick a premium high-quality voice
    const voices = window.speechSynthesis.getVoices();
    let premiumVoice;
    if (selectedLang === 'hi' || selectedLang === 'hinglish') {
      premiumVoice = voices.find(v => v.lang.startsWith('hi') || v.name.includes('Google हिन्दी') || v.name.includes('Lekha'));
    }
    if (!premiumVoice) {
      premiumVoice = voices.find(v => 
        v.name.includes('Google US English') || 
        v.name.includes('Google UK English Female') || 
        v.name.includes('Daniel') || 
        v.name.includes('Samantha') ||
        v.lang.startsWith('en')
      );
    }
    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }
    
    utterance.rate = 1.05; // Elegant professional flow
    utterance.pitch = 1.05; // Silk luxury clarity

    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      // Auto-reactivate microphone in voice mode to keep the hands-free voice-to-voice flow going!
      if (interactionMode === 'voice' && isOpen && !isMinimized && !isMuted) {
        startMicCapture();
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Triggers Microphone Listening
  const startMicCapture = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    if (!recognitionRef.current) {
      // Simulate system capture if Speech API is completely bricked
      simulateUserVoiceTrigger();
      return;
    }

    playTone('listening');
    try {
      recognitionRef.current.start();
    } catch (err) {
      // Already running or state mismatch: safely reset
      try {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      } catch (e) {}
    }
  };

  // Stops Microphone Listening
  const stopMicCapture = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  // Handles finalized user speech
  const handleUserSpeechCommitted = (text: string) => {
    if (!text.trim()) return;
    
    playTone('success');
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInterimTranscript('');
    
    // Simulate thinking delay then output luxurious answer
    setTimeout(() => {
      processAuraResponse(text);
    }, 850);
  };

  // Submits a Text Mode input
  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    playTone('tap');
    const query = inputText;
    setInputText('');

    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);

    setTimeout(() => {
      processAuraResponse(query);
    }, 700);
  };

  // Fast tapping prompt badges
  const handleBadgeClick = (text: string) => {
    playTone('tap');
    setInputText(text);
    // Submit query automatically after setting text
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);

    setTimeout(() => {
      processAuraResponse(text);
    }, 700);
  };

  const handleQuickAction = (actionId: string, label: string) => {
    playTone('tap');
    
    // Add user message to history
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: label,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMessage]);

    setTimeout(() => {
      if (actionId === 'location') {
        const replyEn = "Would you like our shop location or would you prefer to share your location so we can guide you?";
        const replyHi = "क्या आप हमारी शॉप की लोकेशन चाहते हैं या आप अपनी लोकेशन शेयर करना पसंद करेंगे ताकि हम आपको गाइड कर सकें?";
        const reply = isHindiMode ? replyHi : replyEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(reply);
      }
      else if (actionId === 'call') {
        const replyEn = "You can call our team directly at:\n+91 XXXXX XXXXX\n(Or join us at +91 99999 99999)";
        const replyHi = "आप हमारी सेल्स टीम से सीधे संपर्क कर सकते हैं:\n+91 XXXXX XXXXX\n(या हमसे तुरंत +91 99999 99999 पर जुड़ सकते हैं)";
        const reply = isHindiMode ? replyHi : replyEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(reply);
      }
      else if (actionId === 'whatsapp') {
        const replyEn = "Connecting you directly on WhatsApp at +91 XXXXX XXXXX! Let us design some outstanding prints for you.";
        const replyHi = "हम आपको WhatsApp (+91 XXXXX XXXXX) पर तुरंत कनेक्ट कर रहे हैं! आपके प्रीमियम प्रोजेक्ट्स के कस्टमाइज़ेशन के लिए हमारी टीम तत्पर है।";
        const reply = isHindiMode ? replyHi : replyEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(reply);
      }
      else if (actionId === 'print_what') {
        setPrintingOptionsActive(true);
        const replyEn = "Great! What would you like to get printed today?";
        const replyHi = "बहुत बढ़िया! आप आज हमसे क्या प्रिंट करवाना चाहते हैं?";
        const reply = isHindiMode ? replyHi : replyEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(reply);
      }
      else if (actionId === 'price_estimate') {
        setPriceEstimateActive(true);
        setPriceEstimateStep(1);

        const replyEn = "Let's build your quotation estimate! Step 1: Which service from our premium collections do you require? (e.g., UV Printing, LED Signage, Custom Apparel)";
        const replyHi = "आइए आपका कोटेशन अनुमान तैयार करें! चरण 1: आपको किस प्रीमियम सर्विस की आवश्यकता है? (जैसे, UV प्रिंटिंग, LED साइनेज)";
        const reply = isHindiMode ? replyHi : replyEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(reply);
      }
      else {
        const serviceMap: Record<string, string> = {
          business_branding: "Business Branding",
          corporate_gifting: "Corporate Gifting",
          wedding_printing: "Wedding Stationery",
          tshirt_printing: "Custom Apparel Printing",
          led_signage: "LED Signage"
        };
        const selected = serviceMap[actionId] || label;
        
        setLeadForm({ service: selected });
        setIsCollecting(true);
        setCurrentFieldIndex(1); // Set to quantity
        
        const replyEn = `Splendid! Let's build your customized proposal for ${selected}. What is the expected quantity required for your project?`;
        const replyHi = `बहुत बढ़िया! आइए ${selected} के लिए आपका कस्टमाइज़्ड कोटेशन तैयार करें। आपके प्रोजेक्ट के लिए आवश्यक अनुमानित मात्रा (Quantity) क्या है?`;
        const reply = isHindiMode ? replyHi : replyEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(reply);
      }
    }, 700);
  };

  const handlePrintOptionClick = (option: string) => {
    playTone('tap');
    
    // Add user message to history
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: option,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    setPrintingOptionsActive(false);

    // Auto trigger lead collection for this service starting with Quantity!
    setTimeout(() => {
      setLeadForm({ service: option });
      setIsCollecting(true);
      setCurrentFieldIndex(1); // Set key index to quantity

      const replyEn = `Wonderful choice: ${option}! What is the expected quantity required for your project?`;
      const replyHi = `बहुत बढ़िया पसंद: ${option}! आपके इस प्रोजेक्ट के लिए आवश्यक अनुमानित मात्रा (Quantity) कितनी है?`;
      const reply = isHindiMode ? replyHi : replyEn;

      const newAIMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAIMsg]);
      speakAIText(reply);
    }, 700);
  };

  const processAuraResponse = (userInput: string) => {
    const textLow = userInput.toLowerCase();

    // Language detection: automatically adapt to Hindi, English, or Hinglish
    const englishMatches = ["english", "speak english", "talk in english", "angrezi", "en"];
    const hindiMatches = [
      "hindi", "हिन्दी", "talk in hindi", "bol", "naam kya", "batao", "शहर", "बजट", 
      "shahar", "bajat", "daam", "namaste", "namaskar", "kya hai", "kitna hai", "karo", "naam",
      "bataiye", "bata", "karna hai", "chahie", "chahiye", "dam", "paise", "rupya", "rupaye",
      "banwana hai", "karwana hai", "karna hai", "kardo", "milna hai", "pata", "batao"
    ];
    
    let currentL = selectedLang;
    if (/[\u0900-\u097F]/.test(userInput)) {
      currentL = 'hi';
      setSelectedLang('hi');
      localStorage.setItem('aura_selected_lang', 'hi');
      setIsHindiMode(true);
    } else if (englishMatches.some(m => textLow.includes(m))) {
      currentL = 'en';
      setSelectedLang('en');
      localStorage.setItem('aura_selected_lang', 'en');
      setIsHindiMode(false);
    } else if (hindiMatches.some(m => textLow.includes(m))) {
      if (selectedLang === 'en') {
        currentL = 'hinglish';
        setSelectedLang('hinglish');
        localStorage.setItem('aura_selected_lang', 'hinglish');
        setIsHindiMode(true);
      }
    }

    const isHindi = currentL === 'hi' || currentL === 'hinglish';

    // 1. If currently active in price estimation flow
    if (priceEstimateActive) {
      if (priceEstimateStep === 1) { // Got Service
        const serviceName = userInput;
        setLeadForm(prev => ({ ...prev, service: serviceName }));
        setPriceEstimateStep(2);
        
        const qEn = "Understood. What is the expected quantity required for your project?";
        const qHi = "ठीक है। आपके प्रोजेक्ट के लिए आवश्यक अनुमानित मात्रा (Quantity) क्या है?";
        const qHing = "Understood! Aapko is project ke liye approximate kitni quantity chahiye?";
        const responseText = currentL === 'hinglish' ? qHing : currentL === 'hi' ? qHi : qEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(responseText);
      } 
      else if (priceEstimateStep === 2) { // Got Quantity
        const qty = userInput;
        setLeadForm(prev => ({ ...prev, quantity: qty }));
        setPriceEstimateStep(3);

        const qEn = "Got it. Is design assistance or a custom brand layout required, or do you have a print-ready design?";
        const qHi = "समझ गए। क्या आपको डिज़ाइन सहायता (Custom Design) की आवश्यकता है, या आपके पास प्रिंट करने के लिए डिज़ाइन तैयार है?";
        const qHing = "Got it! Kya aapko custom design ki help chahiye ya aapke paas print-ready design ready hai?";
        const responseText = currentL === 'hinglish' ? qHing : currentL === 'hi' ? qHi : qEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(responseText);
      } 
      else if (priceEstimateStep === 3) { // Got Custom Design preference
        const customization = userInput;
        setLeadForm(prev => ({ ...prev, customization: customization }));
        setPriceEstimateStep(4);

        const qEn = "What is your estimated Budget Range for this project?";
        const qHi = "इस प्रोजेक्ट के लिए आपका अनुमानित बजट रेंज या सीमा क्या है?";
        const qHing = "Is project ke liye aapka estimated budget range kya hoga?";
        const responseText = currentL === 'hinglish' ? qHing : currentL === 'hi' ? qHi : qEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(responseText);
      } 
      else if (priceEstimateStep === 4) { // Got Budget Range
        const budgetVal = userInput;
        const finalForm = { ...leadForm, budget: budgetVal };
        setLeadForm(finalForm);
        
        // Price Estimate is complete!
        setPriceEstimateActive(false);
        setPriceEstimateStep(0);

        // Turn on standard lead collection starting with name (index 3) to record the lead properly!
        setIsCollecting(true);
        setCurrentFieldIndex(3); // 'name' index in collectFields

        const qEn = "Perfect. Our team can prepare a quotation for you! To share it directly, may I please get your Name first?";
        const qHi = "बेहतरीन! हमारी टीम आपके लिए विशेष कोटेशन तैयार कर सकती है। इसे आप तक पहुँचाने के लिए, क्या मैं पहले आपका नाम (Name) जान सकती हूँ?";
        const qHing = "Sunder! Hamari team aapke liye special quotation ready karegi. Isko directly share karne ke liye, kya main pehle aapka Name jaan sakti hoon?";
        const responseText = currentL === 'hinglish' ? qHing : currentL === 'hi' ? qHi : qEn;

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(responseText);
      }
      return;
    }

    // 2. If currently active in lead collection
    if (isCollecting) {
      const currentField = collectFields[currentFieldIndex].key;
      const updatedForm = { ...leadForm, [currentField]: userInput };
      setLeadForm(updatedForm);

      // Find the absolute next missing index in our fields array
      let nextIndex = -1;
      for (let i = 0; i < collectFields.length; i++) {
        const key = collectFields[i].key;
        if (!updatedForm[key]) {
          nextIndex = i;
          break;
        }
      }

      if (nextIndex !== -1) {
        setCurrentFieldIndex(nextIndex);
        const nextQ = currentL === 'hinglish' 
          ? collectFields[nextIndex].questionHinglish 
          : currentL === 'hi' 
            ? collectFields[nextIndex].questionHi 
            : collectFields[nextIndex].questionEn;
        
        const responseText = nextQ;
        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(responseText);
      } else {
        // Form is fully compiled! Clear state and save to Anshu local CRM
        setIsCollecting(false);
        const finalForm = { ...updatedForm };
        setLeadForm({});
        setCurrentFieldIndex(0);

        // Persist the collected lead to the CRM database local storage array!
        try {
          const stored = localStorage.getItem("anshu_enquiries_v1");
          let enquiries = [];
          if (stored) {
            enquiries = JSON.parse(stored);
          }
          
          const formattedTimestamp = new Date().toLocaleString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          const newEnquiry = {
            id: `enquiry-${Date.now()}`,
            name: finalForm.name || "Aura Lead",
            phone: finalForm.phone || "+91 XXXXX XXXXX",
            city: finalForm.city || "Not Specified",
            serviceType: finalForm.service || "Bespoke Query",
            budgetRange: finalForm.budget || "TBD (Design Discussion)",
            message: finalForm.details || `Sourcing premium customized specifications. Quantity requested: ${finalForm.quantity || 'TBD'}. Custom design: ${finalForm.customization || 'Yes'}.`,
            timestamp: formattedTimestamp,
            status: "New"
          };

          localStorage.setItem("anshu_enquiries_v1", JSON.stringify([newEnquiry, ...enquiries]));
          window.dispatchEvent(new Event("storage"));
        } catch (e) {
          console.error("Failed to save voice assistant lead:", e);
        }

        const successText = currentL === 'hinglish'
          ? "Thank you! Aapki inquiry register ho gayi hai. Hamari team jaldi hi special solution ke saath aapse contact karegi."
          : currentL === 'hi'
            ? "धन्यवाद। आपकी पूछताछ दर्ज कर ली गई है। हमारी टीम जल्द ही आपके पास एक बेहतरीन समाधान के साथ संपर्क करेगी।"
            : "Thank you. Your inquiry has been recorded. Our team will contact you shortly with the best solution.";

        const newAIMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: successText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newAIMsg]);
        speakAIText(successText);
      }
      return;
    }

    // 📍 Location Trigger
    if (textLow.includes("location") || textLow.includes("address") || textLow.includes("pata") || textLow.includes("map") || textLow.includes("shop kahan") || textLow.includes("kahan hai")) {
      const replyEn = "Would you like our shop location or would you prefer to share your location so we can guide you?";
      const replyHi = "क्या आप हमारी शॉप की लोकेशन चाहते हैं या आप अपनी लोकेशन शेयर करना पसंद करेंगे ताकि हम आपको गाइड कर सकें?";
      const replyHing = "Kya aap hamari shop ki location chahte hain ya apni location share karenge taaki hum aapko easily guide kar sakein?";
      const reply = currentL === 'hinglish' ? replyHing : currentL === 'hi' ? replyHi : replyEn;

      const newAIMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAIMsg]);
      speakAIText(reply);
      return;
    }

    // 📞 Call Now / Phone Trigger
    if (textLow.includes("call now") || textLow.includes("number") || textLow.includes("phone") || textLow.includes("contact") || textLow.includes("call me") || textLow.includes("baat kara")) {
      const replyEn = "You can call our team directly at:\n+91 XXXXX XXXXX\n(Or reach us at +91 99999 99999)";
      const replyHi = "आप हमारी सेल्स टीम से सीधे संपर्क कर सकते हैं:\n+91 XXXXX XXXXX\n(या हमसे तुरंत +91 99999 99999 पर जुड़ सकते हैं)";
      const replyHing = "Aap hamari sales team ko directly call kar sakte hain:\n+91 XXXXX XXXXX\n(Ya humse instantly +91 99999 99999 par connect kar sakte hain)";
      const reply = currentL === 'hinglish' ? replyHing : currentL === 'hi' ? replyHi : replyEn;

      const newAIMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAIMsg]);
      speakAIText(reply);
      return;
    }

    // 💬 WhatsApp Trigger
    if (textLow.includes("whatsapp") || textLow.includes("chat window") || textLow.includes("message us")) {
      const replyEn = "Connecting you directly on WhatsApp at +91 XXXXX XXXXX! Let us design some outstanding prints for you.";
      const replyHi = "हम आपको WhatsApp (+91 XXXXX XXXXX) पर तुरंत कनेक्ट कर रहे हैं! आपके प्रीमियम प्रोजेक्ट्स के कस्टमाइज़ेशन के लिए हमारी टीम तत्पर है।";
      const replyHing = "Hum aapko WhatsApp (+91 XXXXX XXXXX) par instantly connect kar rahe hain! Aapke premium project customization ke liye hamari team ready hai.";
      const reply = currentL === 'hinglish' ? replyHing : currentL === 'hi' ? replyHi : replyEn;

      const newAIMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAIMsg]);
      speakAIText(reply);
      return;
    }

    // 4. Fallback or general lead triggers
    const conversionTriggers = [
      "price", "cost", "quote", "pricing", "inquiry", "enquiry", "order", "buy", "purchase", "custom", 
      "design", "specification", "how much", "charges", "rate", "daam", "rate kya hai", "estimation", 
      "quotation", "want", "need", "looking for", "इंटरेस्ट", "ऑर्डर", "पसंद", "चाहिए", "खरीदना",
      "gifting", "neon", "sign", "packaging", "wedding", "apparel", "marking", "trophy",
      "uv print", "lanyard", "restaurant branding", "decor", "print magic", "enquire", "get quote", "estimate"
    ];

    const hasTrigger = conversionTriggers.some(t => textLow.includes(t)) || 
                       RECOGNIZED_SERVICES.some(s => textLow.includes(s.toLowerCase()));

    if (hasTrigger) {
      // Direct quotation flow starting
      setPriceEstimateActive(true);
      setPriceEstimateStep(1);

      const preAmbleEn = "Pricing depends on quantity, design and customization requirements. Let's design a quick estimate! Step 1: Which of our premium printing, packaging, sign or gift services do you require?";
      const preAmbleHi = "प्राइजिंग मात्रा, डिज़ाइन्स और मटेरियल आवश्यकताओं पर निर्भर करती है। आइए तुरंत आपका कोटेशन अनुमान तैयार करें! चरण 1: आपको किस प्रीमियम सर्विस की आवश्यकता है?";
      const preAmbleHing = "Quotation pricing quality standard aur quantities par depend karti hai. Aao fast estimate banate hain! Step 1: Humein kaun si service design karni hai?";
      const reply = currentL === 'hinglish' ? preAmbleHing : currentL === 'hi' ? preAmbleHi : preAmbleEn;

      const newAIMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAIMsg]);
      speakAIText(reply);
      return;
    }

    // 5. Evaluate exact matched items from the official FAQs
    let matchTextEn = "";
    let matchTextHi = "";
    let matchTextHing = "";

    if (textLow.includes("service") || textLow.includes("provide") || textLow.includes("kya kya") || textLow.includes("kaun si") || textLow.includes("kaunsi") || textLow.includes("suvidha")) {
      matchTextEn = "We offer premium printing, branding, signage, gifting and customization solutions for individuals and businesses.";
      matchTextHi = "हम व्यक्तिगत उपयोग और व्यवसायों के लिए प्रीमियम प्रिंटिंग, ब्रांडिंग, साइनेज, गिफ्टिंग और कस्टमाइजेशन समाधान प्रदान करते हैं।";
      matchTextHing = "Hum individuals aur businesses ke liye premium printing, branding, signage aur customized gifting solutions offer karte hain.";
    }
    else if (textLow.includes("custom print") || textLow.includes("customization") || textLow.includes("apne design") || textLow.includes("kustm") || textLow.includes("khud ka")) {
      matchTextEn = "Yes, most of our products and services can be customized according to your requirements.";
      matchTextHi = "हाँ, हमारे अधिकांश उत्पादों और सेवाओं को आपकी आवश्यकताओं के अनुसार कस्टमाइज़ किया जा सकता है।";
      matchTextHing = "Haan, humare maximum products aur services aapki requirements ke hisab se design and customize ho sakte hain.";
    }
    else if (textLow.includes("bulk") || textLow.includes("corporate order") || textLow.includes("wholesale") || textLow.includes("badi quantity") || textLow.includes("bade order") || textLow.includes("thok")) {
      matchTextEn = "Yes, we accept both individual and bulk corporate orders.";
      matchTextHi = "हाँ, हम व्यक्तिगत और थोक दोनों कॉरपोरेट ऑर्डर स्वीकार करते हैं।";
      matchTextHing = "Haan, hum single order aur bulk corporate orders dono accept karte hain.";
    }
    else if (textLow.includes("corporate gift") || textLow.includes("gifting") || textLow.includes("client gift") || textLow.includes("office gift") || textLow.includes("upaar")) {
      matchTextEn = "Yes, we offer customized corporate gifting solutions for businesses and events.";
      matchTextHi = "हाँ, हम व्यवसायों और कार्यक्रमों के लिए कस्टमाइज़्ड कॉर्पोरेट गिफ्टिंग समाधान प्रदान करते हैं।";
      matchTextHing = "Haan, hum businesses aur standard events ke liye customize corporate gifting solutions provide karte hain.";
    }
    else if (textLow.includes("led sign") || textLow.includes("neon") || textLow.includes("signage") || textLow.includes("board") || textLow.includes("facia")) {
      matchTextEn = "Yes, we provide custom LED signage and illuminated branding solutions.";
      matchTextHi = "हाँ, हम कस्टम LED साइनेज और इल्लुमिनेटेड ब्रांडिंग समाधान प्रदान करते हैं।";
      matchTextHing = "Haan, hum custom LED signage aur glowing/illuminated branding board design karte hain.";
    }
    else if (textLow.includes("wedding") || textLow.includes("invitation") || textLow.includes("stationery") || textLow.includes("card") || textLow.includes("vivah") || textLow.includes("shaadi") || textLow.includes("shadi")) {
      matchTextEn = "Yes, we provide premium wedding invitations and customized wedding stationery.";
      matchTextHi = "हाँ, हम प्रीमियम शादी के निमंत्रण कार्ड और कस्टमाइज़्ड विवाह स्टेशनरी प्रदान करते हैं।";
      matchTextHing = "Haan bhaiya, hum premium wedding invitation cards aur fully customized wedding stationery print karte hain.";
    }
    else if (textLow.includes("personalized gift") || textLow.includes("personal gift") || textLow.includes("photo gift") || textLow.includes("tohfe") || textLow.includes("photo frame")) {
      matchTextEn = "Yes, we provide customized gifts, photo gifts and premium gifting products.";
      matchTextHi = "हाँ, हम कस्टमाइज़्ड गिफ्ट, फोटो गिफ्ट और प्रीमियम गिफ्टिंग उत्पाद प्रदान करते हैं।";
      matchTextHing = "Haan ji, hum customized gift items, beautiful photo gifts aur corporate return premium options provide karte hain.";
    }
    else if (textLow.includes("quotation") || textLow.includes("quot") || textLow.includes("quotation kaise") || textLow.includes("rate kaise") || textLow.includes("daam kaise")) {
      matchTextEn = "Please share your requirements, quantity and customization details. Our team will prepare a quotation.";
      matchTextHi = "कृपया अपनी ज़रूरतें, मात्रा और कस्टमाइजेशन विवरण साझा करें। हमारी टीम आपके लिए कोटेशन तैयार करेगी।";
      matchTextHing = "Aap please apni specifications, quantity aur customization detail share kijiye, hamari design team quotation banakar share kar degi.";
    }
    else if (textLow.includes("design support") || textLow.includes("assistant") || textLow.includes("assistance") || textLow.includes("designer") || textLow.includes("support")) {
      matchTextEn = "Yes, design assistance is available depending on project requirements.";
      matchTextHi = "हाँ, प्रोजेक्ट की आवश्यकताओं के आधार पर डिजाइन सहायता उपलब्ध है।";
      matchTextHing = "Haan, aapke project requirement ke details ke base par expert designers ka support available kiya jayega.";
    }
    else if (textLow.includes("hello") || textLow.includes("hi ") || textLow.includes("hey") || textLow.includes("namaste") || textLow.includes("namaskar") || textLow.includes("greetings")) {
      matchTextEn = "Greetings! Welcome to Anshu's Premium Booking & Enquiry Lounge. I am Aura, your executive design assistant. We are currently actively accepting new orders! Are you looking to customize corporate gifting, LED signage, or custom apparel today?";
      matchTextHi = "नमस्ते! अंशू के प्रीमियम बुकिंग एंड इन्क्वायरी लाउंज में आपका स्वागत है। मैं आपकी डिज़ाइन सलाहकार ऑरा हूँ। हम वर्तमान में नए ऑर्डर्स स्वीकार कर रहे हैं! क्या आप कॉर्पोरेट उपहार, एलईडी साइनेज, या कस्टम परिधान कस्टमाइज़ करना चाहते हैं?";
      matchTextHing = "Namaste! Anshu's Premium Booking & Enquiry Lounge me aapka swagat hai. Main aapki design executive assistant, Aura hoon. Hum naye orders accept kar rahe hain! Aaj aap kya design / print karwana chahenge?";
    }

    if (matchTextEn) {
      const response = currentL === 'hinglish' ? matchTextHing : currentL === 'hi' ? matchTextHi : matchTextEn;
      const newAIMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, newAIMsg]);
      speakAIText(response);
      return;
    }

    // 6. Fallback when information is completely unavailable
    // Say clearly that we don't have that specific information, and guide/encourage custom quotation!
    const fallbackEn = "I don't currently have that information. Please share your contact details and our team will assist you directly with a customized quotation.";
    const fallbackHi = "मेरे पास वर्तमान में वह विशिष्ट जानकारी नहीं है। कृपया हमारे साथ अपना संपर्क विवरण साझा करें और हमारी टीम एक बेहतरीन कस्टमाइज्ड कोटेशन के साथ आपकी सीधे सहायता करेगी।";
    const fallbackHinglish = "Mere paas abhi iski specific information nahi hai. Please aap apna details aur contact number share kijiye hamari sales team custom design aur rate ke saath aapko reply karegi.";

    // Set state to start collecting so they can get team assistance immediately!
    setIsCollecting(true);
    setLeadForm({ details: userInput }); // Pre-save whatever they asked as project details!
    setCurrentFieldIndex(3); // Start with 'name' index inside collectFields
    
    const currentFallback = currentL === 'hinglish' ? fallbackHinglish : currentL === 'hi' ? fallbackHi : fallbackEn;
    const currentQuestion = currentL === 'hinglish' ? collectFields[3].questionHinglish : currentL === 'hi' ? collectFields[3].questionHi : collectFields[3].questionEn;
    const combinedFallback = `${currentFallback} ${currentQuestion}`;

    const newAIMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      text: combinedFallback,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newAIMsg]);
    speakAIText(combinedFallback);
  };

  // Simulated Voice flow for browsers that don't support SpeechRecognition (safari iframe etc)
  const simulateUserVoiceTrigger = () => {
    setIsListening(true);
    setSpeechError(null);
    setInterimTranscript("Design rigid product cases...");
    
    setTimeout(() => {
      setIsListening(false);
      handleUserSpeechCommitted("Design rigid product boxes with gold hot-stamped logos");
    }, 2200);
  };

  const toggleSoundMute = () => {
    playTone('tap');
    setIsMuted(!isMuted);
    if (!isMuted && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleOpenWidget = () => {
    playTone('listening');
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleCloseWidget = () => {
    playTone('tap');
    setIsOpen(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (err) {}
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating circular trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOpenWidget}
            className="fixed bottom-24 right-6 z-40 flex items-center justify-center p-4 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#d7849a] text-black hover:scale-110 active:scale-95 transition-transform duration-300 shadow-[0_8px_30px_rgba(215,132,154,0.4)] border border-white/20 focus:outline-none"
            title="Aura Luxury AI Guide"
            id="ai-voice-support-trigger"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative"
            >
              <Sparkles className="w-6 h-6 text-black filter drop-shadow" />
            </motion.div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-black animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Interactive AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 60,
              x: window.innerWidth < 640 ? 0 : 0
            }}
            animate={
              isMinimized 
                ? { height: '64px', width: '320px', y: 340, opacity: 1, scale: 1 } 
                : { height: '540px', width: window.innerWidth < 480 ? '100%' : '380px', y: 0, opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-6 right-6 z-50 glass-card rounded-[28px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden max-w-[calc(100vw-32px)] backdrop-blur-2xl`}
            style={{ 
              backgroundColor: 'rgba(10, 10, 12, 0.95)',
            }}
            id="ai-voice-panel"
          >
            
            {/* Top Header Section */}
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06] select-none bg-gradient-to-r from-white/[0.01] to-white/[0.03]">
              
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#d7849a] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-black" />
                  </div>
                  {isSpeaking && (
                    <span className="absolute inset-0 rounded-full border border-[#d7849a] animate-ping opacity-75" />
                  )}
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-xs tracking-widest text-[#d7849a] uppercase leading-none">AURA</h3>
                  <p className="text-[10px] text-[#d4af37] font-mono tracking-wider font-light mt-0.5 uppercase">{t.subtitle}</p>
                </div>
              </div>

              {/* Utility window control tags */}
              <div className="flex items-center gap-1.5">
                
                {/* Sleek Animated Dropdown Menu for Languages */}
                <div className="relative" ref={langDropdownRef}>
                  <button
                    onClick={() => {
                      playTone('tap');
                      setIsLangDropdownOpen(!isLangDropdownOpen);
                    }}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-[10px] text-neutral-300 hover:text-white transition-all font-mono uppercase tracking-wider relative"
                    title="Change language preference"
                    id="ai-lang-dropdown-trigger"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-bold tracking-normal">{selectedLang === 'hinglish' ? 'HING' : selectedLang.toUpperCase()}</span>
                    
                    {/* Glowing status indicator for selected language */}
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]"></span>
                    </span>
                    
                    <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isLangDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#121212]/98 backdrop-blur-md border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 p-1 divide-y divide-white/[0.04]"
                        id="ai-lang-dropdown-menu"
                      >
                        <div className="py-1">
                          {/* Option English */}
                          <button
                            type="button"
                            onClick={() => {
                              handleLanguageChange('en');
                              setIsLangDropdownOpen(false);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left hover:bg-white/[0.05] transition-colors group"
                            id="dropdown-lang-en"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-neutral-300 group-hover:text-white transition-colors">
                                English
                              </span>
                              {selectedLang === 'en' && (
                                <span className="flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]"></span>
                                </span>
                              )}
                            </div>
                            {selectedLang === 'en' ? (
                              <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                            ) : (
                              <span className="text-[9px] text-neutral-500 font-mono select-none">EN</span>
                            )}
                          </button>

                          {/* Option Hindi */}
                          <button
                            type="button"
                            onClick={() => {
                              handleLanguageChange('hi');
                              setIsLangDropdownOpen(false);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left hover:bg-white/[0.05] transition-colors group"
                            id="dropdown-lang-hi"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-neutral-300 group-hover:text-white transition-colors">
                                हिन्दी (Hindi)
                              </span>
                              {selectedLang === 'hi' && (
                                <span className="flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#d7849a] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d7849a]"></span>
                                </span>
                              )}
                            </div>
                            {selectedLang === 'hi' ? (
                              <Check className="w-3.5 h-3.5 text-[#d7849a]" />
                            ) : (
                              <span className="text-[9px] text-neutral-500 font-mono select-none">HI</span>
                            )}
                          </button>

                          {/* Option Hinglish */}
                          <button
                            type="button"
                            onClick={() => {
                              handleLanguageChange('hinglish');
                              setIsLangDropdownOpen(false);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between text-left hover:bg-white/[0.05] transition-colors group"
                            id="dropdown-lang-hinglish"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-neutral-300 group-hover:text-white transition-colors">
                                Hinglish
                              </span>
                              {selectedLang === 'hinglish' && (
                                <span className="flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d4af37]"></span>
                                </span>
                              )}
                            </div>
                            {selectedLang === 'hinglish' ? (
                              <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                            ) : (
                              <span className="text-[9px] text-neutral-500 font-mono select-none">HING</span>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Settings Toggle Button */}
                <button
                  onClick={() => {
                    playTone('toggle');
                    setIsSettingsOpen(!isSettingsOpen);
                  }}
                  className={`p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors ${isSettingsOpen ? 'text-[#d4af37]' : ''}`}
                  title="Aura Settings / Language"
                  id="ai-settings-toggle-btn"
                >
                  <Settings className={`w-4 h-4 ${isSettingsOpen ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                </button>

                {/* Mute toggle button */}
                <button
                  onClick={toggleSoundMute}
                  className="p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                  title={isMuted ? "Unmute vocal responses" : "Mute vocal responses"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#d7849a]" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Minimize toggler */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                  title={isMinimized ? "Expand Consult Assistant" : "Minimize Assistant"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>

                {/* Close window */}
                <button
                  onClick={handleCloseWidget}
                  className="p-1.5 rounded-full hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors"
                  title="Close AI Assistant"
                >
                  <X className="w-4 h-4" />
                </button>

              </div>
            </div>

            {/* Render collapsed minibar if isMinimized */}
            {!isMinimized && (
              <>
                <AnimatePresence mode="wait">
                  {isSettingsOpen ? (
                    <motion.div
                      key="aura-settings-container"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="flex-grow p-5 overflow-y-auto custom-scrollbar flex flex-col justify-between bg-neutral-950/20"
                      id="ai-settings-panel"
                    >
                      <div className="space-y-4">
                        
                        {/* Settings Title Section */}
                        <div className="space-y-1">
                          <h4 className="text-xs font-sans font-extrabold tracking-widest text-[#d4af37] uppercase">
                            {t.settingsTitle}
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                            {t.descriptionText}
                          </p>
                        </div>

                        {/* Language Selection Radios */}
                        <div className="space-y-3 pt-2">
                          <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase block">
                            {t.selectLanguage}
                          </span>
                          
                          <div className="space-y-2">
                            
                            {/* Option English */}
                            <button
                              type="button"
                              onClick={() => handleLanguageChange('en')}
                              className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all duration-300 border font-sans group ${
                                selectedLang === 'en'
                                  ? 'bg-[#d4af37]/10 border-[#d4af37]/40 shadow-[0_4px_20px_rgba(212,175,55,0.08)]'
                                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                              }`}
                              id="settings-lang-en"
                            >
                              <div className="space-y-0.5">
                                <span className={`text-xs font-bold transition-colors ${selectedLang === 'en' ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                  {t.langEn}
                                </span>
                                <span className="text-[9px] text-neutral-500 font-mono block">English UI & AI responses</span>
                              </div>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedLang === 'en' ? 'border-[#d4af37] bg-[#d4af37]' : 'border-neutral-600'}`}>
                                {selectedLang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                              </div>
                            </button>

                            {/* Option Hindi */}
                            <button
                              type="button"
                              onClick={() => handleLanguageChange('hi')}
                              className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all duration-300 border font-sans group ${
                                selectedLang === 'hi'
                                  ? 'bg-[#d7849a]/10 border-[#d7849a]/40 shadow-[0_4px_20px_rgba(215,132,154,0.08)]'
                                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                              }`}
                              id="settings-lang-hi"
                            >
                              <div className="space-y-0.5">
                                <span className={`text-xs font-bold transition-colors ${selectedLang === 'hi' ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                  {t.langHi}
                                </span>
                                <span className="text-[9px] text-neutral-500 font-mono block">हिन्दी UI और AI उत्तर</span>
                              </div>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedLang === 'hi' ? 'border-[#d7849a] bg-[#d7849a]' : 'border-neutral-600'}`}>
                                {selectedLang === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                              </div>
                            </button>

                            {/* Option Hinglish */}
                            <button
                              type="button"
                              onClick={() => handleLanguageChange('hinglish')}
                              className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all duration-300 border font-sans group ${
                                selectedLang === 'hinglish'
                                  ? 'bg-[#d7849a]/10 border-[#d4af37]/35 shadow-[0_4px_20px_rgba(215,132,154,0.06)]'
                                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]'
                              }`}
                              id="settings-lang-hinglish"
                            >
                              <div className="space-y-0.5">
                                <span className={`text-xs font-bold transition-colors ${selectedLang === 'hinglish' ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                                  {t.langHing}
                                </span>
                                <span className="text-[9px] text-neutral-500 font-mono block">Hinglish UI & AI answers</span>
                              </div>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedLang === 'hinglish' ? 'border-[#d4af37] bg-[#d4af37]' : 'border-neutral-600'}`}>
                                {selectedLang === 'hinglish' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                              </div>
                            </button>

                          </div>
                        </div>

                      </div>

                      {/* Back button save */}
                      <button
                        type="button"
                        onClick={() => {
                          playTone('success');
                          setIsSettingsOpen(false);
                        }}
                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-tr from-[#d4af37] to-[#d7849a] text-black font-sans font-bold text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(215,132,154,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                        id="ai-settings-save-btn"
                      >
                        {t.saveBtn}
                      </button>

                    </motion.div>
                  ) : (
                    <motion.div
                      key="aura-chat-panel"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col flex-grow overflow-hidden"
                    >
                      {/* 
                        Smooth Slide Switch Navigation Selector
                        This is the toggle UI control requested by the user.
                        It transitions smoothly using Framer Motion layoutId.
                      */}
                <div className="px-4 py-3 bg-neutral-950/40 border-b border-white/[0.04] flex items-center justify-center">
                  <div className="relative w-full max-w-[280px] h-[38px] p-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] flex">
                    
                    {/* Active Sliding Tab Background */}
                    <div className="absolute inset-y-[2px] transition-all duration-300 ease-out rounded-full bg-gradient-to-tr from-[#d4af37]/20 to-[#d7849a]/20 border border-white/5 shadow-inner"
                      style={{
                        width: 'calc(50% - 2px)',
                        left: interactionMode === 'voice' ? '2px' : 'calc(50%)',
                      }}
                    />

                    {/* Voice-to-Voice Tab option */}
                    <button
                      onClick={() => handleToggleMode('voice')}
                      className={`relative z-10 w-1/2 h-full rounded-full flex items-center justify-center gap-1.5 font-sans font-bold text-xs tracking-wider uppercase transition-colors duration-300 select-none ${
                        interactionMode === 'voice' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      {t.speakTab}
                    </button>

                    {/* Text-Chat Tab option */}
                    <button
                      onClick={() => handleToggleMode('text')}
                      className={`relative z-10 w-1/2 h-full rounded-full flex items-center justify-center gap-1.5 font-sans font-bold text-xs tracking-wider uppercase transition-colors duration-300 select-none ${
                        interactionMode === 'text' ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      {t.typeTab}
                    </button>

                  </div>
                </div>

                {/* Main Dynamic View Content Panel */}
                <div className="flex-grow p-4 overflow-y-auto flex flex-col justify-between custom-scrollbar bg-neutral-950/20">
                  <AnimatePresence mode="wait">
                    
                    {/* IN VOICE INTERACTION MODE */}
                    {interactionMode === 'voice' ? (
                      <motion.div
                        key="voice-view"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-around h-full flex-grow py-4"
                      >
                        
                        {/* Audio Wavelength Pulsing Visualizer Orbs */}
                        <div className="relative flex items-center justify-center w-40 h-40">
                          
                          {/* Multiple ambient animated halo rings */}
                          <AnimatePresence>
                            {isListening && (
                              <>
                                <motion.div 
                                  animate={{ scale: [1, 1.8, 1], opacity: [0.15, 0, 0.15] }}
                                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                                  className="absolute w-28 h-28 rounded-full bg-[#d4af37]/10"
                                />
                                <motion.div 
                                  animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0, 0.1] }}
                                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                                  className="absolute w-28 h-28 rounded-full bg-[#d7849a]/10"
                                />
                              </>
                            )}
                          </AnimatePresence>

                          <AnimatePresence>
                            {isSpeaking && (
                              <>
                                <motion.div 
                                  animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                  className="absolute w-32 h-32 rounded-full border border-[#d7849a]/30"
                                />
                                <motion.div 
                                  animate={{ scale: [1, 2.0, 1], opacity: [0.15, 0, 0.15] }}
                                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                                  className="absolute w-32 h-32 rounded-full border border-white/10"
                                />
                              </>
                            )}
                          </AnimatePresence>

                          {/* Outer solid rotating tech line ring */}
                          <motion.div 
                            animate={isListening || isSpeaking ? { rotate: 360 } : { rotate: 0 }}
                            transition={isListening || isSpeaking ? { repeat: Infinity, duration: 10, ease: "linear" } : { duration: 1 }}
                            className="absolute w-36 h-36 rounded-full border border-dashed border-white/[0.08]" 
                          />

                          {/* Interactive main tactile central sphere button */}
                          <motion.button
                            onClick={isListening ? stopMicCapture : startMicCapture}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500 border ${
                              isListening 
                                ? 'bg-gradient-to-tr from-[#d7849a]/90 to-[#b55874]/90 border-white text-black shadow-[0_0_35px_rgba(215,132,154,0.6)]' 
                                : isSpeaking
                                ? 'bg-gradient-to-tr from-[#d4af37]/90 to-[#9e8020]/90 border-white/20 text-black shadow-[0_0_35px_rgba(212,175,55,0.4)] animate-pulse'
                                : 'bg-[#121216] hover:bg-[#1a1a22] border-white/[0.12] text-white hover:border-[#d7849a]/40 shadow-inner'
                            }`}
                            id="ai-mic-hex-button"
                          >
                            {isListening ? (
                              <Mic className="w-8 h-8 animate-bounce text-black" />
                            ) : isSpeaking ? (
                              <Volume2 className="w-8 h-8 text-black" />
                            ) : (
                              <Mic className="w-8 h-8 hover:text-[#d7849a] transition-colors" />
                            )}
                            <span className="text-[9px] uppercase font-bold tracking-widest mt-1 opacity-80 select-none">
                              {isListening ? t.listeningLabel : isSpeaking ? t.speakingLabel : t.tapSpeakLabel}
                            </span>
                          </motion.button>

                          {/* Real-time elegant frequency line waves at the bottom */}
                          <div className="absolute -bottom-2 flex items-center justify-center gap-1 h-6">
                            {[...Array(6)].map((_, i) => (
                              <motion.span
                                key={i}
                                animate={
                                  isListening 
                                    ? { height: [4, 16, 4] } 
                                    : isSpeaking
                                    ? { height: [4, 24, 4] }
                                    : { height: 4 }
                                }
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.6 + i * 0.1,
                                  ease: "easeInOut"
                                }}
                                className="w-1 rounded-full"
                                style={{
                                  backgroundColor: i % 2 === 0 ? '#d7849a' : '#d4af37',
                                }}
                              />
                            ))}
                          </div>

                        </div>

                        {/* Real-time Subtitles Caption Bubble */}
                        <div className="w-full px-2 text-center min-h-[64px] flex flex-col justify-center max-w-[320px]">
                          <AnimatePresence mode="wait">
                            {interimTranscript ? (
                              <motion.p
                                key="interim"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-xs text-white/90 font-medium italic leading-relaxed"
                              >
                                "{interimTranscript}"
                              </motion.p>
                            ) : isListening ? (
                              <motion.p
                                key="listening"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-xs text-neutral-400 font-mono"
                              >
                                {t.placeholderStatusListening}
                              </motion.p>
                            ) : isSpeaking ? (
                              <motion.p
                                key="speaking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-neutral-200 line-clamp-3 leading-relaxed tracking-wide px-3 py-2 bg-white/[0.02] border border-white/[0.04] rounded-2xl"
                              >
                                {messages[messages.length - 1]?.text}
                              </motion.p>
                            ) : (
                              <motion.p
                                key="standby"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                className="text-[11px] text-neutral-400 tracking-wide font-light max-w-xs leading-relaxed"
                              >
                                {t.placeholderStatusStandby}
                              </motion.p>
                            )}
                          </AnimatePresence>

                          {/* Small Warning line */}
                          {speechError && (
                            <p className="text-[9px] text-amber-400 mt-2 p-1 bg-amber-500/10 border border-amber-500/20 rounded">
                              {speechError}
                            </p>
                          )}
                        </div>

                        {/* Suggestive clickable queries */}
                        <div className="w-full mt-2 px-1">
                          {messages.length === 1 && !isCollecting && !priceEstimateActive ? (
                            <div className="w-full max-h-[140px] overflow-y-auto custom-scrollbar p-2 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                              <p className="text-[8px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 text-center">
                                {t.quickActionTitle}
                              </p>
                              <div className="grid grid-cols-2 gap-1">
                                <button
                                  onClick={() => handleQuickAction('location', '📍 Location')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  📍 Location
                                </button>
                                <button
                                  onClick={() => handleQuickAction('call', '📞 Call Now')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  📞 Call Now
                                </button>
                                <button
                                  onClick={() => handleQuickAction('whatsapp', '💬 WhatsApp')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center animate-pulse"
                                >
                                  💬 WhatsApp
                                </button>
                                <button
                                  onClick={() => handleQuickAction('print_what', '🎨 What Do You Want To Print?')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  🎨 What To Print?
                                </button>
                                <button
                                  onClick={() => handleQuickAction('price_estimate', '💰 Get Price Estimate')}
                                  className="px-2 py-1.5 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/20 text-[10px] text-[#d4af37] hover:text-white transition-all text-center"
                                >
                                  💰 Price Estimate
                                </button>
                                <button
                                  onClick={() => handleQuickAction('business_branding', '🏢 Business Branding')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  🏢 Brand Signs
                                </button>
                                <button
                                  onClick={() => handleQuickAction('corporate_gifting', '🎁 Corporate Gifting')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  🎁 Corporate Gift
                                </button>
                                <button
                                  onClick={() => handleQuickAction('wedding_printing', '💍 Wedding Printing')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  💍 Wedding Cards
                                </button>
                                <button
                                  onClick={() => handleQuickAction('tshirt_printing', '👕 Custom T-Shirt')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  👕 Custom T-Shirt
                                </button>
                                <button
                                  onClick={() => handleQuickAction('led_signage', '✨ LED Signage')}
                                  className="px-2 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[10px] text-neutral-300 hover:text-white transition-all text-center"
                                >
                                  ✨ LED Signage
                                </button>
                              </div>
                            </div>
                          ) : printingOptionsActive ? (
                            <div className="w-full text-center">
                              <p className="text-[9px] tracking-widest text-[#d4af37] font-mono uppercase mb-2">Select Print Sub-Category:</p>
                              <div className="flex flex-wrap gap-1 justify-center max-h-[84px] overflow-y-auto custom-scrollbar">
                                {[
                                  "Visiting Cards",
                                  "LED Sign Board",
                                  "T-Shirt Printing",
                                  "Corporate Gifts",
                                  "Packaging",
                                  "Wedding Cards",
                                  "Photo Gifts",
                                  "UV Printing",
                                  "Acrylic Signage",
                                  "Other"
                                ].map((option) => (
                                  <button 
                                    key={option}
                                    onClick={() => handlePrintOptionClick(option)}
                                    className="px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-[#d7849a]/40 text-[9px] text-neutral-300 hover:text-white transition-all cursor-pointer"
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="w-full text-center">
                              <p className="text-[9px] tracking-widest text-[#d4af37] font-mono uppercase mb-1">{t.directSupportTitle}</p>
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => handleBadgeClick("Can you create custom LED signs?")}
                                  className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-[#d7849a]/40 hover:bg-white/[0.06] text-[10px] text-neutral-300 hover:text-white transition-all cursor-pointer"
                                >
                                  ✨ Custom LED Signs
                                </button>
                                <button 
                                  onClick={() => handleBadgeClick("How can I get a quotation?")}
                                  className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-[#d4af37]/40 hover:bg-white/[0.06] text-[10px] text-neutral-300 hover:text-white transition-all cursor-pointer"
                                >
                                  📦 Get Quotation
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                      </motion.div>
                    ) : (
                      
                      // IN KEYBOARD TEXT-CHAT MODE
                      <motion.div
                        key="text-view"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full justify-between"
                      >
                        
                        {/* Session list items */}
                        <div className="flex-grow space-y-4 pr-1 overflow-y-auto max-h-[320px] scroll-smooth custom-scrollbar py-2">
                          {messages.map((msg, index) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index === messages.length - 1 ? 0.05 : 0 }}
                              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs gap-1 leading-relaxed ${
                                msg.role === 'user'
                                  ? 'bg-gradient-to-tr from-[#d7849a]/90 to-[#b55874]/90 text-neutral-950 font-medium rounded-tr-none shadow-md'
                                  : 'bg-white/[0.03] border border-white/[0.06] text-neutral-100 rounded-tl-none shadow-sm'
                              }`}>
                                <p>{msg.text}</p>
                              </div>
                              <span className="text-[8px] font-mono text-neutral-500 mt-1 px-1">
                                {msg.timestamp}
                              </span>
                            </motion.div>
                          ))}

                          {messages.length === 1 && !isCollecting && !priceEstimateActive && (
                            <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-2xl my-2">
                              <p className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 mb-2.5 text-center">
                                {t.suggestedTriggersTitle}
                              </p>
                              <div className="grid grid-cols-2 gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('location', '📍 Location')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d7849a]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  📍 Location
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('call', '📞 Call Now')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d7849a]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  📞 Call Now
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('whatsapp', '💬 WhatsApp')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 animate-pulse"
                                >
                                  💬 WhatsApp
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('print_what', '🎨 What Do You Want To Print?')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d4af37]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  🎨 What To Print?
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('price_estimate', '💰 Get Price Estimate')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-[#d4af37]/20 hover:border-[#d4af37] text-left text-[11px] text-[#d4af37] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  💰 Price Estimate
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('business_branding', '🏢 Business Branding')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d7849a]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  🏢 Business Branding
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('corporate_gifting', '🎁 Corporate Gifting')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d4af37]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  🎁 Corporate Gifting
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('wedding_printing', '💍 Wedding Printing')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d7849a]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  💍 Wedding Printing
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('tshirt_printing', '👕 Custom T-Shirt')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d4af37]/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  👕 Custom T-Shirt
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQuickAction('led_signage', '✨ LED Signage')}
                                  className="px-2 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-violet-500/40 hover:bg-white/[0.04] text-left text-[11px] text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                                >
                                  ✨ LED Signage
                                </button>
                              </div>
                            </div>
                          )}

                          {printingOptionsActive && (
                            <div className="p-3 bg-neutral-900/40 border border-[#d4af37]/20 rounded-2xl my-2">
                              <p className="text-[9px] font-mono uppercase tracking-wider text-[#d4af37] mb-2 text-center">
                                Select Print Sub-Category:
                              </p>
                              <div className="flex flex-wrap gap-1.5 justify-center">
                                {[
                                  "Visiting Cards",
                                  "LED Sign Board",
                                  "T-Shirt Printing",
                                  "Corporate Gifts",
                                  "Packaging",
                                  "Wedding Cards",
                                  "Photo Gifts",
                                  "UV Printing",
                                  "Acrylic Signage",
                                  "Other"
                                ].map((option) => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePrintOptionClick(option)}
                                    className="px-2.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-[#d7849a] text-[10px] text-neutral-200 hover:text-white transition-all cursor-pointer whitespace-nowrap animate-fade-in"
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div ref={chatEndRef} />
                        </div>

                        {/* Fast spec badges */}
                        <div className="border-t border-white/[0.05] pt-3 pb-2 flex flex-wrap gap-1.5 overflow-hidden">
                          <button 
                            onClick={() => handleBadgeClick("What is your custom box markup duration?")}
                            className="px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] hover:border-[#d7849a]/30 text-[9px] text-neutral-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                          >
                            {t.leadTimesBadge}
                          </button>
                          <button 
                            onClick={() => handleBadgeClick("How do I contact premium sales partner?")}
                            className="px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] hover:border-[#d4af37]/30 text-[9px] text-neutral-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                          >
                            {t.directSalesBadge}
                          </button>
                          <button 
                            onClick={() => handleBadgeClick("Can we customize corporate executive diaries?")}
                            className="px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] hover:border-white/20 text-[9px] text-neutral-400 hover:text-white transition-all cursor-pointer whitespace-nowrap"
                          >
                            {t.leatherDiariesBadge}
                          </button>
                        </div>

                        {/* Bottom submit form */}
                        <form onSubmit={handleSendText} className="flex gap-2.5 border-t border-white/[0.06] pt-3">
                          <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={t.inputPlaceholder}
                            className="flex-grow bg-white/[0.03] border border-white/[0.08] rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-[#d7849a]/50 placeholder-neutral-500 transition-colors"
                            id="ai-text-input-field"
                          />
                          <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="px-4 py-2 rounded-full bg-[#d7849a] disabled:opacity-30 disabled:scale-100 hover:bg-[#ca5e7e] hover:scale-105 active:scale-95 text-neutral-950 flex items-center justify-center transition-all cursor-pointer"
                            title="Send query"
                            id="ai-text-submit-btn"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </form>

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
            )}

            {/* Collapsed view banner bar click opener */}
            {isMinimized && (
              <div 
                onClick={() => setIsMinimized(false)}
                className="flex-grow flex items-center justify-between px-4 bg-gradient-to-tr from-white/[0.01] to-white/[0.03] hover:bg-white/[0.05] transition-colors cursor-pointer select-none"
              >
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-300">
                  {isListening ? "🎙️ Active microphone capture..." : isSpeaking ? "🔊 Aura is speaking..." : "💬 Chat session is minimized"}
                </p>
                <div className="w-2 h-2 bg-[#d7849a] rounded-full animate-ping" />
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
