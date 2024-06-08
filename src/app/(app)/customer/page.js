'use client'
import Header from '@/app/(app)/Header'
import CustomerModal from '@/components/modal/customer'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Button from '@/components/Button'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

/** api */
import { find as findCustomers } from '@/api/customer'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

function Customer({
  findCustomers,
  items,
  loading
}){
  const router = useRouter()
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [reload, setReload] = useState(false)
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    findCustomers()
  },[reload])

  const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'passport', headerName: 'Passport', width: 200 },
    {
      field: 'phone',
      headerName: 'Mobile',
      width: 200,
    },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 120,
      renderCell: (params) => {
        const documents = params.row.documents;
        const passport = documents.find((document) => document.type === 'photo');
        
        if(passport){
          return (
            <img 
              src={process.env.NEXT_PUBLIC_BACKEND_URL + passport.content_url} 
              alt="photo" 
              style={{ width: "100%", height: "100%", padding:5}} 
            />
          );
        } else {
          return null; // or any fallback content
        }
      },
    }
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
          autoHeight={true}
          rowHeight={100}
          rows={items}
          disableRowSelectionOnClick
          disable
          slots={GridToolbar}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 500
              }
            }
          }}
          columns={columns}
          loading={loading.get}
          rowSelectionModel={true}          
          onRowClick={(row) => {
            router.push('/customer/' + row.id)
          }}
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