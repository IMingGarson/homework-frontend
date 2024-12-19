"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect root '/' to the admin login page
    router.push("/admin/login");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-600">Redirecting to Login...</p>
    </div>
  );
}
