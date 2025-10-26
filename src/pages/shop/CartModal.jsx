// CartModal.jsx
import React from 'react';
import { RiCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../redux/features/cart/cartSlice';
import OrderSummary from './OrderSummary';

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { country, products: cartProducts = [] } = useSelector((s) => s.cart || {});
  const items = Array.isArray(cartProducts) ? cartProducts : [];

  if (!isOpen) return null;

  const hasGiftInfo = (gc) => {
    if (!gc || typeof gc !== 'object') return false;
    const val = (v) => (v ?? '').toString().trim();
    return !!(val(gc.from) || val(gc.to) || val(gc.phone) || val(gc.note));
  };

  const makeLineKey = (p) => {
    const id = p?._id || p?.productId || "";
    const m = p?.measurements ? JSON.stringify(p.measurements) : "{}";
    let gift = "{}";
    if (hasGiftInfo(p?.giftCard)) {
      const norm = {
        from: (p.giftCard.from || "").toString().trim(),
        to: (p.giftCard.to || "").toString().trim(),
        phone: (p.giftCard.phone || "").toString().trim(),
        note: (p.giftCard.note || "").toString().trim(),
      };
      gift = JSON.stringify(norm);
    }
    return `${id}::${m}::${gift}`;
  };

  const isAEDCountry = country === 'الإمارات' || country === 'دول الخليج';
  const currency = isAEDCountry ? 'د.إ' : 'ر.ع.';
  const exchangeRate = isAEDCountry ? 9.5 : 1;

  // دالة لحساب المتبقي لهذا السطر مع احتساب بقية الأسطر لنفس المنتج
  const remainingForLine = (line) => {
    const productId = line?._id || line?.productId;
    const stock = Number(line?.stock);
    if (!Number.isFinite(stock)) return Infinity;
    const totalForProduct = items
      .filter((p) => (p._id || p.productId) === productId)
      .reduce((s, p) => s + Number(p.quantity || 0), 0);
    const remaining = Math.max(0, stock - totalForProduct);
    return remaining; // يشمل هذا السطر أيضاً، لذلك إذا كان 0 يمنع الزيادة
  };

  return (
    <div className="fixed inset-0 z-50" dir="rtl">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <aside
        className="absolute right-0 top-0 h-full w-[90vw] max-w-sm bg-white shadow-2xl rounded-l-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 id="cart-title" className="text-lg font-bold text-gray-900">سلة التسوق</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded p-1" aria-label="إغلاق">
            <RiCloseLine size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {items.length === 0 ? (
            <p className="text-center text-gray-600 py-10">سلة التسوق فارغة</p>
          ) : (
            items.map((product) => {
              const lineKey = makeLineKey(product);
              const qty = Number(product.quantity || 0);
              const displayPrice = (Number(product.price || 0) * (isAEDCountry ? 9.5 : 1)).toFixed(2);

              const stock = Number(product?.stock);
              const productId = product?._id || product?.productId;
              const totalForProduct = items
                .filter((p) => (p._id || p.productId) === productId)
                .reduce((s, p) => s + Number(p.quantity || 0), 0);
              const canIncrement = Number.isFinite(stock) ? totalForProduct < stock : true;

              return (
                <div key={lineKey} className="pb-5 border-b">
                  <div className="flex gap-3 flex-row-reverse">
                    <img
                      src={Array.isArray(product.image) ? product.image[0] : product.image}
                      alt={product.name}
                      className="w-16 h-24 aspect-square object-cover flex-shrink-0 rounded-none"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-5 line-clamp-2">
                            {product.name}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
                            {displayPrice} {currency}
                          </p>
                        </div>
                      </div>

                      {hasGiftInfo(product.giftCard) && (
                        <div className="mt-2 p-2 rounded-md bg-pink-50 border border-pink-200 text-[12px] text-pink-900 space-y-0.5">
                          <div className="font-semibold text-pink-700">بطاقة هدية</div>
                          {product.giftCard.from?.trim() && <div>من: {product.giftCard.from}</div>}
                          {product.giftCard.to?.trim() && <div>إلى: {product.giftCard.to}</div>}
                          {product.giftCard.phone?.trim() && <div>رقم المستلم: {product.giftCard.phone}</div>}
                          {product.giftCard.note?.trim() && <div>ملاحظات: {product.giftCard.note}</div>}
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => dispatch(removeFromCart({ lineKey }))}
                          className="text-sm text-red-600 hover:text-red-700 underline underline-offset-2"
                        >
                          إزالة
                        </button>

                        <div className="inline-flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => dispatch(updateQuantity({ lineKey, type: 'decrement' }))}
                            className="px-3 py-1.5 text-gray-700 hover:bg-gray-50"
                            aria-label="إنقاص"
                          >
                            −
                          </button>
                          <span className="px-3 py-1.5 text-gray-900">{qty}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ lineKey, type: 'increment' }))}
                            className={`px-3 py-1.5 ${canIncrement ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'}`}
                            aria-label="زيادة"
                            disabled={!canIncrement}
                            title={canIncrement ? 'زيادة' : 'لا يوجد مخزون متاح'}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {Number.isFinite(Number(product?.stock)) && remainingForLine(product) <= 0 && (
                        <p className="mt-2 text-xs text-amber-600">بلغت الحد الأقصى المتاح لهذا المنتج.</p>
                      )}

                      {product.measurements && (
                        <div className="mt-2 text-sm text-gray-700 space-y-1">
                          {product.measurements.length && <div>الطول: {product.measurements.length}</div>}
                          {product.measurements.sleeveLength && <div>طول الكم: {product.measurements.sleeveLength}</div>}
                          {product.measurements.width && <div>العرض: {product.measurements.width}</div>}
                          {product.measurements.color && <div>اللون: {product.measurements.color}</div>}
                          {product.measurements.notes && <div>ملاحظات: {product.measurements.notes}</div>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="border-t px-5 py-4 bg-white">
          <OrderSummary onClose={onClose} />
        </div>
      </aside>
    </div>
  );
};

export default CartModal;
