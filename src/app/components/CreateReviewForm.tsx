"use client"
import { useState } from "react";
import api from "@/app/utils/api";

export default function CreateReviewForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/reviews", { employeeId, title, description, status });
      setMessage("Review created successfully!");
    } catch (err) {
      setMessage("Error creating review. Please try again.");
      console.error(err);
    }
    location.reload();
  };

  return (
    <div className="p-6 border rounded-lg bg-white shadow-md">
      <h2 className="mb-4 text-lg font-bold">Create New Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Review
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
}
