import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MemberRow from "./MemberRow";

const headers = ["Member", "Phone", "Plan", "Status", "Joined", "Expires", "Actions"];

const pageButton =
  "flex h-9 min-w-9 items-center justify-center rounded-md border border-(--gym-line) px-2 text-sm disabled:opacity-40";

const MembersTable = ({ members, page: requestedPage, pageSize, onPageChange, onAction, emptyMessage }) => {
  if (members.length === 0) {
    return (
      <div className="rounded-md border border-(--gym-line) bg-(--gym-card) p-12 text-center text-(--gym-subtext)">
        {emptyMessage}
      </div>
    );
  }

  const pages = Math.ceil(members.length / pageSize);
  const page = Math.min(requestedPage, pages); // list can shrink after an action
  const first = (page - 1) * pageSize;
  const visible = members.slice(first, first + pageSize);

  return (
    <div className="rounded-md border border-(--gym-line) bg-(--gym-card)">
      {/* w-0 min-w-full: scroll inside the card instead of widening the admin <main> on small screens */}
      <div className="w-0 min-w-full overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-(--gym-label)">
            <tr className="border-b border-(--gym-line)">
              {headers.map((h) => (
                <th key={h} className="p-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((member) => (
              <MemberRow key={member.id} member={member} onAction={onAction} />
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Pagination" className="flex flex-col items-center justify-between gap-3 p-4 text-sm sm:flex-row">
        <span className="text-(--gym-subtext)">
          Showing {first + 1}–{first + visible.length} of {members.length}
        </span>
        <div className="flex gap-1">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="Previous page" className={pageButton}>
            <FiChevronLeft />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => onPageChange(n)}
              aria-current={n === page ? "page" : undefined}
              className={`${pageButton} ${n === page ? "border-[#FF542E] bg-[#FF542E] text-white" : "hover:bg-(--gym-surface)"}`}
            >
              {n}
            </button>
          ))}
          <button onClick={() => onPageChange(page + 1)} disabled={page === pages} aria-label="Next page" className={pageButton}>
            <FiChevronRight />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MembersTable;
