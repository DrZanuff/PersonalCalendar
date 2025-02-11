import GoogleIcon from '@mui/icons-material/Google'
import Button from '@mui/material/Button'
import { useAuth } from '@/hooks/useAuth'
import './Header-styles.css'

export function Header() {
  const { isFirebaseAvailable, loading, logOut, signIn, user } = useAuth()

  return (
    <div className={'Header-container'}>
      <h1>
        <span>
          Hello {user ? user?.displayName : 'Guest'} to Personal Calendar
        </span>
      </h1>

      {isFirebaseAvailable() && (
        <>
          {!user ? (
            <>
              <h4>Please register for free to save your events on the cloud</h4>
              <Button
                variant="contained"
                color="info"
                onClick={() => signIn()}
                loading={loading}
                startIcon={<GoogleIcon />}>
                Sign In
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={() => logOut()}
              loading={loading}
              startIcon={<GoogleIcon />}>
              Sign Out
            </Button>
          )}
        </>
      )}
    </div>
  )
}
