const EditButton = () => {
  return (
    <button
      type="button"
      className="rounded-lg border border-(--gym-line) bg-(--gym-card) px-5 py-2.5 font-[Barlow] text-sm font-semibold text-(--gym-text) transition-all duration-200 hover:border-orange hover:text-orange active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
    >
      Edit
    </button>
  );
};

export default EditButton;
