import { createFileRoute } from '@tanstack/react-router';

import { CompactTable } from '@table-library/react-table-library/compact';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTheme } from '@table-library/react-table-library/theme';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useSort } from '@table-library/react-table-library/sort';
import React, { useMemo, useState } from 'react';

import { Edit, Trash2 } from 'lucide-react';
import type { Feedback } from '@/components/profiles/interface';
import { useFeedbacks } from '@/hooks/useFedbacks';

export const Route = createFileRoute('/dashboard/feedbacks')({
  component: FeedbackList,
});

function FeedbackList() {
  const { data: feedbacks = [], isLoading, error } = useFeedbacks();
  const [search, setSearch] = useState('');
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #e5e7eb;
      `,
      Row: `
        &:nth-of-type(even) {
          background-color: #f3f4f6;
        }
      `,
    },
  ]);

  const filteredData = useMemo(
    () => ({
      nodes: feedbacks
        .filter((feedback) =>
          `${feedback.feedback_text} ${feedback.rating} ${feedback.student?.profile?.username}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((feedback) => ({
          ...feedback,
          id: feedback.feedback_id, // Add id property for TableNode compatibility
        })),
    }),
    [feedbacks, search]
  );

  const pagination = usePagination(filteredData, {
    state: {
      page: 0,
      size: 10,
    },
  });

  const sort = useSort(
    filteredData,
    {},
    {
      sortFns: {
        ID: (array) => array.sort((a: any, b: any) => a.feedback_id - b.feedback_id),
        STUDENT: (array) => array.sort((a, b) => a.student?.profile?.username?.localeCompare(b.student?.profile?.username)),
        RATING: (array) => array.sort((a: any, b: any) => a.rating - b.rating),
      },
    }
  );

  const handleEdit = (feedback: Feedback) => setEditingFeedback(feedback);
  const handleDelete = (id: number) => console.log('Delete clicked for ID:', id);

  const COLUMNS = [
    {
      label: 'ID',
      renderCell: (item: Feedback) => item.feedback_id,
      sort: { sortKey: 'ID' },
    },
    {
      label: 'Student',
      renderCell: (item: Feedback) => item.student?.profile?.id || '__',
      sort: { sortKey: 'STUDENT' },
    },
    {
      label: 'Feedback',
      renderCell: (item: Feedback) => item.feedback_text,
    },
    {
      label: 'Rating',
      renderCell: (item: Feedback) => item.rating,
      sort: { sortKey: 'RATING' },
    },
    {
      label: 'Actions',
      renderCell: (item: Feedback) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(item)}
            className="text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-800"
          >
            <Edit className="w-4 h-4 inline-block mr-1" />Edit
          </button>
          <button
            onClick={() => handleDelete(item.feedback_id)}
            className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-800"
          >
            <Trash2 className="w-4 h-4 inline-block mr-1" />Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div className="p-4">Loading feedbacks...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading feedbacks: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-200 min-h-screen text-black">
      <h1 className="text-2xl font-semibold mb-4">Feedbacks</h1>

      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-800 mb-1">
          Search Feedbacks:
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by text, rating, or student"
          className="w-full px-3 py-2 border border-gray-400 rounded-md bg-white text-black shadow-sm"
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
        <span className="text-sm text-gray-600">
          Total Pages: {pagination.state.getTotalPages(filteredData.nodes)} | Showing {filteredData.nodes.length} of {feedbacks.length}
        </span>
        <div className="flex gap-2">
          {pagination.state.getPages(filteredData.nodes).map((page: any, index: number) => (
            <button
              key={index}
              onClick={() => pagination.fns.onSetPage(index)}
              className={`px-3 py-1 text-sm rounded ${
                pagination.state.page === index
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-300 text-black hover:bg-gray-400'
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
