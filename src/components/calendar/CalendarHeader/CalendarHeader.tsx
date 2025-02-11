import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Spinner from '@mui/material/CircularProgress'
import { generateShortDayNames } from './helpers/generateShortDayNames'
import { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { currentDateAtom } from '@/atoms/global-atoms'
import { IconButton, Stack, Typography } from '@mui/material'
import ArrowForward from '@mui/icons-material/ArrowForward'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { useCurrentUserEvents } from '@/hooks/useCurrentUserEvents'
import { format } from 'date-fns'
import './CalendarHeader-styles.css'
import type { CalendarHeaderProps } from './CalendarHeader.types'

export function CalendarHeader({ onNavigate }: CalendarHeaderProps) {
  const currentDate = useAtomValue(currentDateAtom)
  const shortDayNames = useMemo(() => generateShortDayNames(), [])
  const { loading } = useCurrentUserEvents()

  return (
    <>
      <Box
        height="40px"
        mb="5px"
        justifyContent="center"
        display="flex"
        width="100%">
        {loading ? (
          <Spinner size={20} />
        ) : (
          <Stack
            justifyContent="space-between"
            direction="row"
            gap="20px"
            width="350px">
            <IconButton onClick={() => onNavigate('previous')}>
              <ArrowBack />
            </IconButton>

            <Typography fontSize={20} lineHeight={2}>
              {`${format(currentDate, 'MMMM')} - ${currentDate.getFullYear()}`}
            </Typography>

            <IconButton onClick={() => onNavigate('next')}>
              <ArrowForward />
            </IconButton>
          </Stack>
        )}
      </Box>
      <Card elevation={10}>
        <CardContent className={'CalendarHeader-card-content'}>
          <div className={'CalendarHeader-container'}>
            {shortDayNames.map((day) => (
              <Card key={day} sx={{ width: '100%' }}>
                <CardContent sx={{ padding: '2px 16px!important' }}>
                  <div className="CalendarHeader-header">{day}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
