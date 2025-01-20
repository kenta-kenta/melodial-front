import { useLocation } from 'react-router-dom'
import AudioPlayer from '../component/music/AudioPlayer'

const DiaryMusic = () => {
  const location = useLocation()
  const musicData = location.state.musicData
  const DiaryData = location.state.DiaryData
  return (
    <>
      <div className="mt-20">
        <p className="text-center text-lg font-bold mb-4">
          {DiaryData.content}
        </p>
        <AudioPlayer
          audioUrl={musicData.audio_file}
          imageUrl={musicData.image_file}
          title={musicData.title}
        />
      </div>
    </>
  )
}

export default DiaryMusic
