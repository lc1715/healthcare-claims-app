import UserSelector from "@/components/users/UserSelector";

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-14 sm:pb-10 lg:px-8">
      <section className="mx-auto w-full max-w-xl rounded-3xl border border-black bg-white px-6 py-10 sm:px-8 sm:py-10 lg:px-10 lg:py-12 lg:pb-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Healthcare Claims</h1>
          <p className="mt-3 text-base leading-7 text-gray-600">Select a demo user to view and understand their healthcare claims</p>
        </div>

        <div className="mt-8">
          <UserSelector />
        </div>
      </section>
    </div>
  );
}

export default Home;
