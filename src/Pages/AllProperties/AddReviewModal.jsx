import React, { useState } from 'react';

const AddReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(description);
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Add a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            required
            className="w-full border p-2 rounded"
            placeholder="Write your review..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
