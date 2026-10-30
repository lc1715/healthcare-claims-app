'use client'

import { useEffect, useState } from "react";
import ClaimCard from "./ClaimCard";

interface Claim {
  userId: string;
  id: string;
  service: string;
  providerName: string;
  status: "approved" | "pending" | "denied";
  patientResponsibility: string | null;
}

/**
 * Displays all the claims for a specific user.
 * Fetches the user's claims from the claims API route and displays each claim 
 * using the ClaimCard component.
 */
function ClaimsList({ userId }: { userId: string | null }) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch all claims for a specific user whenever the userId changes
  useEffect(() => {
    if (!userId) return;

    async function fetchClaims() {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/claims?userId=${userId}`);

        if (!res.ok) throw new Error("Failed to fetch claims");

        const data = await res.json();
        setClaims(data);
      } catch (err) {
        setError(true);
        console.error("Error fetching claims:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchClaims();
  }, [userId]);

  // If no userId is provided, prompt the user to select a demo user.
  if (!userId) {
    return (
      <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-600">Please select a demo user to view claims.</p>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-600">Loading claims...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center">
        <p className="text-red-600">An error occurred. Please try again later.</p>
      </div>
    );
  }

  // Empty state
  if (claims.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-600">No claims found.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900">Claims</h1>
        <p className="mt-2 text-center text-gray-900">Review your healthcare claims, costs, and payment details</p>
      </div>

      <div className="space-y-4">
        {claims.map((claim) => <ClaimCard key={claim.id} claim={claim} />)}
      </div>
    </section>
  );
}

export default ClaimsList;