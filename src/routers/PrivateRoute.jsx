import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role, customCheck }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // غير مسجّل دخول: لا يزال التحويل للّوجين منطقياً
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // الدور غير مطابق: لا تحويل ولا تسجيل خروج — فقط لا تعرض المحتوى
  if (role && user.role !== role) {
    return null;
  }

  // فشل شرط مخصص (مثل السماح فقط لـ Mohammed بالوصول لمسار معيّن): لا تعرض المحتوى
  if (customCheck && !customCheck(user)) {
    return null;
  }

  return children;
};

export default PrivateRoute;
