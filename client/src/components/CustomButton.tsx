import { getContrastingColor } from "../config/helpers";
import { useGlobalStore } from "../store";

type ICustomButtonType = "filled" | "outline";
interface ICustomButtonProps {
  type: ICustomButtonType;
  title?: string;
  customStyles?: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const CustomButton = ({
  type,
  title,
  customStyles,
  handleClick,
}: ICustomButtonProps) => {
  const color = useGlobalStore((s) => s.color);

  const generateStyle = (type: ICustomButtonType) => {
    if (type === "filled") {
      return {
        backgroundColor: color,
        color: getContrastingColor(color),
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: color,
        color: color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
