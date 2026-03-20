"use client";

import { useState } from "react";
import { users as initialUsers } from "@/data/users";
import { Search, Shield, ShieldOff, Users as UsersIcon } from "lucide-react";

export default function AdminUsersPage() {
  const [usersList, setUsersList] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleBlock = (userId: string) => {
    // Simulated block/unblock
    alert(`User ${userId} status toggled (demo only)`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div><h1 className="font-heading text-2xl font-bold">Users</h1><p className="text-sm text-neutral-500">{usersList.length} registered users</p></div>
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-3 gap-2">
          <Search size={16} className="text-neutral-400" />
          <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="py-2 text-sm outline-none w-48" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-neutral-100 bg-neutral-50/50">
            <th className="text-left px-4 py-3 font-semibold">User</th>
            <th className="text-left px-4 py-3 font-semibold">Email</th>
            <th className="text-left px-4 py-3 font-semibold">Role</th>
            <th className="text-left px-4 py-3 font-semibold">Joined</th>
            <th className="text-right px-4 py-3 font-semibold">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-neutral-50">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm">{user.name[0]}</div>
                    <div><p className="font-medium">{user.name}</p><p className="text-xs text-neutral-400">{user.phone}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-neutral-100 text-neutral-600"}`}>{user.role}</span>
                </td>
                <td className="px-4 py-3 text-neutral-500">{new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</td>
                <td className="px-4 py-3 text-right">
                  {user.role !== "admin" && (
                    <button onClick={() => toggleBlock(user.id)} className="p-2 text-neutral-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg" title="Block/Unblock">
                      <ShieldOff size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12"><UsersIcon size={40} className="text-neutral-200 mx-auto mb-3" /><p className="text-neutral-400">No users found</p></div>
        )}
      </div>
    </div>
  );
}
