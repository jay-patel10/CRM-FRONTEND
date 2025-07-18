'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'

const DEPARTMENT_TYPES = ['Aggregator OB', 'SMBs', 'Auto care', 'White Label']
const CLIENT_STATUSES = ['Active', 'Inactive']
const CHECKLIST_STATUSES = ['Pending (10%)', 'In Progress (50%)', 'Completed']

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (filters: any) => void
}

export default function FilterModal({
  isOpen,
  onClose,
  onSubmit,
}: FilterModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md shadow-md w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-[16px] font-semibold mb-5 text-gray-800">Filter</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Department Type */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Select Department Type
            </label>
            <select
              {...register('departmentType')}
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 text-sm text-[#999]"
              defaultValue=""
            >
              <option value="" disabled>
                Please Select
              </option>
              {DEPARTMENT_TYPES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Select Status</label>
            <select
              {...register('status')}
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 text-sm text-[#999]"
              defaultValue=""
            >
              <option value="" disabled>
                Please Select
              </option>
              {CLIENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Checklist Status */}
          <div>
            <label className="block mb-1 text-sm text-gray-700">
              Select Checklist Status
            </label>
            <select
              {...register('checklistStatus')}
              className="w-full bg-white border-b border-gray-300 focus:outline-none focus:border-blue-500 py-2 text-sm text-[#999]"
              defaultValue=""
            >
              <option value="" disabled>
                Please Select
              </option>
              {CHECKLIST_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                reset()
                onClose()
              }}
              className="px-4 py-1.5 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
