"use client";
import { useRouter } from "next/navigation";
import { logout } from "../../components/logout";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}
