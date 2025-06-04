import { TrendingUp, Package, DollarSign, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const CartStats = () => {
  const { cartItems, getTotalItems, getTotalPrice } = useCart();

  const getUniqueProducts = () => {
    return cartItems.length;
  };

  const getAveragePrice = () => {
    if (cartItems.length === 0) return 0;
    return getTotalPrice() / getTotalItems();
  };

  const stats = [
    {
      label: "Productos únicos",
      value: getUniqueProducts(),
      icon: Package,
      color: "bg-blue-500",
    },
    {
      label: "Total de artículos",
      value: getTotalItems(),
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      label: "Precio promedio",
      value: `$${getAveragePrice().toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      label: "Total",
      value: `$${getTotalPrice().toFixed(2)}`,
      icon: DollarSign,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">{stat.label}</p>
              <p className="text-sm font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartStats;
