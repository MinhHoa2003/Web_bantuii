import Cookies from 'js-cookie';

// Hàm để lưu giỏ hàng vào cookie
export const saveCartToCookie = (cart) => {
  Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Lưu giỏ hàng vào cookie trong 7 ngày
};

// Hàm để lấy giỏ hàng từ cookie
export const getCartFromCookie = () => {
  const cookieCart = Cookies.get('cart');
  return cookieCart ? JSON.parse(cookieCart) : [];
};