import { useContext, useEffect, useState } from 'react'

/* Contexts */
import { ConfirmContext } from '@/providers/confirmContext'

const useConfirm = () => {
  const [confirm, setConfirm] = useContext(ConfirmContext)
  const [needsCleanup, setNeedsCleanup] = useState(false)

  const isConfirmed = (prompt) => {     
    const promise = new Promise((resolve, reject) => {
      setConfirm({
        prompt,
        isOpen: true,
        proceed: resolve,
        cancel: reject
      })
      setNeedsCleanup(true)
    })

    const reset = () => {
      setConfirm({
        prompt: '',
        proceed: null,
        cancel: null,
        isOpen:
        false
      })
      setNeedsCleanup(false)
    }

    return promise.then(
      () => {
        reset()
        return true
      },
      () => {
        reset()
        return false
      }
    )
  }

  useEffect(() => {
    return () => {
      if (confirm.cancel && needsCleanup) {
        confirm.cancel()
      }
    }
  }, [confirm, needsCleanup])

  return {
    ...confirm,
    isConfirmed
  }
}

export default useConfirm