import ClaimsList from "@/components/claims/ClaimsList";

async function ClaimsPage({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
    const params = await searchParams;
    const userId = params.userId;

    return (
        <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <ClaimsList userId={userId ?? null} />
        </div>
    )
}

export default ClaimsPage;