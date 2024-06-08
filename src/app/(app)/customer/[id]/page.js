
'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

/** api */
import { 
  post as postCustomer,
  get as getCustomer 
} from '@/api/customer'
import { 
  post as postDocument,
  remove as deleteDocument,
  download as downloadDocument
} from '@/api/document'

import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { IconButton, capitalize } from '@mui/material'
import PreviewModal from '@/components/modal/preview'
import { useSnackbar } from 'notistack'
import Button from '@/components/Button'

import ConfirmModal from '@/components/modal/confirm'
import { AddBox, Upload } from '@mui/icons-material'
import DocumentModal from '@/components/modal/document'
import CustomerEditModal from '@/components/modal/customerEdit'
import download from 'downloadjs'
import { format } from 'date-fns'

function CustomerDetail ({
  params,
  current,
  loading,
  docLoading,
  deleteDocument,
  downloadDocument,
  getCustomer,
}){
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm();
  const router = useRouter()
  
  const id = params.id
  const { enqueueSnackbar } = useSnackbar()
  const [photo, setPhoto] = useState(null)
  const [showPreviewModal, setShowPreviewModal] = useState(Array(current?.documents?.length).fill(false));
  const [showPhotoPreviewModal, setShowPhotoPreviewModal] = useState(false)
  const [showConifrmModal, setShowConfirmModal] = useState(false)  
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [showCustomerEditModal, setShowCustomerEditModal] = useState(false)
  const [currentDocument, setCurrentDocument] = useState(null)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if(id){
        getCustomer(id)
    }
  },[id, reload])

  useEffect(() => {
    if(current){
      const photo = current.documents?.find((document) => document.type === 'photo')
      setPhoto(photo)
    }
  },[current])

 
  const handleDownload = async(id) => {
    const response = await downloadDocument(id)
    download(atob(response.payload.file), response.payload.name)
    enqueueSnackbar("The document has been downloaded successfully",{
      variant: 'success'
    })
  }

  const handleDelete = async(id) => { 
    await deleteDocument(id)
    setShowConfirmModal(false)
    setReload(!reload)
    enqueueSnackbar("The document is deleted successfully", {
      variant: 'success'
    })
  }

  return (
    <>  
      <div className="rounded-lg p-4 m-4 bg-white shadow">
        <div className="flex items-center justify-start">
          <header className="m-4">Profile</header>
          <IconButton
            sx={{
              color:"#000"
            }}
            onClick={() => setShowCustomerEditModal(true)}
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" className="w-5 h-5">
            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
          </svg>
          </IconButton>
        </div>      
        <div className="lg:flex">                   
          <div className="p-4">          
            {photo ? (
              <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-lg text-center overflow-hidden">              
                <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL + photo.content_url}`} alt='photo' className="rounded-lg" />              
              </div>
            ): (
              <div className="h-48 w-48 rounded-lg flex justify-center items-center text-center border">
                <IconButton 
                  className="shadow"            
                  onClick={() => setShowDocumentModal(true)}                  
                >
                  <Upload/>                    
                </IconButton>       
              </div>            
            )}
            
            {photo && (
              <div className="flex items-center space-x-1 my-2">
                {/* download */}
                <Button
                    key={`download-${photo.id}`}
                    variant='outlined'
                    onClick={()=>{
                      handleDownload(photo.id)
                    }}
                    disabled={loading.post}                          
                    size='sm'
                    className="rounded-md px-2 py-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </Button>
                {/* expand  */}
                <Button
                  key={`preview-${photo.id}`}
                  variant='outlined'
                  onClick={() => {
                    setShowPhotoPreviewModal(true)
                  }}
                  disabled={loading.post}
                  color='secondary'
                  size='sm'
                  className="rounded-md px-2 py-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </Button>
                {/* delete */}
                <Button
                    key={`delete-${photo.id}`}
                    variant='outlined'
                    onClick={() => {
                      setCurrentDocument(photo)
                      setShowConfirmModal(true)
                    }}
                    disabled={loading.post}
                    size='sm'
                    color='error'
                    className="rounded-md px-2 py-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </Button>
                {/* modal */}
                <PreviewModal
                  key={`prview-modal-${photo.id}`}
                  open={showPhotoPreviewModal}
                  onClose={() => {
                    setShowPhotoPreviewModal(false)
                  }}
                  image={process.env.NEXT_PUBLIC_BACKEND_URL + photo.content_url}
                  name={capitalize(photo.type)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between leading-normal">
            <div className="m-8">
              {current && (
                <div>
                  <p className="text-sm text-gray-600 flex items-center"> 
                    Name: <span className="mx-2 text-gray-800">{current.name}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center"> 
                    Passport Id: <span className="mx-2 text-gray-800">{current.passport}</span>
                  </p> 
                  <p className="text-sm text-gray-600 flex items-center"> 
                    Phone: <span className="mx-2 text-gray-800">{current.phone}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center"> 
                    Gender: <span className="mx-2 text-gray-800">{capitalize(current.gender)}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center"> 
                    Date of birth: <span className="mx-2 text-gray-800">{format(new Date(current.dob), 'dd MMM yyyy')}</span>
                  </p>
                </div>
              )}         
            </div>        
          </div>
        </div>
      </div> 
      <div className="rounded-lg bg-white shadow p-4 m-4">
          <div className="flex items-center justify-start">
            <header className="p-2">Documents</header> 
            <IconButton
              sx={{
                color:'#000'
              }}
              onClick={() => setShowDocumentModal(true)}
            >
              <AddBox/>
            </IconButton>
          </div>
          <div className="lg:flex gap-2 m-4">          
            {current && (            
              current.documents?.map((doc, index) => (
                doc.type !== "photo" && (
                  <div className="bg-white shadow rounded-lg items-center p-3 mb-4" key={`document-${doc.id}`}>
                    <p>{capitalize(doc.type)}</p>
                    <div className="flex items-center space-x-1 my-2">
                        {/* download */}
                        <Button
                            key={`download-${index}`}
                            variant='outlined'
                            onClick={()=>{
                              handleDownload(doc.id)
                            }}
                            disabled={loading.download}                          
                            size='sm'
                            className="rounded-md px-2 py-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </Button>
                        {/* expand  */}
                        <Button
                          key={`preview-${index}`}
                          variant='outlined'
                          onClick={() => {
                            setShowPreviewModal(prevState => {
                              const updatedShowPreviewModal = [...prevState];
                              updatedShowPreviewModal[index] = true;
                              return updatedShowPreviewModal;
                            });
                          }}
                          disabled={loading.get}
                          color='secondary'
                          size='sm'
                          className="rounded-md px-2 py-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                        </Button>
                        {/* delete */}
                        <Button
                            key={`delete-${index}`}
                            variant='outlined'
                            onClick={() => {
                              setCurrentDocument(doc)
                              setShowConfirmModal(true)
                            }}
                            disabled={loading.delete}
                            size='sm'
                            color='error'
                            className="rounded-md px-2 py-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </Button>
                        {/* modal */}
                        <PreviewModal
                          key={`prview-modal-${index}`}
                          open={showPreviewModal[index]}
                          onClose={() => {
                            setShowPreviewModal(prevState => {
                              const updatedShowPreviewModal = [...prevState];
                              updatedShowPreviewModal[index] = false;
                              return updatedShowPreviewModal;
                            });
                          }}
                          image={process.env.NEXT_PUBLIC_BACKEND_URL + doc.content_url}
                          name={capitalize(doc.type)}
                        />
                    </div>
                </div>
                )
              ))            
            )}
          </div>
        </div>
      <div className="flex items-center justify-end p-4 gap-2 mb-0">
          <Button
            variant='outlined'
            onClick={() => {
                router.push('/customer')
            }}
            disabled= {loading.post}
            color='secondary'
          >
            Back
          </Button>
      </div> 
      <ConfirmModal
        open={showConifrmModal}
        onClose={() => setShowConfirmModal(false)}
        onComplete={() => handleDelete(currentDocument.id)}
        loading={docLoading}
        message="Are you sure want to delete this document ?"
      />   
      <DocumentModal
        open={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        onComplete={() => {
          setShowDocumentModal(false)
          enqueueSnackbar("The document is uploaded successfully", {
            variant: 'success'
          })
          setReload(!reload)
        }}
        customer={current}
      />
      <CustomerEditModal
        open={showCustomerEditModal}
        onClose={() => setShowCustomerEditModal(false)}
        onComplete={() =>{
          setShowCustomerEditModal(false)
          setReload(!reload)
          enqueueSnackbar("Customer profile has been updated successfully",{
            variant: 'success'
          })
        }}
        current={current}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  loading: state.customer.loading,
  docLoading: state.document.loading,
  current: state.customer.current
})

const mapDispatchToProps = {  
  postDocument,
  deleteDocument,
  downloadDocument,
  postCustomer,
  getCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail)