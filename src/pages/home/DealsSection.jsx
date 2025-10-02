import React from 'react';
import { motion } from 'framer-motion';
import img1 from "../../assets/تعديل-بنر-صغير-02.png";
import img2 from "../../assets/تعديل-بنر-صغير.png";

const DealsSection = () => {
  const slide = (direction) => ({
    initial: { opacity: 0, x: direction === 'right' ? 48 : -48 },
    whileInView: { opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 100, damping: 18, mass: 0.4, duration: 0.6 },
    viewport: { once: false, amount: 0.25, margin: '-10% 0px -10% 0px' },
  });

  const cardCls =
    "w-4/5 rounded-[20px] shadow-lg h-36 bg-cover bg-center " +
    "md:h-auto md:aspect-[541/292] md:bg-contain md:bg-no-repeat md:bg-center " +
    "transform-gpu";

  return (
    <section className="px-1 py-8 overflow-x-hidden">
      <div className="w-full space-y-3 md:space-y-6">
        {/* الصورة الأولى: يمين → يسار */}
        <div className="flex justify-end overflow-hidden">
          <motion.div
            {...slide('right')}
            className={cardCls}
            style={{ backgroundImage: `url(${img1})`, willChange: 'transform, opacity' }}
          />
        </div>

        {/* الصورة الثانية: يسار → يمين */}
        <div className="flex justify-start overflow-hidden">
          <motion.div
            {...slide('left')}
            className={cardCls}
            style={{ backgroundImage: `url(${img2})`, willChange: 'transform, opacity' }}
          />
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
