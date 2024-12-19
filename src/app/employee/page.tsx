"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clientLogout } from "@/app/utils/storage";
import api from "@/app/utils/api";
import { deleteCookie } from 'cookies-next/client';

interface Review {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface ReviewPayload {
  reviewId: number;
  comments: string;
}

export default function EmployeeDashboard() {
  const [assignedReviews, setAssignedReviews] = useState<Review[]>([]);
  const [participatingReviews, setParticipatingReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState<ReviewPayload>({ reviewId: 0, comments: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const assignedRes = await api.get("/reviews/assigned");
        const participationRes = await api.get("/reviews/participating");
        setAssignedReviews(assignedRes.data);
        setParticipatingReviews(participationRes.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleLogout = () => {
      deleteCookie('JWT_TOKEN');
      clientLogout();
      router.push("/admin/login");
  };

  const handleAddFeedback = async () => {
    try {
      await api.post("/feedback", feedbackData);
      alert("Feedback submitted successfully!");
      setShowModal(false); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Employee Dashboard
      </h1>

      {/* Assigned Reviews */}
      <section className="mb-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Reviews Assigned to You
        </h2>
        {assignedReviews.length > 0 ? (
          <ul className="space-y-4">
            {assignedReviews.map((review) => (
              <li
                key={review.id}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <h3 className="font-bold text-lg">{review.title}</h3>
                <p className="text-gray-600">{review.description || "No description"}</p>
                <p className="text-sm text-gray-500">Status: {review.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews assigned to you.</p>
        )}
      </section>

      {/* Participating Reviews */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Reviews You Are Participating In
        </h2>
        {participatingReviews.length > 0 ? (
          <ul className="space-y-4">
            {participatingReviews.map((review) => (
              <li
                key={review.id}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <h3 className="font-bold text-lg">{review.title}</h3>
                <p className="text-gray-600">{review.description || "No description"}</p>
                <p className="text-sm text-gray-500">Status: {review.status}</p>
                <button
                  onClick={() => {
                    setFeedbackData({ reviewId: review.id, comments: '' });
                    setShowModal(true);
                  }}
                  className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add Feedback
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You are not participating in any reviews.</p>
        )}
      </section>
      <div className="text-center mt-8">
        <button
            onClick={() => handleLogout()}
            className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
            Logout
        </button>
      </div>
       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Add Feedback</h2>
            <textarea
              placeholder="Write your feedback here..."
              value={feedbackData.comments}
              onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFeedback}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
