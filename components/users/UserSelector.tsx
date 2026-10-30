'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
}

/**
 * Allows the user to select a demo patient and navigate to that patient's claims list.
 */
function UserSelector() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const router = useRouter();

  // Fetch all demo users when the component first loads
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);

      // Default the dropdown to the first demo user
      if (data.length > 0) {
        setSelectedUserId(data[0].id);
      }
    }

    fetchUsers();
  }, []);

  // Navigate to the ClaimsPage for the selected demo user. ClaimsPage will display the ClaimsList component.
  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!selectedUserId) return;

    router.push(`/claims?userId=${selectedUserId}`);
  }

  // Update the selected userId when the dropdown selection changes
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUserId(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user-selector" className="sr-only">Select a demo patient</label>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">

        {users.length > 0 ? (
          <div className="relative w-full sm:w-64">
            <select
              name="userId"
              id="user-selector"
              value={selectedUserId}
              onChange={handleChange}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-9 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600" aria-hidden="true">
              ▼
            </span>
          </div>) : (
          <p className="text-sm text-gray-500">Loading demo patients...</p>
        )}

        <button
          type="submit"
          disabled={!selectedUserId}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          View Claims
        </button>

      </div>
    </form>
  );
}

export default UserSelector;