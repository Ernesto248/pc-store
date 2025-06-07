import { X, Plus, Minus, Trash2, ShoppingBag, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import CartStats from "./CartStats";

const Cart = ({ isOpen, onClose }) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();
  const { isAuthenticated } = useAuth();

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Por favor inicia sesión para continuar con la compra");
      return;
    }
    onClose(); // Cerrar el modal del carrito
    navigate("/checkout"); // Navegar al checkout
  };

  if (!isOpen) return null;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-2xl font-bold flex items-center space-x-2">
            <ShoppingBag size={20} className="sm:hidden" />
            <ShoppingBag size={24} className="hidden sm:block" />
            <span className="hidden sm:inline">Carrito de Compras</span>
            <span className="sm:hidden">Carrito</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={20} className="sm:hidden" />
            <X size={24} className="hidden sm:block" />
          </button>
        </div>{" "}
        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <ShoppingBag
                size={48}
                className="mx-auto text-gray-300 mb-4 sm:hidden"
              />
              <ShoppingBag
                size={64}
                className="mx-auto text-gray-300 mb-4 hidden sm:block"
              />
              <p className="text-gray-500 text-base sm:text-lg">
                Tu carrito está vacío
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Agrega algunos productos para comenzar
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {/* Estadísticas del carrito */}
              <CartStats />

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 p-3 sm:p-4 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {item.category}
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-green-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus size={14} className="sm:hidden" />
                        <Minus size={16} className="hidden sm:block" />
                      </button>
                      <span className="px-2 sm:px-3 py-1 bg-white border rounded text-center min-w-[2.5rem] sm:min-w-[3rem] text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus size={14} className="sm:hidden" />
                        <Plus size={16} className="hidden sm:block" />
                      </button>
                    </div>

                    <div className="text-center sm:text-right">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                        title="Eliminar del carrito"
                      >
                        <Trash2 size={14} className="sm:hidden" />
                        <Trash2 size={16} className="hidden sm:block" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>{" "}
        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 sm:p-6 space-y-4">
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
              <span>Total:</span>
              <span className="text-green-600">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {showClearConfirm ? (
                <div className="flex-1 bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertCircle
                      size={18}
                      className="text-yellow-600 sm:hidden"
                    />
                    <AlertCircle
                      size={20}
                      className="text-yellow-600 hidden sm:block"
                    />
                    <span className="text-xs sm:text-sm font-medium text-yellow-800">
                      ¿Estás seguro de vaciar el carrito?
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleClearCart}
                      className="flex-1 bg-red-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm"
                    >
                      Sí, vaciar
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 rounded-lg hover:bg-gray-300 transition-colors text-xs sm:text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Proceder al Pago
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
