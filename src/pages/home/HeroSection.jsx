// HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyMotion, domAnimation, m as motion } from 'framer-motion';
import card1 from "../../assets/pexels-laurachouette-29899586.jpg";
import card2 from "../../assets/pexels-shvetsa-5682756.jpg";
import card3 from "../../assets/istockphoto-880407540-612x612.jpg";
import card4 from "../../assets/pexels-khulood-abdulghani-195928257-12456277.jpg";
import card5 from "../../assets/pexels-olga-volkovitskaia-131638009-10819537.jpg";
import card6 from "../../assets/pexels-khulood-abdulghani-195928257-12456285.jpg";
import log from "../../assets/logo without background  (1).png";

// Hook خفيف لتحديد البريكبوينت (md)
const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, [query]);
  return matches;
};

const cards = [
  { id: 1, image: card1, trend: '', title: 'عطور مستوحاة' },
  { id: 2, image: card2, trend: '', title: 'أدوات المصمم' },
  { id: 3, image: card3, trend: '', title: 'العود و البخور' },
  { id: 4, image: card4, trend: '', title: 'Flankers' },
  { id: 5, image: card5, trend: '', title: 'الزيوت العطرية' },
  { id: 6, image: card6, trend: '', title: 'المتوسم (عطور حصرية)' },
];

const categoryMap = {
  'عطور مستوحاة': 'عطور مستوحاة',
  'أدوات المصمم': 'أدوات المصمم',
  'العود و البخور': 'العود و البخور',
  'Flankers': 'Flankers',
  'الزيوت العطرية': 'الزيوت العطرية',
  'المتوسم (عطور حصرية)': 'المتوسم (عطور حصرية)',
};

// يحسب اتجاه الدخول بسلاسة حسب العمود
const getInitial = (index, isMd) => {
  if (isMd) {
    // md أو أكبر: 3 أعمدة => 0 يسار، 1 وسط (fade-up)، 2 يمين
    const col = index % 3;
    if (col === 0) return { opacity: 0, x: -40, y: 0 };
    if (col === 2) return { opacity: 0, x: 40, y: 0 };
    return { opacity: 0, x: 0, y: 24 };
  } else {
    // شاشات صغيرة: عمودان => الزوجي من اليسار، الفردي من اليمين
    const fromLeft = index % 2 === 0;
    return { opacity: 0, x: fromLeft ? -40 : 40, y: 0 };
  }
};

const HeroSection = () => {
  const navigate = useNavigate();
  const isMd = useMediaQuery('(min-width: 768px)');

  const handleClick = (title) => {
    const category = categoryMap[title] || title;
    const search = new URLSearchParams({ category }).toString();
    navigate(`/shop?${search}`);
  };

  // إعدادات انتقال spring ناعمة
  const spring = { type: 'spring', stiffness: 110, damping: 18, mass: 0.4 };

  return (
    <section className="px-4 py-8" dir="rtl">
      <div className="text-center">
        <h2 className="text-[32px] font-normal text-[#C9A33A] mb-1">أستكشف مجموعاتنا المميزة</h2>
        <p className="text-[32px] font-bold text-[#3c3c3c] mb-6">عبر أقسامنا الفريدة</p>
        <div className="flex items-center justify-center gap-3">
          <span className="flex-1 max-w-[100px] h-px bg-[#c8c5b9]"></span>
          <img
            src={log}
            alt="شعار الأنثور"
            className="h-28 md:h-36 w-auto object-contain"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
          <span className="flex-1 max-w-[100px] h-px bg-[#c8c5b9]"></span>
        </div>
      </div>

      <LazyMotion features={domAnimation}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => handleClick(card.title)}
              type="button"
              aria-label={`افتح قسم ${card.title}`}
              className="relative overflow-hidden rounded-[28px] shadow-xl hover:shadow-2xl transition-shadow duration-300 aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-amber-500 transform-gpu will-change-transform"
              initial={getInitial(index, isMd)}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{
                once: false,          // يعيد الأنميشن لو خرج/دخل ثانية (اختياري)
                amount: 0.25,         // يبدأ بدري شوية
                margin: '0px 0px -10% 0px', // يخفّف التقطيع بتفعيل أبكر
              }}
              transition={{ ...spring, duration: 0.5, delay: (index % 3) * 0.05 + Math.floor(index / 3) * 0.1 }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end p-4">
                {card.trend && (
                  <p className="text-xs md:text-sm font-medium text-gray-200">{card.trend}</p>
                )}
                <h4 className="text-lg md:text-xl font-bold text-white mt-1 text-center">
                  {card.title}
                </h4>
              </div>
            </motion.button>
          ))}
        </div>
      </LazyMotion>
    </section>
  );
};

export default HeroSection;
