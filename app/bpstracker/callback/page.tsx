'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function CallbackHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      const appUrl = `bpstracker://oauth/callback?error=${encodeURIComponent(error)}`;
      window.location.href = appUrl;
      return;
    }

    if (code) {
      let appUrl = `bpstracker://oauth/callback?code=${encodeURIComponent(code)}`;
      if (state) {
        appUrl += `&state=${encodeURIComponent(state)}`;
      }
      window.location.href = appUrl;
    }
  }, [searchParams]);

  return (
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
      <h1 className="text-xl font-semibold mb-2">Redirecting to BPS Tracker...</h1>
      <p className="text-gray-400">If the app doesn&apos;t open automatically, please open BPS Tracker manually.</p>
    </div>
  );
}

export default function OAuthCallback() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      }>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}
