import { useEffect } from 'react'
import axios from 'axios'
import { CsrfToken } from '../types'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from '../pages/Auth'
import App from '../App'
import Home from '../pages/Home'
import Diary from '../pages/Diary'
import MyPage from '../pages/MyPage'
import Diaries from '../pages/Diaries'
import DiaryMusic from '../pages/DiaryMusic'
import NotFound from '../pages/NotFound'
import Welcome from '../pages/Welcome'

function AppRoutes() {
  // CSRFトークンを取得してaxiosのデフォルトヘッダーに設定
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      const { data } = await axios.get<CsrfToken>(
        `${import.meta.env.VITE_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/diary" element={<Diary />} /> */}
        <Route path="/" element={<App isLogin={false} />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="/" element={<App isLogin={true} />}>
          <Route path="/home" element={<Home />} />
          <Route path="diary">
            <Route index element={<Diary />} />
            <Route path="music/:diaryId" element={<DiaryMusic />} />
          </Route>
          <Route path="diaries" element={<Diaries />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
        <Route path="/" element={<App isLogin={false} />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
