// ========================= src/components/shop/ProductCards.jsx =========================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({ products = [] }) => {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});
  const { country } = useSelector((state) => state.cart);

  const isAEDCountry = country === 'الإمارات' || country === 'دول الخليج';
  const currency = isAEDCountry ? 'د.إ' : 'ر.ع.';
  const exchangeRate = isAEDCountry ? 9.5 : 1;

  const getBasePriceForCompare = (product) => {
    if (!product) return 0;
    if (typeof product.price === 'object' && product.price !== null) {
      return product.price['500 جرام'] || product.price['1 كيلو'] || 0;
    }
    return product.regularPrice || product.price || 0;
  };

  const formatPrice = (v) => {
    if (Number.isInteger(v)) return String(v);
    const fixed = Number(v).toFixed(2);
    return fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed;
  };

  // ✅ دائماً أضف إلى السلة (لا تنقل إلى صفحة المنتج)
  const handleAddToCart = (productId, product) => {
    const originalPrice = getBasePriceForCompare(product); // بالعملة الأساسية (ر.ع.)
    dispatch(addToCart({ ...product, price: originalPrice, quantity: 1 }));

    setAddedItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [productId]: false })), 1000);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" dir="rtl">
      {products.map((product) => {
        const basePrice = getBasePriceForCompare(product);
        const price = basePrice * exchangeRate;
        const oldPrice = product?.oldPrice ? product.oldPrice * exchangeRate : null;
        const hasRealDiscount = product?.oldPrice && product.oldPrice > basePrice;
        const discountPercentage = hasRealDiscount
          ? Math.round(((product.oldPrice - basePrice) / product.oldPrice) * 100)
          : 0;

        const qtyCandidate = [product?.stock, product?.quantity, product?.availableQty, product?.available]
          .find((v) => Number.isFinite(Number(v)));
        const availableQty = qtyCandidate !== undefined ? Number(qtyCandidate) : undefined;
        const isOutOfStock = product?.inStock === false || (typeof availableQty === 'number' && availableQty <= 0);

        return (
          <div
            key={product._id}
            className="bg-white rounded-[22px] shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] transition-shadow duration-300 relative flex flex-col"
          >
            {/* الصورة */}
            <div className="px-3 pt-3">
              <div className="relative aspect-[4/6] md:aspect-[4/5] rounded-xl overflow-hidden">
                <Link to={`/shop/${product._id}`} className="block">
                  <div className="w-full h-60 overflow-hidden rounded-xl">
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
                  </div>
                </Link>

                {hasRealDiscount && (
                  <div className="absolute top-3 left-3 bg-[#42a0ec] text-white text-xs font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                    خصم {discountPercentage}%
                  </div>
                )}

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md">انتهى المنتج</span>
                  </div>
                )}
              </div>
            </div>

            {/* فاصل ظل */}
            <div className="relative px-5 mt-2">
              <div className="h-px bg-gray-200"></div>
              <div className="absolute left-0 top-full w-full h-4 bg-black/10 rounded-full blur-lg"></div>
            </div>

            {/* الاسم */}
            <div className="px-5 mt-3">
              <div className="w-full flex items-center justify	end gap-2">
                <h4 className="flex-1 text-[18px] font-extrabold truncate text-right" title={product.name}>
                  {product.name || 'اسم المنتج'}
                </h4>
              </div>
            </div>

            {/* السعر + زر الإضافة */}
            <div className="px-5 py-4 mt-auto flex items-end justify-between">
              <div className="leading-tight text-right">
                <div className="text-2xl font-bold leading-none">
                  {formatPrice(price)}{' '}
                  <span className="text-gray-800 text-xl align-middle">{currency}</span>
                </div>
                {oldPrice && oldPrice > price && (
                  <div className="mt-1 text-sm text-gray-500 line-through">
                    {formatPrice(oldPrice)}{' '}
                    <span className="text-gray-500 align-middle">{currency}</span>
                  </div>
                )}
              </div>

              <button
                disabled={isOutOfStock}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product._id, product); }}
                className={`px-4 py-2 rounded-full text-white text-sm font-semibold transition
                  ${isOutOfStock ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#42a0ec]'}
                `}
                title="أضف إلى السلة"
              >
                {addedItems[product._id] ? '✓ تمت الإضافة' : 'أضف إلى السلة'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;
