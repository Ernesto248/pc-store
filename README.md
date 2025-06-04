# PC Store - Tienda Virtual de Componentes de Computadoras

Una aplicación web moderna para la venta de piezas y componentes de computadoras, desarrollada con React, Vite y Tailwind CSS.

## 🚀 Características Principales

### Autenticación de Usuario

- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión
- ✅ Validación de formularios
- ✅ Persistencia de sesión en localStorage
- ✅ Gestión de estados de autenticación

### Carrito de Compras

- ✅ Añadir productos al carrito
- ✅ Eliminar productos del carrito
- ✅ Modificar cantidades
- ✅ Persistencia del carrito (mantiene estado tras recargar)
- ✅ Cálculo automático de totales
- ✅ Interfaz intuitiva con modal

### Búsqueda y Filtros

- ✅ Barra de búsqueda en tiempo real
- ✅ Filtros por categoría de componente:
  - CPU (Procesadores)
  - GPU (Tarjetas Gráficas)
  - RAM (Memoria)
  - Almacenamiento (SSD/HDD)
  - Motherboard (Placas Madre)
  - PSU (Fuentes de Poder)
- ✅ Ordenamiento por precio (ascendente/descendente)
- ✅ Filtros combinables

### Gestión de Estados y Contextos

- ✅ Context API para autenticación (`AuthContext`)
- ✅ Context API para carrito de compras (`CartContext`)
- ✅ Estados locales para modales y UI
- ✅ Persistencia en localStorage

### Enrutado

- ✅ React Router DOM
- ✅ Página principal (catálogo de productos)
- ✅ Página de perfil de usuario
- ✅ Páginas por categoría específica
- ✅ Página de checkout completa
- ✅ Navegación responsive

### Modales y UX

- ✅ Modal de autenticación (login/registro)
- ✅ Modal de detalle de producto
- ✅ Modal de carrito de compras
- ✅ Notificaciones toast
- ✅ Confirmaciones de acciones
- ✅ Estados de carga
- ✅ Interfaz responsive y moderna

### Checkout y Pago

- ✅ Página de checkout completa
- ✅ Formulario de información de envío
- ✅ Formulario de información de pago
- ✅ Validación de formularios
- ✅ Resumen del pedido
- ✅ Procesamiento simulado de pago
- ✅ Confirmación de pedido
- ✅ Integración con autenticación

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutado
- **Tailwind CSS** - Estilos y diseño
- **Lucide React** - Iconos
- **Context API** - Gestión de estado global
- **localStorage** - Persistencia de datos

## 📦 Instalación y Configuración

1. **Clonar el repositorio**

   ```bash
   git clone [url-del-repositorio]
   cd pc-store
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   pnpm dev
   # o
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Técnicos Cumplidos

1. **Manejo de Estados**: Implementado con Context API y useState hooks
2. **Uso de Enrutado**: React Router DOM con múltiples rutas
3. **Implementación de Contextos**: AuthContext y CartContext
4. **Uso de Modales**: Modales para auth, producto y carrito
5. **Persistencia**: localStorage para carrito y autenticación

### 🏪 Catálogo de Productos

La aplicación incluye un catálogo completo con:

- 16 productos de ejemplo
- 6 categorías diferentes
- Imágenes, precios y especificaciones detalladas
- Control de stock

### 🔐 Sistema de Autenticación

- Registro con validación de email único
- Login con credenciales
- Persistencia de sesión
- Logout seguro
- Página de perfil de usuario

### 🛒 Carrito de Compras Avanzado

- Agregar productos con cantidad personalizable
- Modificar cantidades desde el carrito
- Eliminar productos individuales
- Vaciar carrito completo
- Cálculos automáticos de totales
- Persistencia tras recargar página

## 📱 Diseño Responsive

La aplicación está optimizada para:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Interfaz de Usuario

- Diseño moderno con Tailwind CSS
- Tema consistente en azul y gris
- Iconos de Lucide React
- Animaciones suaves
- Feedback visual para acciones del usuario

## 🔄 Estados y Persistencia

### AuthContext

- Estado de autenticación
- Información del usuario
- Funciones de login/logout/register

### CartContext

- Items del carrito
- Cantidades y totales
- Funciones CRUD del carrito

### localStorage

- Persistencia del carrito
- Persistencia de sesión de usuario
- Almacén de usuarios registrados

## 🚀 Próximas Mejoras

- [ ] Integración con API backend
- [ ] Historial de pedidos
- [ ] Wishlist/Lista de deseos
- [ ] Reviews y calificaciones
- [ ] Comparador de productos
- [ ] Notificaciones push
- [ ] Panel de administración
- [ ] Tests unitarios y de integración
- [ ] Optimización de performance

## 📄 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── AuthModal.jsx   # Modal de autenticación
│   ├── Cart.jsx        # Modal del carrito
│   ├── CartStats.jsx   # Estadísticas del carrito
│   ├── Footer.jsx      # Footer de la aplicación
│   ├── Header.jsx      # Header con navegación
│   ├── LoadingSpinner.jsx # Componente de carga
│   ├── ProductCard.jsx # Tarjeta de producto
│   ├── ProductModal.jsx # Modal de detalle de producto
│   └── Toast.jsx       # Notificaciones toast
├── contexts/           # Contextos de React
│   ├── AuthContext.jsx # Contexto de autenticación
│   └── CartContext.jsx # Contexto del carrito
├── data/              # Datos de la aplicación
│   └── products.js    # Catálogo de productos
├── pages/             # Páginas principales
│   ├── CategoryPage.jsx # Páginas por categoría
│   ├── Checkout.jsx   # Página de checkout
│   ├── Home.jsx       # Página principal
│   └── Profile.jsx    # Página de perfil
├── App.jsx            # Componente principal
└── main.jsx          # Punto de entrada
```

---

**Desarrollado con ❤️ usando React y Tailwind CSS**

## 🎉 Estado del Proyecto

El proyecto está **funcionalmente completo** con todas las características principales implementadas:

✅ **Autenticación completa** - Registro, login, persistencia  
✅ **Carrito funcional** - CRUD completo con persistencia  
✅ **Búsqueda y filtros** - En tiempo real con múltiples criterios  
✅ **Checkout completo** - Proceso de pago simulado  
✅ **Interfaz moderna** - Responsive, modales, notificaciones  
✅ **Enrutado dinámico** - Navegación completa entre páginas  
✅ **Estados globales** - Context API implementado

**URL de desarrollo**: `http://localhost:5174`

---

_Proyecto desarrollado como aplicación de demostración de e-commerce moderno con React_
