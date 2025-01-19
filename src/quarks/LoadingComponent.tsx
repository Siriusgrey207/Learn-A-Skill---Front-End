import Loading from "react-loading-components";

type LoadingComponentTypes = {
  color?: string;
  size: "small" | "medium" | "large";
};

export default function LoadingComponent(props: LoadingComponentTypes) {
  const { color = "#2D6E46", size = "medium" } = props;

  let widthAndHeight = 50;

  if (size === "small") {
    widthAndHeight = 25;
  } else if (size === "large") {
    widthAndHeight = 75;
  }

  return (
    <div className="loading-container">
      <Loading
        type="tail_spin"
        width={widthAndHeight}
        height={widthAndHeight}
        fill={color}
      />
    </div>
  );
}
