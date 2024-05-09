import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

/** api */
import { patch as patchCustomer } from '@/api/customer'
import { connect } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Button from '@/components/Button'
import { rules } from '@/utils/form/rules'
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'

function CustomerEditModal ({
   open, 
   onClose,
   patchCustomer,
   onComplete,
   loading,
   current
  }){
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors},
  } = useForm();
  const router = useRouter()

  useEffect(() => {
    if(current){
      setValue('name', current.name)
      setValue('passport', current.passport)
      setValue('phone', current.phone)
      setValue('gender', current.gender)
      setValue('dob', current.dob)
    }
  },[current])

  const handleClose = () => {
    onClose()
  }
  const onSubmit = async(data) => {
    console.log('current', current)
    try{
      await patchCustomer({
        id: current.id,
        data: data
      }) 
      reset({
        "name": '',
        "passport": '',
        "phone": '',
        "gender": ''
      })  
      onComplete()
    }catch(error){
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
      console.log('error', error)
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
    >
      <DialogTitle>Update profile</DialogTitle>        
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
            <small className="text-red-600">{errors?.phone?.message}</small>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
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
            {...register('gender')}
            >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
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
            id="dob" 
            type="date"
            {...register('dob', rules.required)}
            />
            <small className="text-red-600">{errors?.phone?.message}</small>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant='outlined'
            onClick={handleClose}
            disabled= {loading.patch}
            color="secondary"
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled= {loading.patch}
          >
            Update
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({
  loading: state.customer.loading,
})

const mapDispatchToProps = {
  patchCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditModal)