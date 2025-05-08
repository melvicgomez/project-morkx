'use client';

import { useEffect, useState } from 'react';
import InvitationCode from './components/InvitationCode';
import MainSection from './components/MainSection';

export default function Home() {
  const [isValidCode, setIsValidCode] = useState<boolean | null>(null);

  useEffect(() => {
    const storedExpiration = localStorage.getItem('invitation_expiration');

    if (!storedExpiration) {
      setIsValidCode(false);
      return;
    }

    const now = new Date();
    const expiration = new Date(storedExpiration);

    setIsValidCode(expiration > now);
  }, []);

  if (isValidCode === null) {
    return (
      <div className="h-dvh bg-gray-900 flex flex-row">
        <div className="flex-1 flex flex-col mx-auto self-center text-center">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent border-red-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh bg-gray-900 flex flex-row">
      {isValidCode ? <MainSection /> : <InvitationCode />}
    </div>
  );
}
