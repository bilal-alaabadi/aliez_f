// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div dir="rtl" className="bg-white text-black">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* أزلنا الخلفية المتدرجة للحفاظ على خلفية بيضاء صافية */}
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* النص */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
                <span>ALIEZ</span>
                <br />
                عالم من <span>العطور الفاخرة</span>
              </h1>

              <p className="text-lg leading-8 text-black mb-6">
                تأسست <span className="font-semibold">ALIEZ</span> من شغفٍ بالعطور
                التي تترك بصمة خالدة. نؤمن أن العطر ليس مجرد رائحة، بل هو قصة وهوية
                تُروى في كل لحظة، ورفيق يُجسد شخصية من يرتديه.
              </p>

              <ul className="space-y-3 text-black mb-8">
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-black mt-1" />
                  تركيبات عطرية حصرية ومبتكرة.
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-black mt-1" />
                  خامات عالية الجودة من الزيوت الطبيعية.
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-check-line text-black mt-1" />
                  ثبات يدوم لساعات طويلة.
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

      {/* القيم والرؤية */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 md:p-8 rounded-3xl border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">قصتنا</h2>
            <p className="text-black leading-8">
              انطلقت <span className="font-semibold">ALIEZ</span> من فكرة بسيطة:
              أن يُصبح كل عطر توقيعًا فريدًا لصاحبه. من الشرق إلى الغرب،
              اخترنا أجود المكونات لنمزج بين الأصالة والحداثة في كل زجاجة.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-3xl border border-gray-200">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
              رؤيتنا
            </h3>
            <ul className="space-y-3 text-black">
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                أن نُصبح الخيار الأول لعشّاق العطور الفاخرة.
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                تقديم تجربة حسية فريدة تُلهم وتدوم.
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-star-line text-black mt-1" />
                الحفاظ على هوية عُمانية مع طابع عالمي.
              </li>
            </ul>
          </div>
        </div>

        {/* المميزات */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: 'ri-sparkling-2-line', title: 'تركيبات مميزة', desc: 'عطور تُصمم خصيصًا لتعكس شخصيتك.' },
            { icon: 'ri-leaf-line', title: 'مكونات طبيعية', desc: 'زيوت عطرية نقية من مصادر موثوقة.' },
            { icon: 'ri-time-line', title: 'ثبات طويل', desc: 'روائح تدوم وتبقى عالقة بالذاكرة.' },
          ].map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-gray-200 hover:shadow-md transition">
              <i className={`${f.icon} text-2xl text-black`} />
              <h4 className="mt-3 font-bold text-black">{f.title}</h4>
              <p className="text-black mt-1 text-sm leading-7">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ختام */}
        <div className="mt-16 text-center">
          <p className="text-xl font-semibold text-black">
            ALIEZ… حيث يلتقي العطر بالفخامة والهوية.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
