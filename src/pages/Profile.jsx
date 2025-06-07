import { useState } from "react";
import { User, Edit, Save, X, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          onSearch={() => {}}
          onCategoryFilter={() => {}}
          onPriceSort={() => {}}
          selectedCategory=""
          sortOrder=""
        />{" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-center">
          <User size={48} className="mx-auto text-gray-300 mb-4 sm:hidden" />
          <User
            size={64}
            className="mx-auto text-gray-300 mb-4 hidden sm:block"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mb-2">
            Acceso requerido
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Debes iniciar sesión para ver tu perfil
          </p>
        </div>
        <Footer />
      </div>
    );
  }
  const handleSave = async () => {
    // Validaciones
    if (!editData.name.trim()) {
      setMessage({ type: "error", text: "El nombre es requerido" });
      return;
    }

    if (!editData.email.trim()) {
      setMessage({ type: "error", text: "El email es requerido" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editData.email)) {
      setMessage({ type: "error", text: "El formato del email no es válido" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = updateProfile({
        name: editData.name.trim(),
        email: editData.email.trim(),
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: "Perfil actualizado correctamente",
        });
        setIsEditing(false);
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Error al actualizar el perfil",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: "Error inesperado al actualizar el perfil",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={() => {}}
        onCategoryFilter={() => {}}
        onPriceSort={() => {}}
        selectedCategory=""
        sortOrder=""
      />{" "}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                <User size={24} className="mr-3 sm:hidden" />
                <User size={28} className="mr-3 hidden sm:block" />
                Mi Perfil
              </h1>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
                >
                  <Edit size={16} />
                  <span>Editar</span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <Save size={16} />
                    <span>{isLoading ? "Guardando..." : "Guardar"}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <X size={16} />
                    <span>Cancelar</span>
                  </button>
                </div>
              )}
            </div>
          </div>{" "}
          {/* Message Display */}
          {message.text && (
            <div
              className={`mx-4 sm:mx-6 mt-4 p-3 sm:p-4 rounded-lg flex items-center space-x-2 text-sm sm:text-base ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle size={18} className="sm:hidden" />
              ) : (
                <AlertCircle size={18} className="sm:hidden" />
              )}
              {message.type === "success" ? (
                <CheckCircle size={20} className="hidden sm:block" />
              ) : (
                <AlertCircle size={20} className="hidden sm:block" />
              )}
              <span>{message.text}</span>
            </div>
          )}
          <div className="p-4 sm:p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ingresa tu nombre completo"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                    {user.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="ejemplo@correo.com"
                  />
                ) : (
                  <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                    {user.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de registro
                </label>
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("es-ES")
                    : "No disponible"}
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
