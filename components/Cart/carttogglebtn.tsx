interface CartToggleProps {
onCartToggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => void;
}

export default function CartToggleBtn ({onCartToggle} : CartToggleProps){
    return (
      <button
        onClick={onCartToggle}
        className="btn btn-square btn-ghost inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none hover:bg-hover rounded text-base mt-4 md:mt-0"
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
    );
}