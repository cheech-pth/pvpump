'use client'

import Link from 'next/link';

export default function Page() {
  return (
<main className="flex justify-center items-center h-screen bg-mars-black text-mars-orange">
  <div className="max-w-md w-full px-4 py-8 md:px-6 lg:px-8 xl:px-10">
    <Link href="/dashboard" passHref>
      <h1 className="text-xl font-bold">Go to Dashboard</h1>
    </Link>
  </div>
</main>
  );
}