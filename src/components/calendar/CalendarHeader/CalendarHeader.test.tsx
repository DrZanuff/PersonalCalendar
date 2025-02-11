import { render, screen } from '@testing-library/react'
import { CalendarHeader } from './CalendarHeader'
import { generateShortDayNames } from './helpers/generateShortDayNames'

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn().mockReturnValue({
    collection: vi.fn().mockReturnValue({
      doc: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => null }), // Return null or empty object for no data
        set: vi.fn().mockResolvedValue(undefined), // No-op for set
      }),
    }),
  }),
}))

describe('CalendarHeader', () => {
  it('should render short day names', () => {
    render(<CalendarHeader onNavigate={() => {}} />)

    const shortDayNames = generateShortDayNames()

    shortDayNames.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })
})
