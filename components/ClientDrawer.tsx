'use client';

import { useForm } from 'react-hook-form';
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

const DEPARTMENT_TYPES = ['Aggregator OB', 'SMBs', 'Auto care', 'White Label'];
const CLIENT_STATUSES = ['Active', 'Inactive'];

export default function ClientDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({ mode: 'onChange' });

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data: any) => {
    setUploading(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      await api.post('/clients', formData);
      onClose();
      reset();
    } catch (err) {
      console.error('❌ Failed to create client:', err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 440,
            height: '100vh', // Full height restored
            borderRadius: '10px 0 0 10px',
            position: 'absolute',
            right: 0,
          },
        },
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b text-lg font-semibold text-[#0a3d62]">Add Client</div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-4 space-y-4 text-[#999]">
          {/* SF ID */}
          <div>
            <label className="block mb-1 text-sm">
              SF ID <span className="text-red-500">*</span>
            </label>
            <input
              {...register('sfId', { required: true })}
              placeholder="Please enter SF ID"
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 placeholder-[#bbb] text-sm"
            />
            {errors.sfId && <p className="text-red-500 text-xs mt-1">SF ID is required</p>}
          </div>

          {/* Client Name */}
          <div>
            <label className="block mb-1 text-sm">
              Client Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register('name', { required: true })}
              placeholder="Please enter client name"
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 placeholder-[#bbb] text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
          </div>

          {/* Department Type */}
          <div>
            <label className="block mb-1 text-sm">
              Department Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('departmentType', { required: true })}
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 text-sm text-[#999]"
              defaultValue=""
            >
              <option value="" disabled>
                Select department type
              </option>
              {DEPARTMENT_TYPES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.departmentType && (
              <p className="text-red-500 text-xs mt-1">Department type is required</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register('status', { required: true })}
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 text-sm text-[#999]"
              defaultValue=""
            >
              <option value="" disabled>
                Select status
              </option>
              {CLIENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && <p className="text-red-500 text-xs mt-1">Status is required</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email', { required: true })}
              placeholder="Please enter email"
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 placeholder-[#bbb] text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          {/* Logo Upload */}
       {/* Logo Upload */}
<div>
  <label className="block mb-2 text-sm font-medium">Upload Logo</label>
  <div className="relative w-full h-20 border-2 border-dotted border-gray-300 rounded-full px-6 bg-[#f9f9f9] flex items-center justify-center text-[#999] cursor-pointer">
    <i className="fa-solid fa-upload mr-2 text-lg"></i>
    <span className="text-sm font-medium">Drag and Drop or browse to upload</span>
    <input
      type="file"
      accept="image/*"
      {...register('logo')}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
  </div>
</div>

        </form>

        {/* Footer Buttons */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 text-[#999] rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || uploading}
            className={`px-6 py-2 text-white rounded ${
              isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </Drawer>
  );
}
