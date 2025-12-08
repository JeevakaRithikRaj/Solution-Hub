import { Header } from '@/components/layout/header';
import { SolutionHubClient } from '@/components/solution-hub/solution-hub-client';
import { Suspense } from 'react';
import Loading from './loading';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:gap-8 md:p-8">
        <div className="w-full max-w-4xl">
          <Suspense fallback={<Loading />}>
            <SolutionHubClient />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
