import Link from "next/link";
import formatCurrency from "@/lib/claims/formatCurrency";

/**
 * Returns the styles used to display each claim status.
 */
function getStatusStyles(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "denied":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

interface Claim {
  userId: string;
  id: string;
  service: string;
  providerName: string;
  status: "approved" | "pending" | "denied";
  patientResponsibility: string | null;
}

/**
 * Displays a summary of each claim in the ClaimsList component.
 * Clicking the claim card navigates the user to the ClaimDetailPage component.
 */
function ClaimCard({ claim }: { claim: Claim }) {
  return (
    <Link href={`/claims/${claim.id}?userId=${claim.userId}`} className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{claim.service}</h3>
        <span className={`rounded-full px-2 py-1 text-xs ${getStatusStyles(claim.status)}`}>{claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}</span>
      </div>

      <p className="mb-3 text-[15px] text-gray-500">{claim.providerName || "Unknown provider"}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">You owe</span>
        <span className="text-lg font-bold text-gray-900">{claim.patientResponsibility != null ? formatCurrency(claim.patientResponsibility) : "N/A"}</span>
      </div>
    </Link>
  );
}

export default ClaimCard;