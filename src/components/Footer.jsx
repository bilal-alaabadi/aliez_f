import React from "react";
import log from "../assets/logo without background  (1).png"; // شعار RF_COLLECTION
import Thw from "../assets/images__4_-removebg-preview.png";
import { SiVisa, SiMastercard, SiApplepay, SiGooglepay } from "react-icons/si";
import { FaInstagram, FaWhatsapp, FaSnapchatGhost, FaTiktok } from "react-icons/fa";

const Footer = () => {
  // لون الأسد (Lion) #C19A6B
  const lion = "black";

  return (
    <footer className="bg-white">
      {/* ===== شريط علوي FULL-BLEED بعرض الشاشة بالكامل ===== */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {/* الخلفية المنحنية */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 36"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M28 0 H100 V36 H28 A28 28 0 0 1 28 0 Z" fill="#42a0ec" />
        </svg>

        {/* محتوى الشريط */}
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* الشعار */}
            <div className="shrink-0 self-start">
              <img
                src={log}
                alt="شعار RF_COLLECTION"
                className="w-28 md:w-40 object-contain select-none pointer-events-none"
              />
            </div>

            {/* وسائل الدفع */}
            <div className="text-white w-full md:w-auto md:ml-auto md:self-center">
              <div className="w-full flex justify-end">
                <div className="flex items-center gap-5 md:gap-6 mb-3 md:mb-4">
                  <SiVisa className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiMastercard className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiApplepay className="text-3xl md:text-4xl drop-shadow-sm" />
                  <SiGooglepay className="text-3xl md:text-4xl drop-shadow-sm" />
                  <img src={Thw} className="w-10 invert brightness-0" alt="Thawani" />
                </div>
              </div>

              <p className="text-right text-lg md:text-2xl font-semibold leading-relaxed">
                وسائل دفع متعددة
                <br />
                اختر وسيلة الدفع المناسبة
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ===== نهاية الشريط العلوي ===== */}

      {/* الأقسام السفلية */}
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="py-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-white md:text-right text-center"
          style={{ color: lion }}
        >
          {/* روابط مهمة */}
          <div>
            <h4 className="text-xl font-bold mb-3">روابط مهمة</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="transition" style={{ color: lion }}>
                  من نحن
                </a>
              </li>
              <li>
                <a href="/return-policy" className="transition" style={{ color: lion }}>
                  سياسة الاستبدال والاسترجاع
                </a>
              </li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div>
            <h4 className="text-xl font-bold mb-3">تواصل معنا</h4>

            {/* البريد */}
            <p className="text-sm mb-2" style={{ direction: "ltr" }}>
              <a href="mailto:Perfume.om90@gmail.com" style={{ color: lion }}>
                Perfume.om90@gmail.com
              </a>
            </p>

            {/* واتساب */}
            <p className="text-sm mb-4" style={{ direction: "ltr" }}>
              <a
                href="https://wa.me/96877193401"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: lion }}
                title="واتساب"
              >
                +968 7719 3401
              </a>{" "}
              <span style={{ color: lion }}>— واتساب</span>
            </p>

            {/* أيقونات السوشيال: نحافظ على لونها الافتراضي (لا ترث لون الأسد) */}
            <div className="flex justify-center md:justify-end gap-4 text-black">
              <a
                href="https://www.instagram.com/aliez.om"
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                title="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://wa.me/96877193401"
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                title="WhatsApp"
              >
                <FaWhatsapp className="text-xl" />
              </a>
              {/* <a
                href="https://www.snapchat.com/add/rf_collectio999"
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                title="Snapchat"
              >
                <FaSnapchatGhost className="text-xl" />
              </a> */}
              <a
                href="https://www.tiktok.com/@aliez.om"
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                title="TikTok"
              >
                <FaTiktok className="text-xl" />
              </a>
            </div>
          </div>

          {/* عمود فارغ/للمستقبل أو وصف مختصر (اختياري) */}
          <div />
        </div>

        {/* الحقوق */}
        <div
          className="border-t pt-4 pb-8 text-center text-sm"
          dir="rtl"
          style={{ borderColor: `${lion}4D`, color: lion }}
        >
          جميع الحقوق محفوظة لدى متوسم —{" "}
          <a
            href="https://www.instagram.com/mobadeere/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors"
            style={{ color: lion }}
          >
            تصميم مبادر
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
