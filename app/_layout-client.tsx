'use client';

import { useEffect, useState, ReactNode } from 'react';
import { UserProfile } from '@/lib/types';
import { ChatbotWidget } from '@/components/ChatbotWidget';

const DEFAULT_GUEST_PROFILE: UserProfile = {
  name: 'Citizen',
  age: 24,
  gender: 'all',
  state: 'Maharashtra',
  category: 'General',
  occupation: 'job_seeker',
  education: 'undergraduate',
  annualIncome: 250000,
  isRural: false,
  hasDisability: false,
  interests: [],
};

export function LayoutClient({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_GUEST_PROFILE);

  useEffect(() => {
    const loadProfile = () => {
      const stored = localStorage.getItem('soochai_profile');
      if (stored) {
        try {
          setProfile(JSON.parse(stored));
        } catch {
          // Ignore parse errors
        }
      }
    };

    loadProfile();

    window.addEventListener('storage', loadProfile);
    window.addEventListener('soochai_profile_updated', loadProfile);

    return () => {
      window.removeEventListener('storage', loadProfile);
      window.removeEventListener('soochai_profile_updated', loadProfile);
    };
  }, []);

  return (
    <body className="min-h-full flex flex-col">
      {children}
      <ChatbotWidget currentProfile={profile} />
    </body>
  );
}
