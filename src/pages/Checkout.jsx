import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, ShoppingBag, CreditCard } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Redireccionar si no está autenticado o no hay productos en el carrito
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }
  if (cartItems.length === 0 && !orderComplete) {
    navigate("/");
    return null;
  }

  const handlePayment = () => {
    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onSearch={() => {}}
          onCategoryFilter={() => {}}
          onPriceSort={() => {}}
          selectedCategory=""
          sortOrder=""
        />{" "}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center">
          <CheckCircle
            size={48}
            className="mx-auto text-green-500 mb-6 sm:hidden"
          />
          <CheckCircle
            size={64}
            className="mx-auto text-green-500 mb-6 hidden sm:block"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            ¡Pedido Confirmado!
          </h1>{" "}
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Tu pedido ha sido procesado exitosamente. Recibirás un email de
            confirmación pronto.
          </p>
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Seguir Comprando
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Ver Perfil
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  // Página principal de checkout simplificada
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={() => {}}
        onCategoryFilter={() => {}}
        onPriceSort={() => {}}
        selectedCategory=""
        sortOrder=""
      />{" "}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header del checkout */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-2 sm:hidden" />
            <ArrowLeft size={20} className="mr-2 hidden sm:block" />
            Volver a la tienda
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Finalizar Compra
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Resumen del pedido - Sección principal */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <ShoppingBag size={24} className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Resumen del Pedido</h2>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-4 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="text-gray-500 text-sm">
                        ${item.price.toFixed(2)} c/u
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <div className="text-center py-8">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No hay productos en el carrito</p>
              </div>
            )}
          </div>

          {/* Panel de pago */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <div className="flex items-center mb-4">
              <CreditCard size={24} className="text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Total del Pedido</h2>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío:</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Impuestos (10%):</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${(getTotalPrice() * 1.1).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Información de pago mock */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Método de Pago</h3>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard size={16} className="mr-2" />
                <span>Tarjeta terminada en ****1234</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Procesando pago...
                </>
              ) : (
                `Pagar ${(getTotalPrice() * 1.1).toFixed(2)} USD`
              )}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Este es un pago simulado. No se realizará ningún cargo real.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
