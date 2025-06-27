import { createFileRoute } from '@tanstack/react-router';
import { useComplains, useDeleteComplain } from '@/hooks/useComplaints';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort } from '@table-library/react-table-library/sort';
import { useMemo, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Complain } from '@/components/profiles/interface';
import EditComplainModal from '@/components/EditComplainModal';
import { toast } from 'react-hot-toast';

export const Route = createFileRoute('/dashboard/complaints')({
  component: ComplainList,
});

function ComplainList() {
  const { data: complains = [], isLoading, error } = useComplains();
  const deleteComplainMutation = useDeleteComplain();
  const [search, setSearch] = useState('');
  const [editingComplain, setEditingComplain] = useState<Complain | null>(null);

  const theme = useTheme([
    getTheme(),
    {
      Table: 'background-color: #e5e7eb;',
      HeaderRow: 'background-color: #d1d5db; color: black;',
      Row: 'color: black; &:nth-of-type(even) { background-color: #f3f4f6; }',
    },
  ]);

  const filteredData = useMemo(
    () => ({
      nodes: complains
        .filter((complain) =>
          `${complain.complain} ${complain.status}`.toLowerCase().includes(search.toLowerCase())
        )
        .map((complain) => ({
          ...complain,
          id: complain.complainid,
        })),
    }),
    [complains, search]
  );

  const pagination = usePagination(filteredData, {
    state: { page: 0, size: 10 },
  });

  const sort = useSort(
    filteredData,
    { onChange: (action, state) => console.log('Sorting changed:', action, state) },
    {
      sortFns: {
        ID: (array) => array.sort((a, b) => a.complainid - b.complainid),
        STATUS: (arr) => arr.sort((a, b) => a.status.localeCompare(b.status)),
      },
    }
  );

  const handleEdit = (complain: Complain) => setEditingComplain(complain);

  const handleDelete = (id: number) => {
    deleteComplainMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Complain deleted successfully');
      },
      onError: (error) => {
        toast.error(`Failed to delete: ${error.message}`);
      },
    });
  };

  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: Complain) => item.complainid,
      sort: { sortKey: 'ID' },
    },
    {
      label: 'Complain',
      renderCell: (item: Complain) => item.complain,
    },
    {
      label: 'Status',
      renderCell: (item: Complain) => item.status,
      sort: { sortKey: 'STATUS' },
    },
    {
      label: 'Created At',
      renderCell: (item: Complain) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      label: 'Actions',
      renderCell: (item: Complain) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="text-white bg-gray-700 hover:bg-gray-800 p-1 px-3 rounded font-medium flex items-center"
          >
            <Edit className="w-5 h-5 mr-1" /> Edit
          </button>
          <button
            onClick={() => handleDelete(item.complainid)}
            className="text-white bg-red-600 hover:bg-red-800 p-1 px-3 rounded font-medium flex items-center"
          >
            <Trash2 className="w-5 h-5 mr-1" /> Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="p-4 text-gray-700">Loading complaints...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading complaints: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-200 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Complaints</h1>

      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-black mb-1">
          Search Complaints:
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by complaint or status"
          className="w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm text-black bg-white focus:outline-none focus:ring-2"
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
        <div className="text-sm text-gray-700">
          Total Pages: {pagination.state.getTotalPages(filteredData.nodes)} | Showing{' '}
          {filteredData.nodes.length} of {complains.length} complaints
        </div>
        <div className="flex gap-2">
          {pagination.state.getPages(filteredData.nodes).map((_: unknown, index: number) => (
            <button
              key={index}
              onClick={() => pagination.fns.onSetPage(index)}
              className={`px-3 py-1 text-sm rounded font-medium ${
                pagination.state.page === index
                  ? 'bg-gray-700 text-white'
                  : 'bg-white text-black border border-gray-400 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {editingComplain && (
        <EditComplainModal
          complain={editingComplain}
          student={editingComplain.student}
          onClose={() => setEditingComplain(null)}
        />
      )}
    </div>
  );
}
