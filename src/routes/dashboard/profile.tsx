import { createFileRoute } from '@tanstack/react-router';
import { useProfiles } from '@/hooks/useProfile';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort } from '@table-library/react-table-library/sort';
import React, { useMemo, useState } from 'react';
import type { Profile } from '@/components/profiles/interface';
import { Delete, DeleteIcon, Edit, Trash2 } from 'lucide-react';

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfileList,
});

function ProfileList() {
  const { data: profiles = [], isLoading, error } = useProfiles();
  const [search, setSearch] = useState('');
  // added
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #f5f5f5;
      `,
      Row: `
        &:nth-of-type(even) {
          background-color: #f9fafb;
        }
      `,
    },
  ]);

  const filteredData = useMemo(() => ({
    nodes: profiles.filter((profile) =>
      `${profile.first_name} ${profile.last_name} ${profile.email} ${profile.phone_number} ${profile.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ),
  }), [profiles, search]);

  const pagination = usePagination(filteredData, {
    state: {
      page: 0,
      size: 15,
    },
    onChange: (action, state) => {
      console.log('Pagination changed:', action, state);
    },
  });

  const onSortChange = (action:unknown,state:unknown) => {
    console.log(action,state)
    }

  const sort = useSort(filteredData,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        ID: (array) => array.sort((a:any, b:any) => a.id - b.id),
        NAME: (arr) => arr.sort((a, b) => a.first_name.localeCompare(b.first_name)),
        EMAIL: (arr) => arr.sort((a, b) => a.email.localeCompare(b.email)),
      },
    }
  );
 
  // added
  const handleEdit = (profile: Profile) => setEditingProfile(profile);


  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: Profile) => item.id,
      sort: { sortKey: 'ID' },
    },
    {
      label: 'Name',
      renderCell: (item: Profile) => `${item.first_name} ${item.last_name}`,
      sort: { sortKey: 'NAME' },
    },
    {
      label: 'Email',
      renderCell: (item: Profile) => item.email,
      sort: { sortKey: 'EMAIL' },
    },
    {
      label: 'Phone',
      renderCell: (item: Profile) => item.phone_number,
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
          onClick={() => handleEdit(item)}// Added
          className="text-white flex items-center justify-between bg-blue-500 p-1 px-3 rounded hover:bg-blue-800 font-medium"
        >
          <Edit className="w-5 h-5"/>
          Edit
        </button>
        <button
          onClick={() => console.log('Delete clicked for ID:', item.id)} // Replace with actual handler
          className="text-white flex items-center justify-between bg-red-500  p-1 px-3 rounded hover:bg-red-800 font-medium"
        >
          <Trash2  className="w-5 h-5" />
          Delete
        </button>
      </div>
    ),
  },
  ];

  if (isLoading) return <div className="p-4">Loading profiles...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading profiles: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Profiles</h1>

      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Profiles:
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone or role"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:ring-2"
        />
      </div>

      <div className="overflow-x-auto">
        <CompactTable
          columns={COLUMNS}
          data={filteredData}
          theme={theme}
          pagination={pagination}
          sort={sort}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total Pages: {pagination.state.getTotalPages(filteredData.nodes)} | Showing{' '}
          {filteredData.nodes.length} of {profiles.length} profiles
        </div>
        <div className="flex gap-2">
          {pagination.state.getPages(filteredData.nodes).map((_:unknown, index:number) => (
            <button
              key={index}
              onClick={() => pagination.fns.onSetPage(index)}
              className={`px-3 py-1 text-sm rounded ${
                pagination.state.page === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
