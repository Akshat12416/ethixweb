import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Navigation
    navWork: 'Work',
    navServices: 'Services',
    navIndustries: 'Industries',
    navAbout: 'About',
    navContact: 'Contact',
    digitalOpsHeader: 'DIGITAL OPERATIONS FOR US & INDIA FOUNDERS',
    volTag: 'VOL. 26',
    
    // Switcher
    langEn: 'EN',
    langHi: 'हिन्दी',

    // Hero Section
    heroHeadlinePart1: 'Ethix',
    heroHeadlinePart2: 'Web',
    heroOps: '(OPS)',
    heroTagline: 'We run the tech. You run the business.',
    heroSubhead:
      'A senior-led digital operations agency delivering headless cloud platforms, autonomous AI booking agents, and direct-revenue systems.',
    ctaStartProject: 'Start a project',
    ctaSeeWork: 'See our work',
    ctaBookCall: 'Book a 30-min strategy call',
    heroDualShoreTag: 'THE DUAL-SHORE SUPERPOWER',
    heroFollowSun: 'Follow-the-Sun Engineering',
    heroFollowSunDesc: '12.5-hour time difference transformed into an around-the-clock delivery cycle.',
    seattleClockLabel: 'SEATTLE HQ: 09:18 PST',
    bangaloreClockLabel: 'BANGALORE HUB: 21:48 IST',

    // Section Titles
    sectionWorkTitle: 'Featured Client Proof',
    sectionWorkSubhead: 'Real headless platforms, AI receptionists, and revenue engines in production.',
    sectionServicesTitle: '22 Operational Services',
    sectionServicesSubhead: 'Complete digital infrastructure without hiring multiple disconnected vendors.',
    sectionAboutTitle: 'The Bangalore & Seattle Engine',
    sectionAboutSubhead: 'US corporate accountability paired with Bangalore senior engineering velocity.',
    
    // Pricing in Rupees (₹)
    pricingBadge: 'TRANSPARENT VALUE IN RUPEES',
    pricingTitle: 'Simple, Fixed-Scope Investment',
    pricingSubhead: 'Direct senior engineering. No hidden markups. Predictable monthly sprints.',
    plan1Name: 'Foundation Retainer',
    plan1Price: '₹2,50,000',
    plan1Period: '/ month',
    plan1Desc: 'Headless Next.js/React architecture, sub-second speed optimization, and ongoing maintenance.',
    plan1Features: [
      'Custom Headless Next.js / Vite build',
      'PageSpeed 90+ Core Web Vitals guarantee',
      'Ongoing uptime & security patching',
      'Dedicated senior engineer Slack access'
    ],
    plan2Name: 'Growth & Autonomous AI Ops',
    plan2Badge: 'MOST POPULAR',
    plan2Price: '₹5,50,000',
    plan2Period: '/ month',
    plan2Desc: '24/7 AI voice and booking dispatchers, CRM sync, and high-converting funnel optimizations.',
    plan2Features: [
      'Everything in Foundation Retainer',
      '24/7 Autonomous AI voice & SMS receptionist',
      'Full CRM & webhook automation pipeline',
      'Bi-weekly conversion rate & SEO audits',
      'Zero percentage-of-ad-spend agency tax'
    ],
    plan3Name: 'Enterprise Custom Platform',
    plan3Price: '₹12,00,000+',
    plan3Period: 'fixed project',
    plan3Desc: 'Full-scale digital operations transformation, proprietary AI models, and custom ERP integration.',
    plan3Features: [
      'Dedicated 3-engineer Bangalore squad',
      'Custom LLM fine-tuning on company data',
      'Enterprise database & security architecture',
      'US Legal MSA + SLAs under Ethixweb USA LLC'
    ],
    pricingCtaPlan1: 'Select Foundation',
    pricingCtaPlan2: 'Start Growth Sprint',
    pricingCtaPlan3: 'Discuss Enterprise Scope',
    pricingTaxNote: 'All deliverables backed by US Legal MSA with domestic INR bank transfer, Wire, & GST invoicing available.',

    // Contact Form
    contactTitle: 'Start a Project',
    contactSubhead: 'Tell us where the bottleneck is. A senior engineer will review and reply within 1 business day.',
    contactLabelName: 'Full Name',
    contactPlaceholderName: 'e.g. Marcus Vance / राहुल शर्मा',
    contactLabelEmail: 'Work Email',
    contactPlaceholderEmail: 'name@company.com',
    contactLabelPhone: 'Phone Number',
    contactPlaceholderPhone: '+91 98765 43210 / +1 (206) 555-0192',
    contactLabelCompany: 'Company Name',
    contactPlaceholderCompany: 'Company / Startup LLC',
    contactLabelService: 'Service Required',
    contactLabelBudget: 'Estimated Budget (INR ₹)',
    contactLabelTimeline: 'Target Timeline',
    contactLabelMessage: 'Project Details & Goals',
    contactPlaceholderMessage: 'Describe what you need built, existing tech stack, and key targets...',
    contactSubmitBtn: 'Submit Project Inquiry',
    contactSubmittingBtn: 'Securing & Ingesting...',
    contactSuccessTitle: 'Inquiry Submitted to Neon Database',
    contactSuccessDesc: 'Your request has been ingested with 3-tier spam verification. A senior engineer will follow up within 24 hours.',

    // Footer
    footerRights: 'Ethixweb USA LLC · Wyoming & Bangalore · All Rights Reserved.',
    footerSpeed: 'PageSpeed 90+ Mobile & Desktop Audited'
  },

  hi: {
    // Navigation
    navWork: 'प्रोजेक्ट्स',
    navServices: 'सेवाएं',
    navIndustries: 'उद्योग',
    navAbout: 'हमारे बारे में',
    navContact: 'संपर्क करें',
    digitalOpsHeader: 'फाउंडर्स एवं टीमों के लिए डिजिटल ऑपरेशंस',
    volTag: 'खंड २६',

    // Switcher
    langEn: 'EN',
    langHi: 'हिन्दी',

    // Hero Section
    heroHeadlinePart1: 'एथिक्स',
    heroHeadlinePart2: 'वेब',
    heroOps: '(ऑप्स)',
    heroTagline: 'हम तकनीक संभालते हैं। आप व्यापार चलाएं।',
    heroSubhead:
      'सीनियर इंजीनियर्स द्वारा संचालित डिजिटल ऑपरेशंस एजेंसी — हेडलेस क्लाउड प्लेटफॉर्म्स, स्वायत्त एआई बुकिंग एजेंट्स और डायरेक्ट-रेवेन्यू सिस्टम्स।',
    ctaStartProject: 'प्रोजेक्ट शुरू करें',
    ctaSeeWork: 'हमारा काम देखें',
    ctaBookCall: '30-मिनट रणनीति कॉल बुक करें',
    heroDualShoreTag: 'डुअल-शोर सुपरपॉवर',
    heroFollowSun: 'फॉलो-द-सन 24h इंजीनियरिंग',
    heroFollowSunDesc: 'सिएटल और बैंगलोर के 12.5 घंटे के अंतर को हमने 24-घंटे अनवरत डिलीवरी चक्र में बदला।',
    seattleClockLabel: 'सिएटल मुख्यालय: 09:18 PST',
    bangaloreClockLabel: 'बैंगलोर हब: 21:48 IST',

    // Section Titles
    sectionWorkTitle: 'सफल प्रोजेक्ट्स एवं परिणाम',
    sectionWorkSubhead: 'रियल हेडलेस प्लेटफॉर्म्स, एआई रिसेप्शनिस्ट और लाइव रेवेन्यू सिस्टम्स।',
    sectionServicesTitle: '२२ व्यापक डिजिटल सेवाएं',
    sectionServicesSubhead: 'अलग-अलग एजेंसियों के चक्कर छोड़े बिना सम्पूर्ण डिजिटल इंफ्रास्ट्रक्चर।',
    sectionAboutTitle: 'बैंगलोर एवं सिएटल का शक्तिशाली इंजन',
    sectionAboutSubhead: 'अमेरिकी कानूनी विश्वसनीयता के साथ बैंगलोर की शीर्ष इंजीनियरिंग गति।',

    // Pricing in Rupees (₹)
    pricingBadge: 'पारदर्शी मूल्य निर्धारण (भारतीय रुपये में)',
    pricingTitle: 'स्पष्ट, पारदर्शी एवं निश्चित निवेश',
    pricingSubhead: 'सीधे सीनियर इंजीनियर से संपर्क। बिना किसी छिपे शुल्क के निश्चित मासिक परिणाम।',
    plan1Name: 'फाउंडेशन टियर',
    plan1Price: '₹2,50,000',
    plan1Period: '/ प्रति माह',
    plan1Desc: 'हेडलेस नेक्स्ट.जेएस आर्किटेक्चर, सब-सेकंड लोडिंग स्पीड और निरंतर तकनीकी रखरखाव।',
    plan1Features: [
      'कस्टम हेडलेस नेक्स्ट.जेएस / विटे आर्किटेक्चर',
      'पेजस्पीड 90+ कोर वेब वाइटल्स की गारंटी',
      'अपटाइम मॉनिटरिंग और प्रोएक्टिव सिक्योरिटी पैच',
      'सीनियर इंजीनियर के साथ सीधा स्लैक संपर्क'
    ],
    plan2Name: 'ग्रोथ एवं ऑटोनॉमस एआई ऑप्स',
    plan2Badge: 'सर्वाधिक लोकप्रिय',
    plan2Price: '₹5,50,000',
    plan2Period: '/ प्रति माह',
    plan2Desc: '24/7 एआई वॉइस एवं बुकिंग डिस्पैचर्स, ऑटोमेटेड सीआरएम और हाई-कन्वर्जन फनल।',
    plan2Features: [
      'फाउंडेशन टियर की सभी सुविधाएं शामिल',
      '24/7 स्वायत्त एआई फोन व एसएमएस रिसेप्शनिस्ट',
      'पूर्ण सीआरएम वेबहुक ऑटोमेशन पाइपलाइन',
      'पाक्षिक कन्वर्जन रेट व तकनीकी एसईओ ऑडिट्स',
      'विज्ञापन बजट पर कोई अतिरिक्त एजेंसी कमीशन नहीं'
    ],
    plan3Name: 'एंटरप्राइज कस्टम प्लेटफॉर्म',
    plan3Price: '₹12,00,000+',
    plan3Period: 'निश्चित प्रोजेक्ट',
    plan3Desc: 'पूर्ण डिजिटल ऑपरेशन रूपांतरण, कस्टम एआई मॉडल्स और गहरा ईआरपी इंटीग्रेशन।',
    plan3Features: [
      '३ सीनियर इंजीनियर्स का डेडिकेटेड बैंगलोर स्क्वाड',
      'कंपनी के आंतरिक डेटा पर कस्टम एलएलएम फाइन-ट्यूनिंग',
      'एंटरप्राइज डेटाबेस सुरक्षा एवं बैकअप आर्किटेक्चर',
      'एथिक्सवेब यूएसए एलएलसी के तहत अमेरिकी अनुबंध व एसएलए'
    ],
    pricingCtaPlan1: 'फाउंडेशन चुनें',
    pricingCtaPlan2: 'ग्रोथ स्प्रिंट शुरू करें',
    pricingCtaPlan3: 'एंटरप्राइज योजना पर चर्चा करें',
    pricingTaxNote: 'अमेरिकी अनुबंध (MSA), भारतीय जीएसटी चालान और सीधे आईएनआर बैंक ट्रांसफर / यूपीआई भुगतान सुविधा।',

    // Contact Form
    contactTitle: 'नया प्रोजेक्ट शुरू करें',
    contactSubhead: 'अपनी तकनीकी आवश्यकताएं साझा करें। हमारे सीनियर इंजीनियर 1 कार्यदिवस में संपर्क करेंगे।',
    contactLabelName: 'आपका पूरा नाम',
    contactPlaceholderName: 'उदा. राहुल शर्मा / प्रिया नायर',
    contactLabelEmail: 'कार्य ईमेल',
    contactPlaceholderEmail: 'name@company.com',
    contactLabelPhone: 'फ़ोन नंबर',
    contactPlaceholderPhone: '+91 98765 43210',
    contactLabelCompany: 'कंपनी / ब्रांड का नाम',
    contactPlaceholderCompany: 'आपकी कंपनी का नाम',
    contactLabelService: 'वांछित सेवा चुनें',
    contactLabelBudget: 'अनुमानित बजट (₹ रुपये में)',
    contactLabelTimeline: 'समय सीमा',
    contactLabelMessage: 'प्रोजेक्ट का विवरण एवं लक्ष्य',
    contactPlaceholderMessage: 'आप क्या बनाना चाहते हैं, वर्तमान तकनीकी स्थिति और मुख्य लक्ष्य बताएं...',
    contactSubmitBtn: 'प्रोजेक्ट पूछताछ सबमिट करें',
    contactSubmittingBtn: 'सुरक्षित भेजा जा रहा है...',
    contactSuccessTitle: 'आपकी पूछताछ सफलतापूर्वक दर्ज हुई',
    contactSuccessDesc: 'नियोन पोस्टग्रेएसक्यूएल डेटाबेस में विवरण सुरक्षित हो गया है। हमारे सीनियर इंजीनियर 24 घंटों में संपर्क करेंगे।',

    // Footer
    footerRights: 'एथिक्सवेब यूएसए एलएलसी · व्योमिंग एवं बैंगलोर · सर्वाधिकार सुरक्षित।',
    footerSpeed: 'पेजस्पीड 90+ मोबाइल एवं डेस्कटॉप प्रमाणित'
  }
};

export const BUDGET_RUPEES_OPTIONS = [
  { value: 'Under ₹5 Lakhs', labelEn: 'Under ₹5 Lakhs (Starter)', labelHi: '₹5 लाख से कम (स्टार्टर)' },
  { value: '₹5L – ₹15L', labelEn: '₹5 Lakhs – ₹15 Lakhs (Growth)', labelHi: '₹5 लाख – ₹15 लाख (ग्रोथ)' },
  { value: '₹15L – ₹35L', labelEn: '₹15 Lakhs – ₹35 Lakhs (Scale)', labelHi: '₹15 लाख – ₹35 लाख (स्केल)' },
  { value: '₹35L – ₹75L', labelEn: '₹35 Lakhs – ₹75 Lakhs (Enterprise)', labelHi: '₹35 लाख – ₹75 लाख (एंटरप्राइज)' },
  { value: '₹75L+', labelEn: '₹75 Lakhs+ (Custom Architecture)', labelHi: '₹75 लाख+ (कस्टम आर्किटेक्चर)' },
  { value: 'Flexible', labelEn: 'Flexible / Let’s Discuss', labelHi: 'लचीला / बातचीत अनुसार' }
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ethix_lang');
      if (saved === 'hi' || saved === 'en') return saved;
    }
    return 'en';
  });

  const setLang = (newLang) => {
    if (newLang !== 'en' && newLang !== 'hi') return;
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ethix_lang', newLang);
      document.documentElement.setAttribute('lang', newLang);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
    }
  }, [lang]);

  const t = (key, fallback = '') => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
