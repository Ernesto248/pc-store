import { Github, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-8 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">
              PC Store
            </h3>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Tu tienda de confianza para componentes de computadoras. Ofrecemos
              los mejores productos con la más alta calidad y precios
              competitivos.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} className="sm:hidden" />
                <Github size={20} className="hidden sm:block" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} className="sm:hidden" />
                <Mail size={20} className="hidden sm:block" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/category/CPU"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Procesadores
                </Link>
              </li>
              <li>
                <Link
                  to="/category/GPU"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Tarjetas Gráficas
                </Link>
              </li>
              <li>
                <Link
                  to="/category/RAM"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  Memoria RAM
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base">
                <Phone size={14} className="sm:hidden" />
                <Phone size={16} className="hidden sm:block" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base">
                <Mail size={14} className="sm:hidden" />
                <Mail size={16} className="hidden sm:block" />
                <span>info@pcstore.com</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-300 text-sm sm:text-base">
                <MapPin size={14} className="mt-0.5 sm:hidden" />
                <MapPin size={16} className="mt-0.5 hidden sm:block" />
                <span>123 Tech Street, Ciudad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 PC Store. Todos los derechos reservados. Desarrollado con
            React y Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
