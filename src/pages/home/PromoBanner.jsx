// PromoBanner.jsx
import React, { useRef, useEffect } from 'react';
import bannerImage from "../../assets/بنر-متجر-01.png";

const PromoBanner = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // أعد تشغيل الأنيميشن بإزالة ثم إضافة الكلاس
          el.classList.remove('slide-down');
          // إجبار إعادة الـ reflow لإعادة تشغيل الـ animation
          void el.offsetWidth;
          el.classList.add('slide-down');
        }
      },
      { threshold: 0.2 } // يبدأ التحريك عند ظهور 20% من العنصر
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="px-1 py-8">
      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .slide-down {
          animation: slideDown 0.8s ease-out forwards;
        }
      `}</style>

      <div className="overflow-hidden w-full rounded-2xl shadow-lg bg-black/5">
        <img
          ref={imgRef}
          src={bannerImage}
          alt="بنر المتجر الترويجي"
          className="block w-full md:h-[360px] object-cover object-center slide-down"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default PromoBanner;
