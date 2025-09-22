// src/pages/ReturnPolicy.jsx
import React from 'react';

const ReturnPolicy = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        
        {/* العنوان الرئيسي */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#42a0ec] mb-6">
          سياسة الاسترجاع والاستبدال
        </h1>

        {/* مقدمة */}
        <div className="mb-8 text-right">
          <p className="text-gray-700 text-lg leading-relaxed">
            نحرص دائمًا على رضا عملائنا وتقديم أفضل تجربة تسوّق، 
            لذا نوضح فيما يلي سياسة الاسترجاع والاستبدال الخاصة بنا:
          </p>
        </div>

        {/* البنود */}
        <div className="space-y-8 text-right">
          
          {/* البند الأول */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-xl font-semibold text-[#42a0ec] mb-3">1. شروط الاسترجاع</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 leading-relaxed">
              <li>يحق للعميل استرجاع المنتج خلال <span className="font-semibold text-[#42a0ec]">3 – 7 أيام</span> من تاريخ الشراء.</li>
              <li>يجب أن يكون المنتج بحالته الأصلية غير مستخدم، غير مفتوح، وبغلافه/تغليفه الأصلي.</li>
              <li>لا يمكن استرجاع أو استبدال المنتجات المفتوحة أو المجرّبة حفاظًا على جودة وسلامة المنتجات.</li>
              <li>يجب إبراز فاتورة الشراء أو إثبات الدفع عند طلب الاسترجاع.</li>
            </ul>
          </div>

          {/* البند الثاني */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-xl font-semibold text-[#42a0ec] mb-3">2. شروط الاستبدال</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 leading-relaxed">
              <li>يمكن استبدال المنتج خلال <span className="font-semibold text-[#42a0ec]">7 – 14 يومًا</span> من تاريخ الشراء بنفس الشروط أعلاه (غير مفتوح، بحالته الأصلية).</li>
              <li>في حال وجود <span className="text-[#42a0ec] font-semibold">عيب مصنعي</span> في المنتج، يحق للعميل الاستبدال أو الاسترجاع فورًا بعد التحقق من الحالة.</li>
            </ul>
          </div>

          {/* البند الثالث */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-xl font-semibold text-[#42a0ec] mb-3">3. المنتجات غير القابلة للاسترجاع أو الاستبدال</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 leading-relaxed">
              <li>العطور المفتوحة أو المجرّبة.</li>
              <li>المنتجات التالفة نتيجة سوء التخزين أو الاستخدام من قبل العميل.</li>
              <li>العروض الترويجية أو الهدايا المجانية المرتبطة بالطلب (إلا في حال وجود عيب مصنعي).</li>
            </ul>
          </div>

          {/* البند الرابع */}
          <div>
            <h3 className="text-xl font-semibold text-[#42a0ec] mb-3">4. آلية الاسترجاع</h3>
            <ul className="list-disc pr-5 space-y-2 text-gray-700 leading-relaxed">
              <li>يتم استرجاع المبلغ بنفس وسيلة الدفع التي استخدمها العميل.</li>
              <li>قد يستغرق إرجاع المبلغ من <span className="font-semibold text-[#42a0ec]">3 – 14 يوم عمل</span> بحسب البنك أو الجهة المزودة لوسيلة الدفع.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
