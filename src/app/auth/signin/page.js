'use client';
import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  if (!providers) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-5">Sign in</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mb-3">
          <button
            onClick={() => signIn(provider.id)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
