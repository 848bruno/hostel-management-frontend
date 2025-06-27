import { createFileRoute } from '@tanstack/react-router';

import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort } from '@table-library/react-table-library/sort';
import React, { useMemo, useState } from 'react';

import { Edit, Trash2 } from 'lucide-react';
import type { Admin } from '@/components/profiles/interface';
import { useAdmins } from '@/hooks/useAdmin';
import EditAdminModal from '@/components/EditAdminModal';

export const Route = createFileRoute('/dashboard/admins')({
  component: AdminList,
});

function AdminList() {
  const { data: admins = [], isLoading, error } = useAdmins();
  const [search, setSearch] = useState('');
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `background-color: #e5e7eb; color: #111827; font-weight: 600;`,
      Row: `&:nth-of-type(even) { background-color: #f3f4f6; }`,
    },
  ]);

  const filteredData = useMemo(() => ({
    nodes: admins.filter((admin) =>
      `${admin.profile?.username} ${admin.profile?.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ),
  }), [admins, search]);

  const pagination = usePagination(filteredData, {
    state: { page: 0, size: 10 },
  });

  const sort = useSort(
    filteredData,
    { onChange: (action, state) => console.log('Sort:', action, state) },
    {
      sortFns: {
        ID: (arr) => arr.sort((a, b) => Number(a.id ?? 0) - Number(b.id ?? 0)),
        NAME: (arr) => arr.sort((a, b) => a.profile.username.localeCompare(b.profile.username)),
        EMAIL: (arr) => arr.sort((a, b) => a.profile.email.localeCompare(b.profile.email)),
      },
    }
  );

  const handleEdit = (admin: Admin) => setEditingAdmin(admin);

  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: Admin) => item.id,
      sort: { sortKey: 'ID' },
    },
  
    {
      label: 'Email',
      renderCell: (item: Admin) => item.profile?.email ?? '—',
      sort: { sortKey: 'EMAIL' },
    },
    {
      label: 'Last Login',
      renderCell: (item: Admin) => new Date(item.last_login).toLocaleString(),
    },
    {
      label: 'Actions',
      renderCell: (item: Admin) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 text-sm flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => console.log('Delete clicked for ID:', item.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="p-4 text-gray-600">Loading admins...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading admins: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admins</h1>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-2">
          Search Admins
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username or email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:ring-gray-500 focus:border-gray-500"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <CompactTable
          columns={COLUMNS}
          data={filteredData}
          theme={theme}
          pagination={pagination}
          sort={sort}
        />
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>
          Page {pagination.state.page + 1} of {pagination.state.getTotalPages(filteredData.nodes)} | Showing {filteredData.nodes.length} of {admins.length} admins
        </span>
        <div className="flex gap-1">
          {pagination.state.getPages(filteredData.nodes).map((_: unknown, index: number) => (
            <button
              key={index}
              onClick={() => pagination.fns.onSetPage(index)}
              className={`px-3 py-1 rounded ${
                pagination.state.page === index
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {editingAdmin && 
        <EditAdminModal
          admin={editingAdmin}
          onClose={() => setEditingAdmin(null)}
        />
      }
    </div>
  );
}
