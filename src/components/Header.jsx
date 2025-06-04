import {
  ShoppingCart,
  User,
  LogOut,
  Search,
  Filter,
  X,
  Home,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import AuthModal from "./AuthModal";
import Cart from "./Cart";

const Header = ({
  onSearch,
  onCategoryFilter,
  onPriceSort,
  selectedCategory,
  sortOrder,
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();

  const categories = [
    "CPU",
    "GPU",
    "RAM",
    "Almacenamiento",
    "Motherboard",
    "PSU",
  ];
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (order) => {
    onPriceSort(order === sortOrder ? "" : order);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {" "}
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700"
              >
                PC Store
              </Link>
            </div>
            {/* Navegación */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Home size={16} />
                <span>Inicio</span>
              </Link>
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/profile"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <User size={16} />
                  <span>Perfil</span>
                </Link>
              )}
            </nav>
            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            {/* Controles de la derecha */}
            <div className="flex items-center space-x-4">
              {/* Botón de filtros */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                <span>Filtros</span>
              </button>{" "}
              {/* Carrito */}
              <div className="relative">
                <button
                  onClick={() => setCartOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCart size={24} />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
              {/* Usuario */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Hola, {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-600 hover:text-gray-900"
                    title="Cerrar sesión"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <User size={20} />
                  <span>Ingresar</span>
                </button>
              )}
            </div>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="border-t border-gray-200 py-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Categorías */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Categoría:
                  </span>{" "}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/category/${category}`}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedCategory === category
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </Link>
                    ))}
                    {selectedCategory && (
                      <button
                        onClick={() => onCategoryFilter("")}
                        className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Ordenar por precio */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Precio:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSortChange("asc")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        sortOrder === "asc"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Menor a Mayor
                    </button>
                    <button
                      onClick={() => handleSortChange("desc")}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        sortOrder === "desc"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Mayor a Menor
                    </button>
                    {sortOrder && (
                      <button
                        onClick={() => onPriceSort("")}
                        className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() =>
          setAuthMode(authMode === "login" ? "register" : "login")
        }
      />

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
