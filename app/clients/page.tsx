'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Client } from '@/types/client';
import ClientTable from '@/components/ClientTable';
import FilterModal from '@/components/FilterModel';
import AddClientDrawer from '@/components/ClientDrawer';
import { TextField, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InputAdornment from '@mui/material/InputAdornment';
import { DEPARTMENT_TYPES, CLIENT_STATUSES, CHECKLIST_STATUSES } from '@/utils/constants';

export default function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')?.trim();

    if (!token || role !== 'Super Admin') {
      alert('Access denied. Please login as Super Admin.');
      router.push('/');
    } else {
      fetchClients();
    }
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients');
      setClients(res.data.data);
    } catch (error) {
      console.error('❌ Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (filters: any) => {
    console.log('✅ Filters applied:', filters);
    setFilterOpen(false);
    // You can pass filters to API here
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* 🔍 Search + Filter + Add Button */}
      <div className="flex items-center justify-between">
        {/* 🔎 Search Input */}
        <TextField
          size="small"
          placeholder="Search"
          variant="outlined"
          sx={{
            width: '100%',
            maxWidth: '550px',
            backgroundColor: '#fff',
            borderRadius: '6px',
            '& .MuiOutlinedInput-root': {
              height: '35px',
              fontSize: '0.9rem',
              paddingRight: '8px',
              '& fieldset': {
                borderColor: '#d3d3d3',
              },
              '&:hover fieldset': {
                borderColor: '#999',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0a3d62',
              },
            },
            '& input::placeholder': {
              color: '#a0a0a0',
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#999', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* 👉 Right-side buttons */}
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <IconButton
            onClick={() => setFilterOpen(true)}
            title="Filter"
            sx={{
              border: '1px solid #999',
              borderRadius: '8px',
              padding: '6px',
              backgroundColor: 'transparent',
              minHeight: '30px',
              minWidth: '32px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <FilterAltIcon sx={{ fontSize: 20, color: '#555' }} />
          </IconButton>

          {/* Add Client Button */}
          <Button
            onClick={() => setDrawerOpen(true)}
            sx={{
              border: '1px solid #0a3d62',
              borderRadius: '0.5rem',
              backgroundColor: '#fff',
              color: '#0a3d62',
              textTransform: 'none',
              fontSize: '0.875rem',
              px: 1.5,
              py: 0.5,
              minHeight: '32px',
              lineHeight: 1,
              '&:hover': {
                backgroundColor: '#f0f4f8',
              },
            }}
          >
            Add Client
          </Button>
        </div>
      </div>

      {/* 📊 Client Table */}
      <ClientTable
        data={clients}
        isLoading={loading}
        onEdit={(id) => {
          console.log('Edit client ID:', id);
        }}
      />

      {/* 🎛️ Filter Modal */}
      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onSubmit={handleApplyFilters}
      />

      {/* 📥 Add Client Drawer */}
      <AddClientDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerWidth="380px"
      />
    </div>
  );
}
