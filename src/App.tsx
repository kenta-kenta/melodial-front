import './index.css'
import { Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

function App({ isLogin }: { isLogin: boolean }) {
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
      <MainLayout isLogin={isLogin}>
        <Outlet />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
