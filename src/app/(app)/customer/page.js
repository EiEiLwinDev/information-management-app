'use client'

import Header from '@/app/(app)/Header'
import Button from '@/components/Button'
import MuiButton from '@mui/material/Button'
import CustomerModal from '@/components/modal/customer'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'

function Customer(){
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const rows = [
    { id: 1, name: 'Snow', passport: 'Jon', phone: 35, workPermit: 'work permit' },
    { id: 2, name: 'Lannister', passport: 'Cersei', phone: 42, workPermit: 'work permit' },
    { id: 3, name: 'Lannister', passport: 'Jaime', phone: 45, workPermit: 'work permit' },
    { id: 4, name: 'Stark', passport: 'Arya', phone: 16, workPermit: 'work permit' },
    { id: 5, name: 'Targaryen', passport: 'Daenerys', phone: null , workPermit: 'work permit'},
    { id: 6, name: 'Melisandre', passport: null, phone: 150 , workPermit: 'work permit'},
    { id: 7, name: 'Clifford', passport: 'Ferrara', phone: 44, workPermit: 'work permit' },
    { id: 8, name: 'Frances', passport: 'Rossini', phone: 36, workPermit: 'work permit' },
    { id: 9, name: 'Roxie', passport: 'Harvey', phone: 65, workPermit: 'work permit'},
  ];
  const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'passport', headerName: 'Passport', width: 100 },
    {
      field: 'phone',
      headerName: 'Mobile',
      width: 100,
    },
    {
      field: 'documents',
      headerName: 'Documents',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 1000,
      renderCell: (params) => (
       <>
        <MuiButton onClick={() => handleDownload(params.row.passport)}>passport</MuiButton>
        <MuiButton onClick={() => handleDownload(params.row.workPermit)}>work permit</MuiButton>
        <MuiButton onClick={() => handleDownload(params.row.familyDocument)}>family document</MuiButton>       
       </>
      ),
    },
  ];
  return (
    <>
      <Header title="Customers" />
      <div className="p-10">
        <div className="py-3">
          <Button
            onClick={() => setShowCustomerModal(true)}
          >Add customer</Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pphone: 0, pphoneSize: 5 },
            },
          }}
          pphoneSizeOptions={[5, 10]}
        />
      </div>
      <CustomerModal
        open={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
      />
    </>
  )
}

export default Customer