import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "md", text = "Cargando..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
      <span className={`${textSizeClasses[size]} text-gray-600`}>{text}</span>
    </div>
  );
};

export default LoadingSpinner;
