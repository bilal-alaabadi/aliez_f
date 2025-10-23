import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import log from "../../assets/logo without background  (1).png";

const TrendingProducts = ({ onProductsLoaded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visibleProducts, setVisibleProducts] = useState(4);
  const { country } = useSelector((s) => s.cart);

  const {
    data: { products = [] } = {},
    error,
    isLoading
  } = useFetchAllProductsQuery({ category: '', page: 1, limit: 20 });

  const notifiedRef = useRef(false);
  useEffect(() => {
    if (!isLoading && !notifiedRef.current) {
      onProductsLoaded?.();
      notifiedRef.current = true;
    }
  }, [isLoading, onProductsLoaded]);

  const isAEDCountry = country === 'الإمارات' || country === 'دول الخليج';
  const currency = isAEDCountry ? 'د.إ' : 'ر.ع.';
  const exchangeRate = isAEDCountry ? 9.5 : 1;

  const loadMoreProducts = () => setVisibleProducts((p) => p + 4);

  const getFirstPrice = (p) => {
    if (!p) return 0;
    if (p.category === 'حناء بودر' && p.price && typeof p.price === 'object') {
      return (p.price['500 جرام'] || p.price['1 كيلو'] || 0) * exchangeRate;
    }
    return (p.regularPrice || p.price || 0) * exchangeRate;
  };

  const getOldPrice = (p) => (p?.oldPrice ? p.oldPrice * exchangeRate : null);

  const formatPrice = (v) =>
    Number.isInteger(v) ? String(v) : Number(v).toFixed(2).replace(/\.00$/, '');

  const resolveAvailableQty = (product) => {
    const candidate = [product?.stock, product?.quantity, product?.availableQty, product?.available]
      .find((v) => Number.isFinite(Number(v)));
    return candidate !== undefined ? Number(candidate) : undefined;
  };

  const handleAddToCart = (product, price) => {
    const basePrice = Number(price / exchangeRate);

    const stock = resolveAvailableQty(product);
    const inStock = product?.inStock !== false && (typeof stock === 'undefined' || stock > 0);

    // امنع الإضافة إذا غير متوفر أو المخزون صفر
    if (!inStock) return;

    dispatch(
      addToCart({
        _id: product._id,
        productId: product._id,
        name: product.name,
        image: Array.isArray(product.image) ? product.image : [product.image],
        price: basePrice, // بالعملة الأساسية (ر.ع.)
        quantity: 1,
        category: product.category,
        stock: typeof stock === 'number' ? stock : undefined, // مرّر المخزون لضبط الحد
        inStock: !!inStock,
      })
    );

    // الانتقال لصفحة المنتج الفردي بعد إضافة المنتج للسلة
    navigate(`/shop/${product._id}`);
  };

  if (isLoading) {
    return (
      <section>
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/90">
          <img
            src={log}
            alt="شعار الأنثور"
            className="w-auto !h-56 md:!h-72 animate-pulse select-none pointer-events-none max-w-none max-h-none"
            draggable="false"
          />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        ⚠️ حدث خطأ أثناء جلب البيانات.
      </div>
    );
  }

  return (
    <section className="section__container" dir="rtl">
      <div className="relative text-center">
        <h2 className="text-[32px] font-normal text-[#C9A33A] mb-1">أحدث المنتجات</h2>
        <div className="flex items-center justify-center gap-3">
          <span className="flex-1 max-w-[100px] h-px bg-[#c8c5b9]"></span>
          <img
            src={log}
            alt="شعار الأنثور"
            className="h-32 md:h-32 w-auto object-contain"
            loading="lazy"
          />
          <span className="flex-1 max-w-[100px] h-px bg-[#c8c5b9]"></span>
        </div>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleProducts).map((product) => {
            const price = getFirstPrice(product);
            const oldPrice = getOldPrice(product);
            const discountPercentage =
              oldPrice && oldPrice !== price
                ? Math.round(((oldPrice - price) / oldPrice) * 100)
                : 0;

            const availableQty = resolveAvailableQty(product);
            const isOutOfStock = product?.inStock === false || (typeof availableQty === 'number' && availableQty <= 0);

            return (
              <div
                key={product._id}
                className="bg-white rounded-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col"
              >
                <Link to={`/shop/${product._id}`} className="block">
                  <div className="px-3 pt-3">
                    <div className="relative aspect-[4/6] md:aspect-[4/5] w-full rounded-xl overflow-hidden">
                      <img
                        src={product.image?.[0] || 'https://via.placeholder.com/300'}
                        alt={product.name || 'صورة المنتج'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/300';
                          e.currentTarget.alt = 'صورة المنتج غير متوفرة';
                        }}
                      />
                      {oldPrice && oldPrice !== price && (
                        <div className="absolute top-3 left-3 bg-[#42a0ec] text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                          خصم {discountPercentage}%
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="relative px-5 mt-2">
                  <div className="h-px bg-gray-200"></div>
                  <div className="absolute left-0 top-full w-full h-4 bg-black/10 rounded-full blur-lg"></div>
                </div>

                <div className="px-5 mt-3">
                  <h4 className="text-[18px] font-extrabold truncate text-right">
                    {product.name || 'اسم المنتج'}
                  </h4>
                </div>

                <div className="px-5 py-4 mt-auto flex items-end justify-between">
                  <div className="leading-tight text-right">
                    <div className="text-2xl font-bold leading-none">
                      {formatPrice(price)} <span className="text-gray-800 text-xl align-middle">{currency}</span>
                    </div>
                    {oldPrice && oldPrice > price && (
                      <div className="mt-1 text-sm text-gray-500 line-through">
                        {formatPrice(oldPrice)} <span className="text-gray-500 align-middle">{currency}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product, price)}
                    className={`px-4 py-2 rounded-full text-white text-sm font-semibold transition ${
                      isOutOfStock ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#42a0ec]'
                    }`}
                    disabled={isOutOfStock}
                    title={isOutOfStock ? 'انتهى المنتج' : 'أضف إلى السلة'}
                  >
                    {isOutOfStock ? 'انتهى المنتج' : 'أضف إلى السلة'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {visibleProducts < products.length && (
        <div className="text-center mt-8">
          <button
            className="hover:bg-[#64B5F6] bg-[#64B5F6] text-white px-6 py-2 rounded-md transition-colors"
            onClick={loadMoreProducts}
          >
            عرض المزيد
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
