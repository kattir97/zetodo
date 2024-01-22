function AuthButton({ text, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="px-2 py-1 sm:px-2  md:px-2 md:py-2 lg:px-4 lg:py-2 border flex gap-2  border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-500 hover:shadow transition duration-150 bg-white z-50"
    >
      <span className="text-sm  md:text-base lg:text-lg">{text}</span>
    </button>
  );
}

export default AuthButton;
