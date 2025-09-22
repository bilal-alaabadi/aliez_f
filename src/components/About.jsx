// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div dir="rtl" className="bg-white text-black">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* النص */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
                <span>المتوسم للعطور</span>
                <br />
                بإشراف المصمّم <span>علي إبراهيم العجمي</span>
              </h1>

              <p className="text-lg leading-8 text-black mb-6">
                المتوسم للعطور شركة متخصصة في عالم العطور، تأسست تحت إشراف
                الأستاذ ومصمّم العطور <span className="font-semibold">علي إبراهيم العجمي</span>،
                صاحب خبرة تمتد لأكثر من <span className="font-semibold">14 عامًا</span> في تجارة وتصميم العطور.
                نؤمن أن العطر ليس مجرد رائحة، بل هو قصة وهوية تُروى في كل لحظة.
              </p>

              <ul className="space-y-3 text-black mb-8">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-black mt-1" />
                  تركيبات عطرية مبتكرة تعكس الأصالة والفخامة.
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-black mt-1" />
                  جودة عالية وانتقاء دقيق للمواد والزيوت العطرية.
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-black mt-1" />
                  تجربة حسية متكاملة في المنتج والتدريب والخدمة.
                </li>
              </ul>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-black bg-white text-black font-bold hover:bg-gray-100 transition"
              >
                اكتشف مجموعتنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* القصة والرؤية */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* قصتنا */}
          <div className="p-6 md:p-8 rounded-3xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">من نحن؟</h2>
            <p className="text-black leading-8">
              بدأت رحلة <span className="font-semibold">علي العجمي</span> عام <span className="font-semibold">2011م</span>
              بافتتاح أول محل متخصص في البراندات العالمية بولاية السويق.
              وفي <span className="font-semibold">2014</span> توسعت الرؤية إلى تعلم وصناعة العطور،
              لتتحول مع الوقت إلى إبداعٍ في تصميم تركيبات جديدة تجمع بين الأصالة والحداثة.
            </p>
            <p className="text-black leading-8 mt-4">
              في <span className="font-semibold">2020</span> انطلقت المتوسم للعطور عبر متجر جديد يقدم تجربة متكاملة؛
              ليس فقط بمنتجات مميزة، بل أيضاً عبر تنظيم دورات تدريبية متخصصة في صناعة العطور.
              قدّمنا أكثر من <span className="font-semibold">15 دورة</span> درّبنا خلالها ما يزيد عن
              <span className="font-semibold"> 300 متدرب</span> من مختلف محافظات سلطنة عُمان.
            </p>
            <p className="text-black leading-8 mt-4">
              ساهمنا في نشر ثقافة العطور من خلال محاضرات وورش عمل في الجامعات والمدارس،
              ومن أبرز محطاتنا <span className="font-semibold">جامعة السلطان قابوس</span>.
            </p>
            <p className="text-black leading-8 mt-4">
              وفي <span className="font-semibold">2025</span> عززنا مكانتنا بالحصول على
              <span className="font-semibold"> شهادة مصمم عطور</span> من معهد <span className="font-semibold">جراس</span> للعطور بفرنسا،
              أحد أعرق المعاهد العالمية في هذا المجال.
            </p>
          </div>

          {/* رؤيتنا */}
          <div className="p-6 md:p-8 rounded-3xl border border-gray-200">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">رؤيتنا ورسالتنا</h3>
            <ul className="space-y-3 text-black">
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                أن نكون الوجهة الأولى لعشّاق العطور في سلطنة عُمان وخارجها.
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                ابتكار تركيبات فاخرة تُجسد الهوية وتترك أثراً يدوم.
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                نقل المعرفة عبر الدورات والورش لتطوير مجتمع صُنّاع العطور.
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                الحفاظ على الجذور العُمانية مع رؤية عالمية في الجودة والتصميم.
              </li>
            </ul>
          </div>
        </div>

        {/* إنجازات مختصرة / أرقام */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: 'ri-calendar-line', title: 'بداية الرحلة', desc: '2011 • أول محل في السويق' },
            { icon: 'ri-flask-line', title: 'صناعة العطور', desc: 'منذ 2014 • تعلّم وتطوير الصيغ' },
            { icon: 'ri-graduation-cap-line', title: 'تدريب وتعليم', desc: '15+ دورة • 300+ متدرب' },
            { icon: 'ri-award-line', title: 'اعتماد عالمي', desc: '2025 • شهادة جراس – فرنسا' },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-200 hover:shadow-md transition">
              <i className={`${f.icon} text-2xl text-black`} />
              <h4 className="mt-3 font-bold text-black">{f.title}</h4>
              <p className="text-black mt-1 text-sm leading-7">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* المميزات */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: 'ri-sparkling-2-line', title: 'تركيبات مميزة', desc: 'ابتكار صيغ عطرية تعكس الأصالة والفخامة.' },
            { icon: 'ri-leaf-line', title: 'مكونات منتقاة', desc: 'زيوت وخامات عالية الجودة من مصادر موثوقة.' },
            { icon: 'ri-time-line', title: 'ثبات يدوم', desc: 'روائح تبقى عالقة بالذاكرة لساعات طويلة.' },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-200 hover:shadow-md transition">
              <i className={`${f.icon} text-2xl text-black`} />
              <h4 className="mt-3 font-bold text-black">{f.title}</h4>
              <p className="text-black mt-1 text-sm leading-7">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ختام + CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold text-black mb-6">
            نواصل تقديم أجود المنتجات والخدمات مع الإبداع والتميّز… لتبقى المتوسم للعطور اختيارك الأول.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-black bg-white text-black font-bold hover:bg-gray-100 transition"
          >
            تسوّق الآن
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
