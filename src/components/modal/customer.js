import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

/** api */
import { post as postCustomer } from '@/api/customer'
import { connect } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Button from '@/components/Button'
import { rules } from '@/utils/form/rules'

function CustomerModal ({
   open, 
   onClose,
   postCustomer,
   onComplete,
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
    onClose()
  }
  const onSubmit = async(data) => {
    try{
      await postCustomer(data)
      onComplete()
    }catch(error){
      console.log('error', error)
    }
  }

  const handlePassport = (event) => {
    console.log('handle passport', event.target.files[0])
  }

  const handleWorkPermit = (event) => {
    console.log('handle work permit', event.target.files[0])
  }

  const handleFamilyDocument = (event) => {
    console.log('handle document', event.target.files[0])
  }

  return (
    <Dialog 
      fullScreen 
      open={open}
    >
      <DialogTitle>Add new customer</DialogTitle>        
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name *
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
            id="name" 
            type="text"            
            {...register('name', rules.required)}
            />
            <small className="text-red-600">{errors?.name?.message}</small>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Passport number *
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
            id="passport" 
            type="text"
            {...register('passport', rules.required)}
            />
            <small className="text-red-600">{errors?.passport?.message}</small>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Mobile *
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
            id="phone" 
            type="text"
            {...register('phone', rules.required)}
            />
            <small className="text-red-600">{errors?.passport?.message}</small>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Passport
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
            id="passport" 
            type="file"
            {...register('passportDoc')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Work permit
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
            id="workpermit" 
            type="file" 
            {...register('workpermitDoc')}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Family document
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
            id="phone" 
            type="file" 
            {...register('familyDoc')}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant='outlined'
            onClick={handleClose}
            disabled= {loading.post}
            color='yellow'
          >
            Back
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled= {loading.post}
          >
            {loading.post ? <CircularProgress size={25}/> : <span>Save</span>}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  loading: state.customer.loading
})

const mapDispatchToProps = {
  postCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModal)