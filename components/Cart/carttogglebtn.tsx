import { useAppContext } from "../../context/AppContext";
import { getUserCart } from "../../utils/helpers";

interface CartToggleProps {
onCartToggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
}

export default function CartToggleBtn ({onCartToggle} : CartToggleProps){
  const cartContext = useAppContext();
  const cartID = cartContext?.id;

  const { data, isError } = getUserCart(cartID);

  if (isError) {
    console.log("Couldn't load cart");
    return (
      <div className="text-2xl text-center text-error">
        Oops, we couldn't load the cart
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="indicator">
      {data.lines.edges.length > 0 ? (
        <span className="indicator-item badge badge-xs badge-secondary"></span>
      ) : null}
      <button
        onClick={onCartToggle}
        className="btn btn-ghost rounded-sm hover:bg-base-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </button>
    </div>
  );
}