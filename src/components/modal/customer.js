import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

/** api */
import { post as postCustomer } from '@/api/customer'
import { post as postDocument } from '@/api/document'
import { connect } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Button from '@/components/Button'
import { rules } from '@/utils/form/rules'

function CustomerModal ({
   open, 
   onClose,
   postCustomer,
   onComplete,
   loading,
   docLoading,
   postDocument
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
      'name': '',
      'phone': '',
      'passport': '',
      'gender': 'male',
      'dob': null
    })
    onClose()
  }
  const onSubmit = async(data) => {
    try{
      const response = await postCustomer(data)
      if(data.photo && data.photo.length && URL){
        const formData = new FormData();
        formData.append('document', data.photo[0])
        formData.append('type', 'photo')
        formData.append('customer_id', response.payload.data.id)
        await postDocument(formData)
      }
      if(data.passportDoc && data.passportDoc.length && URL){
        const formData = new FormData();
        formData.append('document', data.passportDoc[0])
        formData.append('type', 'passport')
        formData.append('customer_id', response.payload.data.id)
        console.log('payload', formData)
        await postDocument(formData)
      }
      if(data.visaDoc && data.visaDoc.length && URL){
        const formData = new FormData();
        formData.append('document', data.visaDoc[0])
        formData.append('type', 'visa')
        formData.append('customer_id', response.payload.data.id)
        console.log('payload', formData)
        await postDocument(formData)
      }
      if(data.workpermitDoc && data.workpermitDoc.length && URL){
        const formData = new FormData();
        formData.append('document', data.workpermitDoc[0])
        formData.append('type', 'workpermit')
        formData.append('customer_id', response.payload.data.id)
        console.log('payload', formData)
        await postDocument(formData)
      }
      if(data.nrcDoc && data.nrcDoc.length && URL){
        const formData = new FormData();
        formData.append('document', data.nrcDoc[0])
        formData.append('type', 'nrc')
        formData.append('customer_id', response.payload.data.id)
        console.log('payload', formData)
        await postDocument(formData)
      }
      if(data.censusDoc && data.censusDoc.length && URL){
        const formData = new FormData();
        formData.append('document', data.censusDoc[0])
        formData.append('type', 'census')
        formData.append('customer_id', response.payload.data.id)
        console.log('payload', formData)
        await postDocument(formData)
      }
      reset({
        'name': '',
        'phone': '',
        'passport': '',
        'gender': 'male',
        'dob': null
      })
      onComplete()
    }catch(error){
      console.log('error', error)
    }
  }

  return (
    <Dialog 
      fullWidth
      open={open}
    >
      <DialogTitle>Add new customer</DialogTitle>        
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" action={handleSubmit(onSubmit)}>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passport">
            Passport Id *
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone *
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender *
          </label>
          <select 
            className="
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
            focus:shadow-outline"
            {...register('gender', rules.required)}
            >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Date of birth *
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
            type="date"
            id="photo" 
            {...register('dob', rules.required)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
            Photo
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
            id="photo" 
            type="file"
            {...register('photo')}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passport">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="visa">
            Visa
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
            id="visa" 
            type="file" 
            {...register('visaDoc')}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workpermit">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nrc">
            NRC
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
            id="nrc" 
            type="file" 
            {...register('nrcDoc')}
          />  
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="census">
            Census
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
            id="census" 
            type="file" 
          {...register('censusDoc')}/>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant='outlined'
            onClick={handleClose}
            disabled= {loading.post || docLoading.post}
            color="secondary"
            type="button"
          >
            Back
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled= {loading.post || docLoading.post}
          >
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  loading: state.customer.loading,
  docLoading: state.document.loading
})

const mapDispatchToProps = {
  postCustomer,
  postDocument
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerModal)