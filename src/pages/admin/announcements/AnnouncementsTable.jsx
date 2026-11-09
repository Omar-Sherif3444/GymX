
const headers = ["Title", "Audience", "Author", "Publish date", "Expiry", "Status"];

const AnnouncementsTable = ({ announcements }) => {
  if (announcements.length === 0) {
    return (
      <div className="rounded-md border border-(--gym-line) bg-(--gym-card) p-12 text-center text-(--gym-subtext)">
        No announcements yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-(--gym-line) bg-(--gym-card)">
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-(--gym-label)">
          <tr className="border-b border-(--gym-line)">
            {headers.map((h) => (
              <th key={h} className="p-4">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {announcements.map((a) => (
            <tr key={a.id} className="border-b border-(--gym-line) hover:bg-(--gym-surface)">
              <td className="p-4 font-semibold">{a.title}</td>
              <td className="p-4">{a.audience}</td>
              <td className="p-4 text-(--gym-subtext)">{a.author}</td>
              <td className="p-4 text-(--gym-subtext)">{a.publishDate}</td>
              <td className="p-4 text-(--gym-subtext)">{a.expiry}</td>
              <td className="p-4">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementsTable;
