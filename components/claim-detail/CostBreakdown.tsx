import formatCurrency from "@/lib/claims/formatCurrency";

interface Claim {
    billedAmount: string;
    allowedAmount: string | null;
    insurancePaid: string | null;
    copayAmount: string | null;
    appliedTowardsDeductible: string | null;
    coinsuranceAmount: string | null;
    otherAmount: string | null;
    otherAmountReason: string | null;
    patientResponsibility: string | null;
}

interface CostBreakdownProps {
    claim: Claim;
}

/**
 * Displays a single cost breakdown row with a label and its formatted dollar amount.
 */
function BreakdownRow({ label, value }: { label: string, value: string | null }) {
    return (
        <div className="flex items-center justify-between gap-4 py-2 text-gray-900">
            <span>{label}</span>
            <span className="font-medium">{formatCurrency(value)}</span>
        </div>
    );
}

/**
 * Displays the total cost breakdown for a specific claim.
 * Used by the ClaimDetailPage component to show the claim's cost information.
 */
function CostBreakdown({ claim }: CostBreakdownProps) {
    return (
        <section className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
            {/* Title */}
            <div className="mb-5">
                <h2 className="text-xl font-semibold text-gray-900">Cost Breakdown</h2>
                <p className="mt-1 text-[15px] text-gray-600">See how your healthcare costs were split</p>
            </div>

            {/* Main Costs */}
            <div className="space-y-1">
                <BreakdownRow label="Amount Billed" value={claim.billedAmount} />
                <BreakdownRow label="Allowed Amount" value={claim.allowedAmount} />
                <BreakdownRow label="Insurance Paid" value={claim.insurancePaid} />
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-gray-200" />

            {/* Patient Responsibility */}
            <div>
                <h3 className="mb-3 text-lg font-medium text-gray-900">Your Responsibility</h3>
                <div className="space-y-1">
                    <BreakdownRow label="Copay" value={claim.copayAmount} />
                    <BreakdownRow label="Applied to Deductible" value={claim.appliedTowardsDeductible} />
                    <BreakdownRow label="Coinsurance" value={claim.coinsuranceAmount} />

                    {claim.otherAmount && (
                        <BreakdownRow label={claim.otherAmountReason || "Other Charges"} value={claim.otherAmount} />
                    )}
                </div>
            </div>

            {/* Final Total */}
            <div className="mt-5 border-t border-gray-200 pt-5">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-lg font-semibold text-gray-900">Total You Owe</span>
                    <span className="text-2xl font-bold text-gray-900">{formatCurrency(claim.patientResponsibility)}</span>
                </div>
            </div>
        </section>
    );
}

export default CostBreakdown;
