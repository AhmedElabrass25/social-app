// components/ProtectedRoute.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("socialToken");

    if (!token) {
      router.push("/login");
    } else {
      setToken(token);
    }
  }, [router]);

  if (!token) return null; // or loading spinner

  return children;
};

export default ProtectedRoute;
