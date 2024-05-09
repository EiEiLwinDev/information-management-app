import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

/** api */
import { post as postDocument } from '@/api/document'
import { connect } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Button from '@/components/Button'
import { rules } from '@/utils/form/rules'

function DocumentModal ({
   open, 
   onClose,
   onComplete,
   postDocument,
   customer,
   loading
  }){
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm();
  const router = useRouter()

  const handleClose = () => {
    reset({
        "type": '',
        "document": null
      })
    onClose()
  }
  const onSubmit = async(data) => {
    try{
      if(data.document && data.document.length && URL){
        const formData = new FormData();
        formData.append('document', data.document[0])
        formData.append('type', data.type)
        formData.append('customer_id', customer.id)
        await postDocument(formData)
      }
      reset({
        "type": '',
        "document": null
      })
      onComplete()
    }catch(error){
      console.log('error', error)
    }
  }

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Add document</DialogTitle>        
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" action={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Document name *
          </label>
          <input 
            className={`
            shadow 
            appearance-none 
            border 
            rounded 
            w-full 
            py-2 
            px-3 
            text-gray-700 
            leading-tight 
            focus:outline-none 
            focus:shadow-outline
            `}
            id="type"
            type="text"            
            {...register('type', rules.required)}
            />
            <small className="text-red-600">{errors?.type?.message}</small>
        </div>        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="document">
            Document *
          </label>
          <input 
            className={`
            shadow 
            appearance-none 
            border 
            rounded 
            w-full 
            py-2 
            px-3 
            text-gray-700 
            leading-tight 
            focus:outline-none 
            focus:shadow-outline 
            `} 
            id="document" 
            type="file"
            {...register('document', rules.required)}
          />
          <small className="text-red-600">{errors?.document?.message}</small>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant='outlined'
            onClick={handleClose}
            disabled= {loading.post}
            color='secondary'
            type='button'
          >
            Back
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled= {loading.post}
          >
            <span>Save</span>
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  loading: state.document.loading
})

const mapDispatchToProps = {
  postDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentModal)