import { Github, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">PC Store</h3>
            <p className="text-gray-300 mb-4">
              Tu tienda de confianza para componentes de computadoras. Ofrecemos
              los mejores productos con la más alta calidad y precios
              competitivos.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/category/CPU"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Procesadores
                </Link>
              </li>
              <li>
                <Link
                  to="/category/GPU"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Tarjetas Gráficas
                </Link>
              </li>
              <li>
                <Link
                  to="/category/RAM"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Memoria RAM
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@pcstore.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} />
                <span>123 Tech Street, Ciudad</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 PC Store. Todos los derechos reservados. Desarrollado con
            React y Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
