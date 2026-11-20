const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

// size: Tailwind classes for width/height/text, e.g. "h-10 w-10 text-sm"
const MemberAvatar = ({ member, size = "h-10 w-10 text-sm" }) =>
  member.photo ? (
    <img src={member.photo} alt={member.name} className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#FF542E] font-bold text-white`}
    >
      {initials(member.name)}
    </div>
  );

export default MemberAvatar;
