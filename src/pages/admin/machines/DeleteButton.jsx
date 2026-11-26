const DeleteButton = () => {
  return (
    <button
      type="button"
      className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 font-[Barlow] text-sm font-semibold text-red-500 transition-all duration-200 hover:bg-red-500 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
