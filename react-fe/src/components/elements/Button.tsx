import { cn } from "../../utils/lib/utils";
interface ButtonProps {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}
const Button = ({ className, onClick, type, children }: ButtonProps) => {
  return (
    <button
      className={cn("bg-yellow-600 border-2 border-gray-700 p-2 rounded-md font-bold transition transform duration-300 ease-in-out hover:text-yellow-600 hover:bg-gray-700", className)}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
