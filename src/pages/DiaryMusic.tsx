import AudioPlayer from '../component/music/AudioPlayer'

const DiaryMusic = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <AudioPlayer
        imageUrl="https://files.topmediai.com/aimusic/api/ea0e0432-c614-4a41-b35b-142c4a17e52d-image.png"
        audioUrl="https://files.topmediai.com/aimusic/api/ea0e0432-c614-4a41-b35b-142c4a17e52d-audio.mp3"
        title="ボタン音"
      />
    </div>
  )
}

export default DiaryMusic
