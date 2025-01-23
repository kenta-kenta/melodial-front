import './index.css'
import { Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ea580c',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
