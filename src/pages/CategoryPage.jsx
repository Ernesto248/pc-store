import { useState, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import { products, categories } from "../data/products";
import { useCart } from "../contexts/CartContext";

const CategoryPage = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { notification, hideNotification } = useCart();

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => product.category === category);

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar por precio
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, searchTerm, sortOrder]);

  // Verificar si la categoría existe
  if (!categories.includes(category)) {
    return <Navigate to="/" replace />;
  }

  const getCategoryDisplayName = (cat) => {
    const displayNames = {
      CPU: "Procesadores",
      GPU: "Tarjetas Gráficas",
      RAM: "Memoria RAM",
      Almacenamiento: "Almacenamiento",
      Motherboard: "Placas Madre",
      PSU: "Fuentes de Poder",
    };
    return displayNames[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={setSearchTerm}
        onCategoryFilter={() => {}} // No usar filtro de categoría en esta página
        onPriceSort={setSortOrder}
        selectedCategory=""
        sortOrder={sortOrder}
      />
      {/* Breadcrumb y título */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getCategoryDisplayName(category)}
          </h1>
          <p className="text-gray-600">
            Explora nuestra selección de{" "}
            {getCategoryDisplayName(category).toLowerCase()}
          </p>
        </div>

        {/* Información de resultados */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>Mostrando {filteredProducts.length} productos</span>
            {searchTerm && <span>• Búsqueda: "{searchTerm}"</span>}
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
              {searchTerm
                ? "Intenta ajustar tu búsqueda"
                : `No hay productos disponibles en la categoría ${getCategoryDisplayName(
                    category
                  )}`}
            </p>
          </div>
        )}
      </div>{" "}
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

export default CategoryPage;
