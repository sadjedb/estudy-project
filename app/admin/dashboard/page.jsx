"use client"
import AdminDashboard from "@/components/admin/AdminDashboard";
import withAuth from "@/lib/utils/withAuth";
import React from "react";

const page = () => {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default withAuth(page, ["admin"]);
