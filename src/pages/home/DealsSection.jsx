import React from 'react';
import { motion } from 'framer-motion';
import img2 from "../../assets/بنر-صغير--03.png";
import img1 from "../../assets/بنر-صغير-04.png";

const DealsSection = () => {
  const slide = (direction) => ({
    initial: { opacity: 0, x: direction === 'right' ? 48 : -48 },
    whileInView: { opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 100, damping: 18, mass: 0.4, duration: 0.6 },
    viewport: {
      once: false,
      amount: 0.25,
      margin: '-10% 0px -10% 0px', // يبدأ قبل ما يوصل تمامًا لتقليل أي ومض
    },
  });

  return (
    <section className="px-1 py-8 overflow-x-hidden"> {/* يمنع أي تمدد أفقي */}
      <div className="w-full space-y-3 md:space-y-6">
        {/* الصورة الأولى: يمين → يسار */}
        <div className="flex justify-end overflow-hidden"> {/* غلاف يمنع التسريب */}
          <motion.div
            {...slide('right')}
            className="w-4/5 rounded-[20px] shadow-lg h-36 md:h-64 bg-cover bg-center transform-gpu"
            style={{ backgroundImage: `url(${img1})`, willChange: 'transform, opacity' }}
          />
        </div>

        {/* الصورة الثانية: يسار → يمين */}
        <div className="flex justify-start overflow-hidden">
          <motion.div
            {...slide('left')}
            className="w-4/5 rounded-[20px] shadow-lg h-36 md:h-64 bg-cover bg-center transform-gpu"
            style={{ backgroundImage: `url(${img2})`, willChange: 'transform, opacity' }}
          />
        </div>
      </div>
    </section>
  );
};

export default DealsSection;




// import React from 'react';
// import img1 from "../../assets/بنر-صغير--03.png";
// import img2 from "../../assets/بنر-صغير-04.png";

// const DealsSection = () => {
//   return (
//     <section className="px-1 py-8">
//       <div className="grid grid-cols-2 gap-2 md:gap-6">
//         <div className="overflow-hidden rounded-[20px] shadow-lg">
//           <img
//             src={img1}
//             alt="وصلنا حديثاً"
//             className="w-48 h-36 object-cover"
//             loading="lazy"
//           />
//         </div>
//         <div className="overflow-hidden rounded-[20px] shadow-lg">
//           <img
//             src={img2}
//             alt="أونلاين حصرياً"
//             className="w-48 h-36 object-cover "
//             loading="lazy"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DealsSection;
