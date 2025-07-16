'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/api';

const DEPARTMENT_TYPES = ['Aggregator OB', 'SMBs', 'Auto care', 'White Label'];
const CHECKLIST_STATUSES = ['Completed', 'Pending'];
const CLIENT_STATUSES = ['Active', 'Inactive'];

export default function ClientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('sfId', data.sfId);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('departmentType', data.departmentType);

      if (data.checklistStatus) formData.append('checklistStatus', data.checklistStatus);
      if (data.status) formData.append('status', data.status);
      if (data.assigningUserId !== undefined && data.assigningUserId !== '') {
        formData.append('assigningUserId', String(data.assigningUserId));
      }
      if (data.logo && data.logo.length > 0) {
        formData.append('logo', data.logo[0]);
      }

      await api.post('/clients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      reset();
      router.push('/clients');
    } catch (err) {
      console.error('Error creating client:', err);
      alert('Failed to create client.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl bg-white p-6 shadow rounded-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add New Client</h2>

      <div>
        <label className="block font-medium">SF ID *</label>
        <input {...register('sfId', { required: true })} className="input" />
        {errors.sfId && <p className="text-red-500 text-sm">SF ID is required</p>}
      </div>

      <div>
        <label className="block font-medium">Client Name *</label>
        <input {...register('name', { required: true })} className="input" />
        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
      </div>

      <div>
        <label className="block font-medium">Email *</label>
        <input {...register('email', { required: true })} type="email" className="input" />
        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
      </div>

      <div>
        <label className="block font-medium">Department Type *</label>
        <select {...register('departmentType', { required: true })} className="input">
          <option value="">Select...</option>
          {DEPARTMENT_TYPES.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.departmentType && (
          <p className="text-red-500 text-sm">Department type is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Checklist Status</label>
        <select {...register('checklistStatus')} className="input">
          <option value="">Select...</option>
          {CHECKLIST_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select {...register('status')} className="input">
          <option value="">Select...</option>
          {CLIENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium">Assigning User ID</label>
        <input
          {...register('assigningUserId')}
          type="number"
          className="input"
        />
      </div>

      <div>
        <label className="block font-medium">Logo (optional)</label>
        <input type="file" accept="image/*" {...register('logo')} className="input" />
      </div>

      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Saving...' : 'Create Client'}
      </button>
    </form>
  );
}
