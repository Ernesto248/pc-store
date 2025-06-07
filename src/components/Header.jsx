import {
  ShoppingCart,
  User,
  LogOut,
  Search,
  Filter,
  X,
  Home,
  Menu,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {/* Header principal */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700"
              >
                PC Store
              </Link>
            </div>

            {/* Barra de búsqueda - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
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
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Botón de filtros - Desktop */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="hidden md:flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                <span className="hidden lg:inline">Filtros</span>
              </button>
              {/* Carrito */}{" "}
              <div className="relative">
                <button
                  onClick={() => setCartOpen(true)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCart size={20} className="sm:hidden" />
                  <ShoppingCart size={24} className="hidden sm:block" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
              {/* Usuario - Desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm text-gray-700 hidden lg:inline">
                    Hola, {user?.name}
                  </span>
                  <Link
                    to="/profile"
                    className={`p-2 rounded-lg transition-colors ${
                      location.pathname === "/profile"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    title="Perfil"
                  >
                    <User size={20} />
                  </Link>
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
                  className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <User size={20} />
                  <span className="hidden lg:inline">Ingresar</span>
                </button>
              )}
              {/* Menú móvil */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Barra de búsqueda móvil */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
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

          {/* Menú móvil desplegable */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                {/* Navegación móvil */}
                <div className="space-y-2">
                  <Link
                    to="/"
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === "/"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Home size={16} />
                    <span>Inicio</span>
                  </Link>
                  {isAuthenticated && (
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === "/profile"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>Perfil</span>
                    </Link>
                  )}
                </div>

                {/* Botón de filtros móvil */}
                <button
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter size={20} />
                  <span>Filtros y Categorías</span>
                </button>

                {/* Auth móvil */}
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <User size={20} />
                    <span>Iniciar Sesión</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Panel de filtros */}
          {showFilters && (
            <div className="border-t border-gray-200 py-4">
              <div className="space-y-4">
                {/* Categorías */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Categorías:
                  </span>
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
                        onClick={() => setShowFilters(false)}
                      >
                        {category}
                      </Link>
                    ))}
                    {selectedCategory && (
                      <button
                        onClick={() => {
                          onCategoryFilter("");
                          setShowFilters(false);
                        }}
                        className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Ordenar por precio */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Ordenar por precio:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        handleSortChange("asc");
                        setShowFilters(false);
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        sortOrder === "asc"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Menor a Mayor
                    </button>
                    <button
                      onClick={() => {
                        handleSortChange("desc");
                        setShowFilters(false);
                      }}
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
                        onClick={() => {
                          onPriceSort("");
                          setShowFilters(false);
                        }}
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
