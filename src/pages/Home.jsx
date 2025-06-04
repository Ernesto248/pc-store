import { useState, useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { useCart } from "../contexts/CartContext";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { notification, hideNotification } = useCart();

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Ordenar por precio
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={setSearchTerm}
        onCategoryFilter={setSelectedCategory}
        onPriceSort={setSortOrder}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
      />
      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información de filtros activos */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>Mostrando {filteredProducts.length} productos</span>
            {searchTerm && <span>• Búsqueda: "{searchTerm}"</span>}
            {selectedCategory && <span>• Categoría: {selectedCategory}</span>}
            {sortOrder && (
              <span>
                • Precio:{" "}
                {sortOrder === "asc" ? "Menor a Mayor" : "Mayor a Menor"}
              </span>
            )}
          </div>
        </div>

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <ShoppingCart size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
          </div>
        )}
      </main>{" "}
      {/* Toast de notificaciones */}
      <Toast
        message={notification.message}
        isVisible={notification.visible}
        onClose={hideNotification}
      />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
