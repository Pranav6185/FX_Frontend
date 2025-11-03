  import React, { useState, useEffect } from "react";
  import { useAuth } from "../contexts/AuthContext";

  interface EnrollButtonProps {
    batchId: string;
    batchName: string;
    enrolledBatchIds: string[]; // pass user's enrolled batch IDs
  }

  const EnrollButton: React.FC<EnrollButtonProps> = ({ batchId, batchName, enrolledBatchIds }) => {
    const { user } = useAuth();
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check if already enrolled
    useEffect(() => {
      if (enrolledBatchIds.includes(batchId)) {
        setEnrolled(true);
      }
    }, [batchId, enrolledBatchIds]);

    const handleEnroll = async () => {
      if (!user) {
        alert("Please log in to enroll");
        return;
      }

      if (enrolled) {
        alert("You are already enrolled in this course!");
        return;
      }

      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("fxstreampro_user");
      const userObj = userStr ? JSON.parse(userStr) : null;
      const userId = userObj?.id || userObj?._id;

      if (!token) {
        alert("Unauthorized. Please login again.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/batches/enroll/${userId}/${batchId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await res.json();
        if (res.ok) {
          setEnrolled(true);
          alert(`You are successfully enrolled in ${batchName}!`);
        } else {
          alert(data.message || "Enrollment failed.");
        }
      } catch (err) {
        console.error("Error enrolling:", err);
        alert("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }

      // open google form
      const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfxVYIstqh-TuQKcE4JUYJm8eBqTXLgftN1fQYN8MNRuqlN3w/viewform?usp=header";
      window.open(googleFormLink, "_blank");
      
    };

    return (
      <button
        onClick={handleEnroll}
        disabled={loading || enrolled}
        className={`${
          enrolled
            ? "bg-green-500 hover:bg-green-500 cursor-not-allowed"
            : "bg-primary-600 hover:bg-primary-700"
        } text-white font-semibold px-6 py-2 rounded-lg shadow disabled:opacity-50`}
      >
        {loading ? "Enrolling..." : enrolled ? "Enrolled" : "Enroll Now"}
      </button>
    );
  };

  export default EnrollButton;
