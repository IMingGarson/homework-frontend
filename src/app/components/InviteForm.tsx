"use client"
import { useState } from "react";
import api from "../utils/api";

export default function InviteForm() {
  const [reviewId, setReviewId] = useState("");
  const [employeeIds, setEmployeeIds] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ids = employeeIds.split(",").map((id) => parseInt(id.trim()));
      await api.post("/reviews/assign", {
        reviewID: parseInt(reviewId),
        employeeIds: ids,
      });
      setMessage("Participants added successfully!");
    } catch (err) {
      setMessage("Error adding participants. Please check input values.");
        console.error(err);
    }
    location.reload();
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md">
      <h2 className="mb-4 text-lg font-bold">Invite Participants</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Review ID"
          value={reviewId}
          onChange={(e) => setReviewId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Employee IDs (comma-separated)"
          value={employeeIds}
          onChange={(e) => setEmployeeIds(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Participants
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
}
