import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  MdAdd, MdEdit, MdDeleteForever, MdCheckCircle, MdSave,
  MdPerson, MdLock, MdClose,
} from "react-icons/md";
import { getToken } from "@/appwrite";

const BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken() ?? ""}`,
});

async function fetchUsers() {
  const res = await fetch(`${BASE}/api/users.php`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to load users");
  return res.json();
}

async function upsertUser(data) {
  const res = await fetch(`${BASE}/api/users.php`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Failed to save user");
  return json;
}

async function removeUser(id) {
  const res = await fetch(`${BASE}/api/users.php?id=${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Failed to delete user");
}

/* ── Styles ──────────────────────────────────────────────────────── */
const inputClass =
  "w-full h-11 px-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-800 font-raleway placeholder-zinc-400 focus:outline-none focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100 transition-all";
const labelClass = "text-sm font-semibold text-zinc-700 font-raleway";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

/* ── User form modal ─────────────────────────────────────────────── */
function UserModal({ user, onClose, onSaved }) {
  const isNew = !user?.id;
  const [form, setForm] = useState({
    id:       user?.id       ?? 0,
    email:    user?.email    ?? "",
    name:     user?.name     ?? "",
    role:     user?.role     ?? "admin",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [done,   setDone]   = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew && form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      await upsertUser(payload);
      toast.success(isNew ? "User created!" : "User updated!");
      setDone(true);
      setTimeout(() => { setDone(false); onSaved(); onClose(); }, 1200);
    } catch (err) { toast.error(err.message); }
    setSaving(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md modal-enter">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
            <h2 className="text-base font-bold font-raleway text-zinc-800">
              {isNew ? "New Admin User" : `Edit — ${user.email}`}
            </h2>
            <button type="button" onClick={onClose} className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg">
              <MdClose className="text-xl" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
            <Field label="Full Name">
              <div className="relative">
                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  className={cn(inputClass, "pl-9")}
                  placeholder="e.g. Daniel Smith"
                  value={form.name}
                  onChange={e => set("name", e.target.value)}
                />
              </div>
            </Field>

            <Field label="Email Address">
              <input
                required
                type="email"
                className={inputClass}
                placeholder="admin@medinpharma.com"
                value={form.email}
                onChange={e => set("email", e.target.value)}
              />
            </Field>

            <Field label={isNew ? "Password" : "New Password (leave blank to keep current)"}>
              <div className="relative">
                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="password"
                  required={isNew}
                  className={cn(inputClass, "pl-9")}
                  placeholder={isNew ? "Min 8 characters" : "Leave blank to keep current password"}
                  value={form.password}
                  onChange={e => set("password", e.target.value)}
                />
              </div>
            </Field>

            <Field label="Role">
              <select
                className={inputClass}
                value={form.role}
                onChange={e => set("role", e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </Field>

            <button
              type="submit"
              disabled={saving || done}
              className="w-full h-12 rounded-xl font-bold text-[15px] font-raleway flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {done ? (
                <><MdCheckCircle className="text-lg" /> {isNew ? "Created!" : "Saved!"}</>
              ) : saving ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Saving…</>
              ) : (
                <><MdSave className="text-lg" /> {isNew ? "Create User" : "Save Changes"}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   USERS PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function UsersPage() {
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(null);  // null | "new" | user-object
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true);
    fetchUsers()
      .then(setUsers)
      .catch(() => toast.error("Could not load users."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.email}"? This cannot be undone.`)) return;
    setDeleting(user.id);
    try {
      await removeUser(user.id);
      toast.success("User deleted.");
      load();
    } catch (err) { toast.error(err.message); }
    setDeleting(null);
  };

  const roleColor = (role) => {
    if (role === "admin")  return "bg-green-50 text-green-700";
    if (role === "editor") return "bg-blue-50 text-blue-700";
    return "bg-zinc-100 text-zinc-500";
  };

  const initials = (u) =>
    (u.name || u.email || "?")[0].toUpperCase();

  return (
    <AdminLayout title="User Management">
      <div className="p-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 font-raleway">Admin Users</h2>
            <p className="text-sm text-zinc-400 font-raleway mt-0.5">
              Manage who can log in to this dashboard.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModal("new")}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold font-raleway px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <MdAdd className="text-base" /> Add User
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-16 bg-zinc-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <MdPerson className="text-5xl text-zinc-200" />
            <p className="text-zinc-400 font-raleway text-sm">No users found. Create one to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
            {users.map((u, i) => (
              <div
                key={u.id}
                className={cn(
                  "flex items-center gap-4 px-5 py-4",
                  i < users.length - 1 && "border-b border-zinc-100"
                )}
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {initials(u)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-800 font-raleway truncate">
                    {u.name || <span className="text-zinc-400 font-normal italic">No name</span>}
                  </p>
                  <p className="text-xs text-zinc-400 font-worksans truncate">{u.email}</p>
                </div>

                {/* Role badge */}
                <span className={cn(
                  "text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full shrink-0",
                  roleColor(u.role)
                )}>
                  {u.role || "admin"}
                </span>

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => setModal(u)}
                  className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
                  title="Edit user"
                >
                  <MdEdit className="text-base" />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(u)}
                  disabled={deleting === u.id}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                  title="Delete user"
                >
                  <MdDeleteForever className="text-base" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <UserModal
          user={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </AdminLayout>
  );
}
