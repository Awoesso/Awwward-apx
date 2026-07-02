const Button = ({ id, title, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={`px-4 py-2 flex gap-2 items-center rounded-full bg-yellow-300 group relative z-10 cursor-pointer overflow-hidden px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative overflow-hidden incline-flex text-xs uppercase font-general">
        {title}
      </span>
    </button>
  );
};

export default Button;
