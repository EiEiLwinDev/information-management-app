'use client'

import Header from '@/app/(app)/Header'
import CustomerModal from '@/components/modal/customer'
import { DataGrid } from '@mui/x-data-grid'
import {Box, Stack} from '@mui/material'
import Button from '@/components/Button'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

/** api */
import { find as findCustomers } from '@/api/customer'

function Customer({
  findCustomers,
  items
}){
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    findCustomers()
  },[reload])

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
      width: 500,
      renderCell: (params) => (
        <div class="flex py-2 gap-2">          
            <Button 
              variant='outlined' 
              sx={{
                paddingY: 0,
                marginRight: 1
              }}
              onClick={() => handleDownload(params.row.passport)}              
            >
              passport
            </Button>          
            <Button 
              variant='outlined'
              sx={{
                paddingY: 0,
                marginRight: 1
              }}
              onClick={() => handleDownload(params.row.workPermit)}
            >
              work permit
            </Button>          
            <Button 
              variant='outlined'
              sx={{
                paddingY: 0,
                marginRight: 1
              }} 
              onClick={() => handleDownload(params.row.familyDocument)}
            >
              family document
            </Button>
        </div>
       
      ),
    },
  ];

  const handleDownload = () => {
    console.log('download')
  }

  return (
    <>
      <Header title="Customers" />
      <div className="p-10">
        <div className="py-3">
          <Button
            variant="contained"
            onClick={() => setShowCustomerModal(true)}
          >Add customer</Button>
        </div>
        <DataGrid
          rows={items}
          columns={columns}
        />
      </div>
      <CustomerModal
        open={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        onComplete={() => {
          setReload(!reload)
          setShowCustomerModal(false)
        }}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  items: state.customer.items,
  totalItems: state.customer.totalItems,
  loading: state.customer.loading
})

const mapDispatchToProps = {
  findCustomers
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)