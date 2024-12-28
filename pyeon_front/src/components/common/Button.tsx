interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "secondary",
  size = "md",
  isActive = false,
  className = "",
  ...props
}) => {
  const baseStyles = "rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-[#25262b] text-gray-300 hover:bg-[#2c2d32]",
    outline: "border border-[#2c2d32] text-gray-300 hover:bg-[#2c2d32]",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isActive ? "bg-blue-500 text-white" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
