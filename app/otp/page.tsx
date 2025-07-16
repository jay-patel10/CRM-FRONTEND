'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/verify-otp', { email, otp });

      const token = res.data?.data?.token;
      const role = res.data?.data?.role;

      if (token) {
        localStorage.setItem('token', token);
      }

      if (role) {
        localStorage.setItem('role', role);
      }

      if (role === 'Super Admin') {
        router.push('/clients');
      } else {
        alert('Access denied for your role: ' + role);
        router.push('/');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Verify OTP</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block font-medium">OTP</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="input"
            type="text"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
