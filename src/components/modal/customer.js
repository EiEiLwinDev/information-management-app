import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/navigation'

function CustomerModal ({ open, onClose }){
  const router = useRouter()
  const handleClose = () => {
    onClose()
  }
  const handleSubmit = () => {
    onClose()
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
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name" 
            type="text"
            />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Passport
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="passport" 
            type="text"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Mobile
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="phone" 
            type="text"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Passport
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="passport" 
            type="file"
            onChange={(event) => handlePassport(event)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Work permit
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="workpermit" 
            type="file" 
            onChange={(event) => handleWorkPermit(event)}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Family document
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="phone" 
            type="file" 
            onChange={(event) => handleFamilyDocument(event)}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <button className="bg-yellow-700 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClose}>
            Back
          </button>
          <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save
          </button>
        </div>
      </form>
    </Dialog>
  )
}

export default CustomerModal