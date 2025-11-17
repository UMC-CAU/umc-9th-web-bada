interface Props {
  onClick: () => void;
  label?: string;
}

const FloatingButton = ({ onClick, label = "플로팅 버튼" }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="
        fixed right-6 bottom-16 z-50
    w-14 h-14 rounded-full shadow-lg
    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    text-white text-xl
    transition duration-150 transform hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
  "
    >
      <span aria-hidden>＋</span>
    </button>
  );
};

export default FloatingButton;
