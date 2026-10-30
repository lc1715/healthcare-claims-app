import formatCurrency from "@/lib/claims/formatCurrency";
import formatDate from "@/lib/claims/formatDate";

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

interface ClaimHeaderProps {
  id: string;
  claimNumber: string;
  service: string;
  providerName: string;
  serviceDate: string;
  insuranceProvider: string | null;
  policyNumber: string | null;
  status: "approved" | "pending" | "denied";
  patientResponsibility: string | null;
}

/**
 * Displays the main claim information, including the service, provider, 
 * status, insurance information, and patient responsibility.
 * Used by ClaimDetailPage component to show the header information for a specific claim.
 */
function ClaimHeader({ claim }: { claim: ClaimHeaderProps }) {
  return (
    <section className="rounded-2xl border border-gray-300 bg-white text-gray-900 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{claim.service}</h1>
          <p className="mt-1 text-gray-600">{claim.providerName || "Unknown provider"}</p>
        </div>

        <span className={`shrink-0 rounded-full px-3 py-1 text-sm ${getStatusStyles(claim.status)}`}>
          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-[15px] sm:grid-cols-2">
        <div>
          <p className="font-semibold">Claim Number:</p>
          <p className="font-medium">{claim.claimNumber}</p>
        </div>

        <div>
          <p className="font-semibold">Service Date:</p>
          <p className="font-medium">{formatDate(claim.serviceDate)}</p>
        </div>

        <div>
          <p className="font-semibold">Insurance:</p>
          <p className="font-medium">{claim.insuranceProvider || "Not available"}</p>
        </div>

        <div>
          <p className="font-semibold">Patient Responsibility:</p>
          <p className="font-medium">{formatCurrency(claim.patientResponsibility)}</p>
        </div>
      </div>
    </section>
  );
}

export default ClaimHeader;