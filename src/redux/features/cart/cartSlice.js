// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const DEFAULTS = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  shippingFee: 2,
  country: "عمان",
  giftCard: null,
};

const loadState = () => {
  try {
    const raw = localStorage.getItem("cartState");
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULTS, ...parsed };
  } catch {
    return { ...DEFAULTS };
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("cartState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save cart state:", err);
  }
};

const trim = (v) => (v ?? "").toString().trim();
const hasGiftValues = (gc) =>
  !!(gc && (trim(gc.from) || trim(gc.to) || trim(gc.phone) || trim(gc.note)));

const makeLineKey = (p) => {
  const id = p?._id || p?.productId || "";
  const m = p?.measurements ? JSON.stringify(p.measurements) : "{}";
  let gift = "{}";
  if (hasGiftValues(p?.giftCard)) {
    const norm = {
      from: trim(p.giftCard.from),
      to: trim(p.giftCard.to),
      phone: trim(p.giftCard.phone),
      note: trim(p.giftCard.note),
    };
    gift = JSON.stringify(norm);
  }
  return `${id}::${m}::${gift}`;
};

const lineTotalBase = (product) => {
  const unit = Number(product.price || 0);
  const qty = Number(product.quantity || 0);
  const isShayla =
    product.category === "الشيلات فرنسية" ||
    product.category === "الشيلات سادة";
  const pairs = isShayla ? Math.floor(qty / 2) : 0;
  const pairDiscount = pairs * 1;
  const subtotal = unit * qty;
  return Math.max(0, subtotal - pairDiscount);
};

const setSelectedItems = (state) =>
  state.products.reduce((total, product) => total + Number(product.quantity || 0), 0);

const setTotalPrice = (state) =>
  state.products.reduce((total, product) => total + lineTotalBase(product), 0);

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload || {};
      const _id = payload._id || payload.productId;
      const qtyToAdd = Math.max(1, Number(payload.quantity || 1));
      const lineKey = makeLineKey({ ...payload, _id });

      // تحديد المخزون المتاح
      const availableStock = Number(
        payload.stock ??
          // إذا كانت موجودة سابقاً أي نسخة من نفس المنتج، استخدم مخزونها (إن وُجد)
          state.products.find((p) => (p._id || p.productId) === _id)?.stock
      );
      const stockLimit = Number.isFinite(availableStock) ? Math.max(0, availableStock) : Infinity;

      // مجموع الكميات الحالية لكل الأسطر لنفس المنتج (حتى مع اختلاف القياسات/الهدايا)
      const currentSumForProduct = state.products
        .filter((p) => (p._id || p.productId) === _id)
        .reduce((s, p) => s + Number(p.quantity || 0), 0);

      const existingIndex = state.products.findIndex((p) => makeLineKey(p) === lineKey);

      if (existingIndex >= 0) {
        const existing = state.products[existingIndex];
        // الكمية المتاحة للإضافة لهذا السطر مع احتساب بقية الأسطر
        const otherLinesQty = currentSumForProduct - Number(existing.quantity || 0);
        const allowedForThisLine = Number.isFinite(stockLimit)
          ? Math.max(0, stockLimit - otherLinesQty)
          : Infinity;

        existing.quantity = Math.min(existing.quantity + qtyToAdd, allowedForThisLine);
      } else {
        const allowedToAdd = Number.isFinite(stockLimit)
          ? Math.max(0, stockLimit - currentSumForProduct)
          : qtyToAdd;

        const addQty = Math.min(qtyToAdd, allowedToAdd);

        // لا تقم بإضافة سطر بكمية 0
        if (addQty > 0) {
          state.products.push({
            ...payload,
            _id,
            stock: Number.isFinite(availableStock) ? stockLimit : payload.stock, // حافظ على stock إن وُجد
            quantity: addQty,
          });
        }
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      saveState(state);
    },

    updateQuantity: (state, action) => {
      const { id, type, lineKey } = action.payload || {};
      const idx = state.products.findIndex((p) => {
        if (lineKey) return makeLineKey(p) === lineKey;
        return p._id === id;
      });
      if (idx === -1) return;

      const product = state.products[idx];
      const productId = product._id || product.productId;
      const stock = Number(product.stock);

      // مجموع كل الأسطر لنفس المنتج
      const currentSumForProduct = state.products
        .filter((p) => (p._id || p.productId) === productId)
        .reduce((s, p) => s + Number(p.quantity || 0), 0);

      if (type === "increment") {
        if (Number.isFinite(stock)) {
          // لا تتجاوز إجمالي المخزون عبر كل الأسطر
          if (currentSumForProduct >= stock) {
            // لا تغيير
          } else {
            const otherLinesQty = currentSumForProduct - Number(product.quantity || 0);
            const allowedForThisLine = Math.max(0, stock - otherLinesQty);
            product.quantity = Math.min(product.quantity + 1, allowedForThisLine);
          }
        } else {
          product.quantity = product.quantity + 1;
        }
      } else if (type === "decrement") {
        product.quantity = Math.max(1, product.quantity - 1);
      } else if (typeof action.payload.quantity !== "undefined") {
        const q = Math.max(1, Number(action.payload.quantity || 1));
        if (Number.isFinite(stock)) {
          const otherLinesQty = currentSumForProduct - Number(product.quantity || 0);
          const maxAllowed = Math.max(0, stock - otherLinesQty);
          product.quantity = Math.min(q, maxAllowed);
        } else {
          product.quantity = q;
        }
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      saveState(state);
    },

    removeFromCart: (state, action) => {
      let id, lineKey;
      if (typeof action.payload === "string") {
        id = action.payload;
      } else {
        id = action.payload?.id;
        lineKey = action.payload?.lineKey;
      }

      state.products = state.products.filter((p) => {
        if (lineKey) return makeLineKey(p) !== lineKey;
        if (id) return p._id !== id;
        return true;
      });

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      saveState(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.giftCard = null;
      saveState(state);
    },

    setCountry: (state, action) => {
      state.country = action.payload;
      if (action.payload === "الإمارات") state.shippingFee = 4;
      else if (action.payload === "دول الخليج") state.shippingFee = 5;
      else state.shippingFee = 2;
      saveState(state);
    },

    loadCart: (state, action) => {
      const merged = { ...DEFAULTS, ...(action.payload || {}) };
      saveState(merged);
      return merged;
    },

    setGiftCard: (state, action) => {
      const { from = "", to = "", phone = "", note = "" } = action.payload || {};
      const allEmpty = [from, to, phone, note].every((v) => !String(v || "").trim());
      state.giftCard = allEmpty ? null : { from, to, phone, note };
      saveState(state);
    },

    clearGiftCard: (state) => {
      state.giftCard = null;
      saveState(state);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCountry,
  loadCart,
  setGiftCard,
  clearGiftCard,
} = cartSlice.actions;

export default cartSlice.reducer;
