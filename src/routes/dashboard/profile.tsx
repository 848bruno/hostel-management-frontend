import { createFileRoute } from '@tanstack/react-router';
import { useProfiles, useDeleteProfile } from '@/hooks/useProfile';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort } from '@table-library/react-table-library/sort';
import React, { useMemo, useState } from 'react';
import type { Profile } from '@/components/profiles/interface';
import { Edit, Trash2 } from 'lucide-react';
import EditProfileModal from '@/components/profiles/EditProfileModal';
import { toast } from 'sonner';

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfileList,
});

function ProfileList() {
  const { data: profiles = [], isLoading, error } = useProfiles();
  const deleteProfileMutation = useDeleteProfile();
  const [search, setSearch] = useState('');
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const theme = useTheme([
    getTheme(),
    {
      Table: `--data-table-library_grid-template-columns: 80px 1fr 1.5fr 1fr 1fr;`,
      HeaderRow: `background-color: #e5e7eb; color: #111827; font-weight: 600;`,
      Row: `
        &:nth-of-type(even) {
          background-color: #f3f4f6;
        }
      `,
    },
  ]);

  const filteredData = useMemo(
    () => ({
      nodes: profiles.filter((profile) =>
        `${profile.username} ${profile.email} ${profile.role}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    }),
    [profiles, search]
  );

  const pagination = usePagination(filteredData, {
    state: { page: 0, size: 10 },
  });

  const sort = useSort(
    filteredData,
    { onChange: (action, state) => console.log('Sort:', action, state) },
    {
      sortFns: {
        ID: (arr) => arr.sort((a, b) => Number(a.id) - Number(b.id)),
        NAME: (arr) => arr.sort((a, b) => a.username.localeCompare(b.username)),
        EMAIL: (arr) => arr.sort((a, b) => a.email.localeCompare(b.email)),
      },
    }
  );

  const handleEdit = (profile: Profile) => setEditingProfile(profile);

  const handleDelete = (id: number) => {
    deleteProfileMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Profile deleted successfully');
      },
      onError: (error: any) => {
        toast.error(`Failed to delete: ${error?.message || 'Unknown error'}`);
      },
    });
  };

  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: Profile) => item.id,
      sort: { sortKey: 'ID' },
    },
    {
      label: 'Username',
      renderCell: (item: Profile) => item.username,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'Email',
      renderCell: (item: Profile) => item.email,
      sort: { sortKey: 'EMAIL' },
    },
    {
      label: 'Role',
      renderCell: (item: Profile) => item.role,
    },
    {
      label: 'Actions',
      renderCell: (item: Profile) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 text-sm flex items-center gap-1"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="p-4 text-gray-600">Loading profiles...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading profiles: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Profiles</h1>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-2">
          Search Profiles
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username, email, or role"
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
          Page {pagination.state.page + 1} of{' '}
          {pagination.state.getTotalPages(filteredData.nodes)} | Showing{' '}
          {filteredData.nodes.length} of {profiles.length} profiles
        </span>
        <div className="flex gap-1">
          {pagination.state.getPages(filteredData.nodes).map((_: any, index: number) => (
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

      {editingProfile && (
        <EditProfileModal profile={editingProfile} onClose={() => setEditingProfile(null)} />
      )}
    </div>
  );
}
