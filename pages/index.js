import { useEffect } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Session:', session);
    if (session) {
      console.log('Redirecting to /main');
      router.push('/main');
    }
  }, [session, router]);
  return (
    <div>
      {!session && (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      )}
    </div>
  );
}