import { createFileRoute } from '@tanstack/react-router';
import { useStudents, useDeleteStudent } from '@/hooks/useStudent';
import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort } from '@table-library/react-table-library/sort';
import { useState, useMemo } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Student } from '@/components/profiles/interface';
import { toast } from 'sonner';
import EditComplainModal from '@/components/EditComplainModal';

export const Route = createFileRoute('/dashboard/students')({
  component: StudentList,
});

function StudentList() {
  const { data: students = [], isLoading, error } = useStudents();
  const deleteStudentMutation = useDeleteStudent(); // ✅ Add delete hook
  const [search, setSearch] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `background-color: #f1f5f9; font-weight: 600; color: #1f2937;`,
      Row: `&:nth-of-type(even) { background-color: #f9fafb; }`,
    },
  ]);

  const filteredData = useMemo(
    () => ({
      nodes: students.filter((student) =>
        `${student.room_id} ${student.course_id}`.toLowerCase().includes(search.toLowerCase())
      ),
    }),
    [students, search]
  );

  const pagination = usePagination(filteredData, {
    state: { page: 0, size: 10 },
  });

  const sort = useSort(
    filteredData,
    {},
    {
      sortFns: {
        ID: (arr) => arr.sort((a, b) => Number(a.id) - Number(b.id)),
        ROOM: (arr) => arr.sort((a, b) => a.room_id - b.room_id),
        COURSE: (arr) => arr.sort((a, b) => a.course_id - b.course_id),
      },
    }
  );

  const handleEdit = (student: Student) => setEditingStudent(student);

  const handleDelete = (id: number) => {
    deleteStudentMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Student deleted successfully');
      },
      onError: (error) => {
        toast.error(`Failed to delete student: ${error.message}`);
      },
    });
  };

  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: Student) => item.id,
      sort: { sortKey: 'ID' },
    },
    {
      label: 'Room',
      renderCell: (item: Student) => item.room_id,
      sort: { sortKey: 'ROOM' },
    },
    {
      label: 'Course',
      renderCell: (item: Student) => item.course_id,
      sort: { sortKey: 'COURSE' },
    },
    {
      label: 'Registered',
      renderCell: (item: Student) => new Date(item.registration_date).toLocaleDateString(),
    },
    {
      label: 'Actions',
      renderCell: (item: Student) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm flex items-center gap-1"
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

  if (isLoading) return <div className="p-4 text-gray-500 italic">Loading students...</div>;
  if (error) return <div className="p-4 text-red-600 font-semibold">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 text-black min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Students</h1>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Students
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by room or course"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-md">
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
          Page {pagination.state.page + 1} of {pagination.state.getTotalPages(filteredData.nodes)} | Showing{' '}
          {filteredData.nodes.length} of {students.length} students
        </span>
        <div className="flex gap-1">
          {pagination.state.getPages(filteredData.nodes).map((_: unknown, index: number) => (
            <button
              key={index}
              onClick={() => pagination.fns.onSetPage(index)}
              className={`px-3 py-1 rounded font-medium ${
                pagination.state.page === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {editingStudent && (
        <EditComplainModal
          student={editingStudent}
          complain={{} as any}
          onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
}
