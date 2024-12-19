"use client"
import { useEffect } from "react";
import EmployeeTable from "@/app/components/EmployeeTable";
import ReviewTable from "@/app/components/ReviewTable";
import CreateReviewForm from "@/app/components/CreateReviewForm";
import InviteForm from "@/app/components/InviteForm";
import { useRouter } from "next/navigation";
import { clientLogout } from "@/app/utils/storage";
import { getCookie, deleteCookie } from 'cookies-next/client';

export default function AdminPanel() {
  const router = useRouter();

  useEffect(() => {
    const validate = () => {
      const role = getCookie('ROLE');
      if (role !== 'admin') {
        alert("Error");
        deleteCookie("ROLE");
        deleteCookie("JWT_TOKEN")
        router.push("/admin/login");
      }
    }
    validate();
  }, []);

  const handleLogout = () => {
    deleteCookie("JWT_TOKEN")
    clientLogout();
    router.push("/admin/login");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-8 text-3xl font-bold text-center">Admin Panel</h1>

      <section className="mb-10">
        <EmployeeTable />
      </section>

      <section className="mb-10">
        <ReviewTable />
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CreateReviewForm />
        <InviteForm />
      </section>
      <div className="p-4 text-center bg-white shadow-md">
        <button
          onClick={handleLogout}
          className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
