import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

/** api */
import { connect } from 'react-redux'
import Button from '../Button'
import mime from 'mime-types';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

function PreviewModal ({
  open,
  onClose,
  image,
  name
}){
  const mimeType = mime.lookup(image);
  const isImage = mimeType && mimeType.startsWith('image'); 
  const isPDF = mimeType === 'application/pdf';
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog 
      fullWidth
      open={open}
    >
      <DialogTitle className="flex items-center justify-between">
				{name}
				<IconButton onClick={onClose}>
          <Close />
        </IconButton>
			</DialogTitle>        
      <div className="w-full">
        {isImage ? (
            <img src={image} alt="Image Preview" className="w-full" />
        ) : isPDF ? (
            <iframe src={image} title="PDF Preview" className="w-full h-screen" />
        ) : (
            <p>Unsupported file type. Please download</p>
        )}
      </div>
      <div className="flex items-center justify-end p-4 gap-2 mb-0">
          <Button
            variant='outlined'
            onClick={handleClose}
            color='yellow'
          >
            Close
          </Button>
        </div>
    </Dialog>
  )
}

const mapStateToProps = (state) => ({  
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModal)