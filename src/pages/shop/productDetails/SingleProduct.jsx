// src/pages/shop/productDetails/SingleProduct.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice"; // عدّل المسار إن لزم
import imge from "../../../assets/تصميم-البنر-الاول0.png";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // ===== جميع الـ hooks هنا وبترتيب ثابت دائماً =====
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const { country = "عمان", products: cartProducts = [] } = useSelector((s) => s.cart || {});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageScale, setImageScale] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const ranMountAnimRef = useRef(false);

  // ✅ اشتقاقات آمنة مبكرة (قبل أي return) حتى لا نعتمد على data بشكل شرطي
  const product = data || null;
  const productId = product?._id || null;

  const rawStock = Number(product?.stock ?? 0);
  const stock = Number.isFinite(rawStock) ? rawStock : 0;

  // اعتبره متوفرًا إذا لم يُذكر عكس ذلك ومع وجود مخزون
  const inStock = (product?.inStock !== false) && stock > 0;

  const currentInCartQty = productId
    ? cartProducts.reduce(
        (sum, it) => sum + ((it?._id || it?.productId) === productId ? Number(it.quantity || 0) : 0),
        0
      )
    : 0;

  const remainingStock = Math.max(0, stock - currentInCartQty);
  const isAtLimit = inStock && currentInCartQty >= stock;

  // تأثير تحريك الصورة (تشغيل مرة واحدة حتى تحت StrictMode التطويري)
  useEffect(() => {
    if (ranMountAnimRef.current) return;
    ranMountAnimRef.current = true;
    setImageScale(1.05);
    const t = setTimeout(() => setImageScale(1), 300);
    return () => clearTimeout(t);
  }, []);

  // ✅ تأثير ضبط الكمية دائماً يُستدعى (حتى إن كانت data غير جاهزة)
  useEffect(() => {
    if (!inStock) {
      if (selectedQty !== 1) setSelectedQty(1);
      return;
    }
    if (selectedQty > remainingStock) {
      setSelectedQty(Math.max(1, remainingStock));
    } else if (selectedQty < 1) {
      setSelectedQty(1);
    }
  }, [inStock, remainingStock, selectedQty]);
  // ===== انتهت جميع الـ hooks قبل أي return =====

  // الآن يمكن عمل early returns بأمان دون تغيير عدد الـ hooks
  if (isLoading) return <p className="text-center py-10">جاري التحميل...</p>;
  if (error) return <p className="text-center py-10">حدث خطأ أثناء تحميل تفاصيل المنتج.</p>;
  if (!product || !productId) return <p className="text-center py-10">لم يتم العثور على هذا المنتج.</p>;

  // بقية المشتقات لعرض الواجهة (لا تحتوي على hooks)
  const images = Array.isArray(product.image)
    ? product.image
    : product.image
    ? [product.image]
    : [];
  const hasImages = images.length > 0;

  const incQty = () => {
    if (!inStock) return;
    setSelectedQty((q) => Math.min((Number(q) || 1) + 1, Math.max(1, remainingStock)));
  };
  const decQty = () => setSelectedQty((q) => Math.max(1, (Number(q) || 1) - 1));
  const setQtyDirect = (val) => {
    const n = Math.max(1, Number(val || 1));
    setSelectedQty(Math.min(n, Math.max(1, remainingStock)));
  };

  const handleAdd = () => {
    if (!inStock) return;
    const maxCanAdd = Math.max(0, stock - currentInCartQty);
    if (maxCanAdd <= 0) return;

    const addQty = Math.min(selectedQty, maxCanAdd);
    setIsAdding(true);

    dispatch(
      addToCart({
        _id: productId,
        productId: productId,
        name: product.name,
        category: product.category,
        price: Number(product.price || 0), // بالعملة الأساسية (ر.ع.)
        image: images,
        quantity: addQty,
        stock: stock, // تمرير المخزون لضبط الحدود في السلة
        measurements: product.measurements || null,
        giftCard: product.giftCard || null,
      })
    );

    setTimeout(() => setIsAdding(false), 700);
  };

  const nextImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((p) => (p >= images.length - 1 ? 0 : p + 1));
  };
  const prevImage = () => {
    if (!hasImages) return;
    setCurrentImageIndex((p) => (p <= 0 ? images.length - 1 : p - 1));
  };

  const isAED = country === "الإمارات" || country === "دول الخليج";
  const currency = isAED ? "د.إ" : "ر.ع.";
  const exchangeRate = isAED ? 9.5 : 1;

  const displayPrice = (Number(product.price || 0) * exchangeRate).toFixed(2);
  const displayOldPrice = product.oldPrice ? (Number(product.oldPrice) * exchangeRate).toFixed(2) : null;
  const showDiscount = displayOldPrice && Number(displayOldPrice) > Number(displayPrice);

  return (
    <>
      {/* بنر علوي */}
      <section className="relative w-full overflow-hidden bg-[#e2e5e5]" style={{ aspectRatio: "16/9" }}>
        <img src={imge} alt="متجر" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4"></h1>
        </div>
      </section>

      {/* تفاصيل المنتج */}
      <section className="section__container mt-8" dir="rtl">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* عمود الصور */}
          <div className="md:w-1/2 w-full relative">
            {showDiscount && (
              <div className="absolute top-3 left-3 bg-[#42a0ec] text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                خصم{" "}
                {Math.round(
                  ((Number(product.oldPrice || 0) - Number(product.price || 0)) / (Number(product.oldPrice || 1))) * 100
                )}
                %
              </div>
            )}

            {hasImages ? (
              <>
                {/* الصورة الرئيسية */}
                <div className="overflow-hidden rounded-md">
                  <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-auto transition-transform duration-300"
                    style={{ transform: `scale(${imageScale})` }}
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/600x600?text=Image+Not+Found";
                    }}
                  />
                </div>

                {/* أزرار التالي/السابق على الشاشات الكبيرة فقط */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      aria-label="السابق"
                    >
                      <i className="ri-arrow-left-s-line" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                      aria-label="التالي"
                    >
                      <i className="ri-arrow-right-s-line" />
                    </button>
                  </>
                )}

                {/* كل الصور بالأسفل (موبايل وكمبيوتر) */}
                {images.length > 1 && (
                  <div className="mt-4">
                    <div className="flex flex-wrap justify-center gap-2 sm:grid sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 sm:gap-2">
                      {images.map((src, idx) => {
                        const isActive = idx === currentImageIndex;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative overflow-hidden rounded-md border transition-all
                              ${isActive ? "border-[#42a0ec] ring-2 ring-[#42a0ec]/40" : "border-gray-200"}
                              w-20`}
                            aria-label={`صورة رقم ${idx + 1}`}
                            title={`صورة رقم ${idx + 1}`}
                          >
                            <img
                              src={src}
                              alt={`${product.name} - ${idx + 1}`}
                              className={`w-full h-16 object-cover ${isActive ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150x150?text=No+Image";
                              }}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-red-600 text-center md:text-right">لا توجد صور متاحة لهذا المنتج.</p>
            )}
          </div>

          {/* عمود المعلومات */}
          <div className="md:w-1/2 w-full text-center md:text-right md:mt-60">
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>

            <div className="text-xl text-[#3D4B2E] mb-4">
              {displayPrice} {currency}
              {showDiscount && (
                <s className="text-red-500 text-sm ml-2">
                  {displayOldPrice} {currency}
                </s>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-gray-500 mb-4 text-lg font-medium leading-relaxed">
                <span className="text-gray-800 font-bold block">الفئة:</span>
                <span className="text-gray-600">{product.category}</span>
              </p>
            </div>

            <p className="text-gray-500 mb-4 text-lg font-medium leading-relaxed">
              <span className="text-gray-800 font-bold block">الوصف:</span>
              <span className="text-gray-600">{product.description}</span>
            </p>

            {/* حالة التوفر */}
            {!inStock && <p className="text-red-600 font-medium mt-2">غير متوفر حالياً</p>}
            {inStock && isAtLimit && (
              <p className="text-amber-600 font-medium mt-2">وصلت للحد الأقصى المتاح في السلة ({stock})</p>
            )}

            {/* متحكم الكمية */}
            {inStock && (
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                <button
                  type="button"
                  onClick={decQty}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-[#42a0ec] text-white hover:opacity-90 disabled:opacity-50"
                  aria-label="نقصان"
                  disabled={selectedQty <= 1}
                  title="إنقاص الكمية"
                >
                  −
                </button>

                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={selectedQty}
                  onChange={(e) => setQtyDirect(e.target.value)}
                  className="w-16 text-center rounded-md border border-[#42a0ec] text-[#42a0ec] font-semibold px-2 py-2 outline-none focus:ring-2 focus:ring-[#42a0ec]/40"
                  aria-label="الكمية"
                  title="تعديل الكمية"
                />

                <button
                  type="button"
                  onClick={incQty}
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-[#42a0ec] text-white hover:opacity-90 disabled:opacity-50"
                  aria-label="زيادة"
                  disabled={selectedQty >= remainingStock || isAtLimit}
                  title={remainingStock <= 0 ? "لا يوجد مخزون متاح" : "زيادة الكمية"}
                >
                  +
                </button>
              </div>
            )}

            {/* زر الإضافة */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              disabled={!inStock || isAtLimit || isAdding || selectedQty < 1 || remainingStock <= 0}
              className={`mt-6 px-6 py-3 rounded-md text-white transition-all duration-200 relative overflow-hidden mx-auto md:mx-0
                ${!inStock || isAtLimit || remainingStock <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-[#42a0ec] hover:opacity-90"}
                ${isAdding ? "bg-green-600" : ""}`}
            >
              {!inStock
                ? "غير متوفر"
                : isAtLimit || remainingStock <= 0
                ? "لا يمكن إضافة كمية أكثر"
                : isAdding
                ? "تمت الإضافة!"
                : `إضافة ${selectedQty} إلى السلة`}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
