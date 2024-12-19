"use client"
import { useEffect, useState } from "react";
import api from "../utils/api";

interface Feedback {
  id: number;
  comments: string;
  submittedAt: string;
  employee: { name: string };
}

interface Review {
  id: number;
  title: string;
  description: string;
  status: string;
  feedbacks: Feedback[];
  participants: { name: string };
}

export default function ReviewTable() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review>({
    id: 0,
    title: "",
    description: "",
    status: "",
    feedbacks: [],
    participants: { name: "" },
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get("/reviews");
        const reviewsWithFeedbacks = await Promise.all(
          data.map(async (review: Review) => {
            const feedbacksResponse = await api.get(
              `/reviews/${review.id}/feedbacks`
            );
            return { ...review, feedbacks: feedbacksResponse.data };
          })
        );
        setReviews(reviewsWithFeedbacks);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const handleUpdateReview = async () => {
    if (!selectedReview) return;

    try {
      await api.put(`/reviews/${selectedReview.id}`, {
        title: selectedReview.title,
        description: selectedReview.description,
        status: selectedReview.status,
      });
      alert("Review updated successfully!");
      setShowEditModal(false);
      location.reload();
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review. Please try again.");
    }
  };
  if (!reviews.length) {
    return null;
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow-md bg-white">
      <h2 className="p-4 text-lg font-bold bg-gray-100">Performance Reviews</h2>
      <table className="w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Assignee</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Feedbacks</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{review.id}</td>
              <td className="p-3">{review.participants.name}</td>
              <td className="p-3">{review.title}</td>
              <td className="p-3">{review.description || "N/A"}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-sm font-semibold rounded ${
                    review.status === "active"
                      ? "bg-green-100 text-green-800"
                      : (review.status === "completed" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800")
                  }`}
                >
                  {review.status}
                </span>
              </td>
              <td className="p-3">
                <ul className="list-disc list-inside">
                  {review.feedbacks && review.feedbacks.length > 0 ? (
                    review.feedbacks.map((feedback) => (
                      <li key={feedback.id}>
                        <span className="font-semibold">
                          {feedback.employee?.name ?? ""}:
                        </span>{" "}
                        {feedback.comments}
                      </li>
                    ))
                  ) : (
                    <span>No feedback yet</span>
                  )}
                </ul>
              </td>
              <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedReview(review);
                      setShowEditModal(true);
                    }}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditModal && selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Edit Review</h2>
            <input
              type="text"
              placeholder="Title"
              value={selectedReview.title}
              onChange={(e) =>
                setSelectedReview({ ...selectedReview, title: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={selectedReview.description || ""}
              onChange={(e) =>
                setSelectedReview({
                  ...selectedReview,
                  description: e.target.value,
                })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <select
              value={selectedReview.status}
              onChange={(e) =>
                setSelectedReview({ ...selectedReview, status: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateReview}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
