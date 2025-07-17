'use client'

import React from 'react'
import { X } from 'lucide-react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Filter Clients</h2>

        <form className="space-y-4">
          {/* Department Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Department Type</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="White Label">White Label</option>
              <option value="In-House">In-House</option>
            </select>
          </div>

          {/* Checklist Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Checklist Status</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="Pending (10%)">Pending (10%)</option>
              <option value="In Progress (50%)">In Progress (50%)</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Client Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Client Status</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
