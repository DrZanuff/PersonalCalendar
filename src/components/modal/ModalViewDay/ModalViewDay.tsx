import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useAtom, useAtomValue } from 'jotai'
import {
  viewDayModalStatusAtom,
  currentEditingCalendarDayAtom,
} from '@/atoms/global-atoms'
import { FormEvent } from '@/components/modal/FormEvent'
import { CalendarEventList } from '@/components/modal/CalendarEventList'
import { ModalViewEvent } from '@/components/modal/ModalViewEvent'

export function ModalViewDay() {
  const currentCalendarDay = useAtomValue(currentEditingCalendarDayAtom)
  const [isModalOpen, setIsModalOpen] = useAtom(viewDayModalStatusAtom)

  const title = `${currentCalendarDay.dayName.substring(0, 3)}., ${
    currentCalendarDay.day
  } of ${currentCalendarDay.monthName.substring(0, 3).toLowerCase()}.`

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
        aria-labelledby="view-current-day-title">
        <DialogTitle id="view-current-day-title">
          Create a new Event
        </DialogTitle>
        <DialogContent>{title}</DialogContent>

        <DialogContent dividers>
          <FormEvent />
        </DialogContent>

        <DialogTitle id="events-for-today">Events for Today</DialogTitle>
        <DialogContent>
          <CalendarEventList />
        </DialogContent>

        <DialogActions>
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={handleModalClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ModalViewEvent />
    </>
  )
}
