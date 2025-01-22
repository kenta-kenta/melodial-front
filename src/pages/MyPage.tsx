import React, { useState } from 'react'
import { useQueryDiaryDates } from '../hooks/useQueryDiaries'
import Calendar from '../component/mypage/Calendar'

const MyPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { data: diaryDates } = useQueryDiaryDates(currentDate)

  return (
    <div className="container mx-auto p-4 py-20">
      <h1 className="text-2xl font-bold mb-8 text-center text-orange-600">
        マイページ
      </h1>
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        diaryDates={diaryDates}
      />
    </div>
  )
}

export default MyPage
