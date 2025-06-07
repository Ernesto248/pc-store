import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import ProductModal from "./ProductModal";

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };
  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
        onClick={() => setShowModal(true)}
      >
        <div className="relative bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 sm:h-48 md:h-52 object-cover"
          />
          <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>

          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">
                Stock: {product.stock}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center space-x-1 sm:space-x-2 bg-blue-600 text-white px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
            >
              <ShoppingCart size={14} className="sm:hidden" />
              <ShoppingCart size={16} className="hidden sm:block" />
              <span className="hidden sm:inline">Agregar</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ProductCard;
