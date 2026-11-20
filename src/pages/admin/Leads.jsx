import { useMemo, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FiChevronLeft, FiChevronRight, FiPlus, FiSliders } from "react-icons/fi";
import { useLeadsData } from "../../context/LeadsContext";
import { INTERESTS, OWNERS, SOURCES, STAGES } from "../../context/leadsData";
import Toast from "./members/Toast";

const PAGE_SIZE = 4;
const FILTERS = ["All", "Active", "Needs attention"];
const ACTIVE_STAGES = ["New", "Contacted", "Visit Scheduled"];

const stageTone = {
  New: "text-[#FF542E]",
  Contacted: "text-[#FF8A4C]",
  "Visit Scheduled": "text-amber-400",
  Converted: "text-green-500",
  Lost: "text-gray-400",
};

const stageBadge = {
  New: "bg-[#FF542E]/15 text-[#FF542E]",
  Contacted: "bg-orange/15 text-[#FF8A4C]",
  "Visit Scheduled": "bg-amber-500/15 text-amber-400",
  Converted: "bg-green-500/15 text-green-500",
  Lost: "bg-gray-500/15 text-gray-400",
};

const Leads = () => {
  const { leads, moveLead, addLead } = useLeadsData();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [source, setSource] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [dragging, setDragging] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [toast, setToast] = useState("");

  const q = search.trim().toLowerCase();
  const digits = q.replace(/\s/g, "");

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      const matchFilter =
        filter === "All" ||
        (filter === "Active" && ACTIVE_STAGES.includes(lead.stage)) ||
        (filter === "Needs attention" && lead.attention);
      const matchSource = source === "All" || lead.source === source;
      const matchText =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.owner.toLowerCase().includes(q) ||
        (digits && lead.phone.replace(/\s/g, "").includes(digits));
      return matchFilter && matchSource && matchText;
    });
  }, [leads, filter, source, q, digits]);

  const counts = Object.fromEntries(STAGES.map((s) => [s.id, leads.filter((l) => l.stage === s.id).length]));
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const exportCsv = () => {
    const header = "Name,Phone,Source,Interest,Stage,Follow-up,Owner";
    const rows = filtered.map((l) => [l.name, l.phone, l.source, l.interest, l.stage, l.followUp, l.owner].join(","));
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gymx-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="md:p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-[Barlow] text-xs font-bold uppercase tracking-[0.2em] text-(--gym-label)">Sales CRM</p>
          <h1 className="mt-1 font-[Anton] text-4xl uppercase sm:text-5xl">Leads</h1>
          <p className="mt-1 text-sm text-(--gym-subtext)">Track every inquiry from first contact to membership.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCsv}
            className="h-11 rounded-xl border border-(--gym-line) px-4 text-sm font-semibold hover:border-[#FF542E]"
          >
            Export CSV
          </button>
          <button
            onClick={() => setDialog(true)}
            className="flex h-11 items-center gap-2 rounded-xl bg-grad px-4 text-sm font-semibold text-white"
          >
            <FiPlus /> New lead
          </button>
        </div>
      </div>

      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {STAGES.map((stage) => (
          <PipelineColumn
            key={stage.id}
            stage={stage}
            count={counts[stage.id]}
            leads={leads.filter((l) => l.stage === stage.id)}
            dragging={dragging}
            onDragStart={setDragging}
            onDrop={(id) => {
              moveLead(id, stage.id);
              setDragging(null);
              setToast(`Moved to ${stage.label}`);
            }}
          />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-(--gym-line) bg-(--gym-card) p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-(--gym-subtext)" />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search leads…"
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) pl-12 pr-4 text-sm outline-none focus:border-[#FF542E]"
            />
          </div>
          <div className="flex w-0 min-w-full gap-2 overflow-x-auto pb-1 lg:w-auto lg:min-w-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
                  filter === f
                    ? "border-[#FF542E] bg-[#FF542E] text-white"
                    : "border-(--gym-line) text-(--gym-subtext) hover:text-(--gym-text)"
                }`}
              >
                {f}
              </button>
            ))}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-(--gym-line) px-4 py-2 text-sm font-semibold text-(--gym-subtext)"
            >
              <FiSliders /> Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-3">
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setPage(1);
              }}
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) px-4 text-sm sm:w-56"
            >
              <option>All</option>
              {SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 md:hidden">
          {visible.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>

        <div className="mt-4 hidden w-0 min-w-full overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-(--gym-label)">
              <tr className="border-b border-(--gym-line)">
                {["Lead", "Phone", "Source", "Interest", "Stage", "Follow-up", "Owner"].map((h) => (
                  <th key={h} className="px-3 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => (
                <tr key={lead.id} className="border-b border-(--gym-line) last:border-0">
                  <td className="px-3 py-3 font-semibold text-[#FF8A4C]">{lead.name}</td>
                  <td className="px-3 py-3 text-(--gym-subtext)">{lead.phone}</td>
                  <td className="px-3 py-3">{lead.source}</td>
                  <td className="px-3 py-3">{lead.interest}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${stageBadge[lead.stage]}`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-3 py-3">{lead.followUp}</td>
                  <td className="px-3 py-3">{lead.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && <p className="py-10 text-center text-sm text-(--gym-subtext)">No leads match this view.</p>}

        <nav className="mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <span className="text-(--gym-subtext)">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            <PageBtn onClick={() => setPage(safePage - 1)} disabled={safePage === 1} label="Previous">
              <FiChevronLeft />
            </PageBtn>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <PageBtn key={n} onClick={() => setPage(n)} current={n === safePage}>
                {n}
              </PageBtn>
            ))}
            <PageBtn onClick={() => setPage(safePage + 1)} disabled={safePage === pages} label="Next">
              <FiChevronRight />
            </PageBtn>
          </div>
        </nav>
      </div>

      {dialog && (
        <NewLeadDialog
          onClose={() => setDialog(false)}
          onCreate={(lead) => {
            addLead(lead);
            setDialog(false);
            setToast(`${lead.name} added to New`);
          }}
        />
      )}
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
};

const PipelineColumn = ({ stage, count, leads, dragging, onDragStart, onDrop }) => {
  const [over, setOver] = useState(false);

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const id = e.dataTransfer.getData("text/plain") || dragging;
        if (id) onDrop(id);
      }}
      className={`min-w-[240px] snap-start rounded-2xl border bg-(--gym-card) p-4 transition lg:min-w-0 ${
        over ? "border-[#FF542E]" : "border-(--gym-line)"
      }`}
    >
      <p className={`font-[Barlow] text-xs font-bold uppercase tracking-wider ${stageTone[stage.id]}`}>{stage.label}</p>
      <p className="mt-1 font-[Anton] text-4xl">{count}</p>
      <p className="text-xs text-(--gym-subtext)">{stage.hint}</p>
      <div className="mt-4 min-h-36 space-y-2">
        {leads.map((lead) => (
          <article
            key={lead.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", lead.id);
              onDragStart(lead.id);
            }}
            onDragEnd={() => onDragStart(null)}
            className="cursor-grab rounded-xl border border-(--gym-line) bg-(--gym-surface) p-3 active:cursor-grabbing"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold">{lead.name}</p>
              {lead.attention && <span className="size-2 shrink-0 rounded-full bg-[#FF542E]" />}
            </div>
            <p className="mt-1 text-xs text-(--gym-subtext)">{lead.source} · {lead.interest}</p>
            <p className="mt-1 text-xs text-(--gym-label)">{lead.followUp}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const LeadCard = ({ lead }) => (
  <article className="rounded-xl border border-(--gym-line) bg-(--gym-surface) p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="font-semibold text-[#FF8A4C]">{lead.name}</p>
        <p className="text-xs text-(--gym-subtext)">{lead.phone}</p>
      </div>
      <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${stageBadge[lead.stage]}`}>{lead.stage}</span>
    </div>
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-(--gym-subtext)">
      <p>{lead.source}</p>
      <p>{lead.interest}</p>
      <p>{lead.followUp}</p>
      <p>{lead.owner}</p>
    </div>
  </article>
);

const PageBtn = ({ children, onClick, disabled, current, label }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={label}
    aria-current={current ? "page" : undefined}
    className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-2 disabled:opacity-40 ${
      current ? "border-[#FF542E] bg-[#FF542E] text-white" : "border-(--gym-line) hover:bg-(--gym-surface)"
    }`}
  >
    {children}
  </button>
);

const NewLeadDialog = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    source: SOURCES[0],
    interest: INTERESTS[0],
    owner: OWNERS[0],
  });

  const valid = form.name.trim() && form.phone.trim();

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-md border border-(--gym-line) bg-(--gym-card) text-(--gym-text)">
        <h2 className="font-[Anton] text-2xl uppercase">New lead</h2>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) onCreate(form);
          }}
        >
          <Field label="Name">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) px-3"
            />
          </Field>
          <Field label="Phone">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) px-3"
            />
          </Field>
          <Field label="Source">
            <select
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) px-3"
            >
              {SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Interest">
            <select
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) px-3"
            >
              {INTERESTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Owner">
            <select
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className="h-11 w-full rounded-xl border border-(--gym-line) bg-(--gym-surface) px-3"
            >
              {OWNERS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="h-11 rounded-xl border border-(--gym-line) px-4 text-sm font-semibold">
              Cancel
            </button>
            <button type="submit" disabled={!valid} className="h-11 rounded-xl bg-grad px-4 text-sm font-semibold text-white disabled:opacity-40">
              Add lead
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
};

const Field = ({ label, children }) => (
  <label className="block text-sm">
    <span className="mb-1 block text-(--gym-subtext)">{label}</span>
    {children}
  </label>
);

export default Leads;
