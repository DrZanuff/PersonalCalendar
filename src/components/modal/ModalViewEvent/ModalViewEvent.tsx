import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {
  currentEditingCalendarEventAtom,
  viewCalendarEventModalAtom,
} from '@/atoms/global-atoms'
import { useAtom, useAtomValue } from 'jotai'
import { FormEvent } from '@/components/modal/FormEvent'

export function ModalViewEvent() {
  const currentCalendarEvent = useAtomValue(currentEditingCalendarEventAtom)
  const [isModalOpen, setIsModalOpen] = useAtom(viewCalendarEventModalAtom)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleModalClose}
      scroll="paper"
      fullWidth
      maxWidth="xs"
      aria-labelledby="view-current-event-title">
      <DialogTitle id="view-current-event-title">View Event</DialogTitle>

      <DialogContent dividers>
        <FormEvent
          calendarEvent={currentCalendarEvent}
          handleCallback={handleModalClose}
        />
      </DialogContent>
    </Dialog>
  )
}
