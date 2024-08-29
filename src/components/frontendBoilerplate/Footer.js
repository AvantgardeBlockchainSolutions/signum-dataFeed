import React, { useContext } from 'react'
import '../../styles/frontendBoilerplate/Footer.css'
import Switch from '@mui/material/Switch'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import { ModeContext } from '../../contexts/Mode'

const CustomSwitch = styled(Switch)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const theme = createTheme({
  palette: {
    primary: {
      main: '#fbc51b',
      secondary: 'rgba(32, 240, 146, 0.2)',
    },
  },
})

const label = { inputProps: { 'aria-label': 'Dark/Light Mode Switch' } }

function Footer() {
  //Context State
  const mode = useContext(ModeContext)

  return (
    <div className="Footer">
      <p className="FooterText">&copy; 2024 SIGNUM</p>
    </div>
  )
}

export default Footer
