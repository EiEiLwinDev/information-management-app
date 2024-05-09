
import Dialog from '@mui/material/Dialog'
import Button from '@/components/Button'

function ConfirmModal ({
  open,
  onClose,
  onComplete,
  loading,
  message
}){
     
  return (    
    <Dialog 
      open={open}
    >      
      <div className="rounded-lg m-4">        
      <p>{message}</p>
      </div>
      <div className="flex items-center justify-end p-4 gap-2 mb-0">
        <Button
          variant='outlined'
          onClick={onClose}
          disabled= {loading.delete}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          variant='contained'
          onClick={onComplete}
          disabled= {loading.delete}
          color="error"
        >
          Delete          
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmModal