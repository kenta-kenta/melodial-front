import { useState, useRef } from 'react'
import { PlayArrow, Stop } from '@mui/icons-material'
import { Slider } from '@mui/material'

type AudioPlayerProps = {
  audioUrl: string
  imageUrl: string
  title: string
}

const AudioPlayer = ({ audioUrl, imageUrl, title }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (_: Event, value: number | number[]) => {
    const time = Array.isArray(value) ? value[0] : value
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <img
        src={imageUrl}
        alt="カバー画像"
        className="w-48 h-48 mb-4 rounded-lg object-cover"
      />
      <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
        <span className="text-gray-700 font-medium">{title}</span>
        <div className="w-full flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleSeek}
            sx={{ color: 'orange' }}
          />
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          {isPlaying ? <Stop /> : <PlayArrow />}
        </button>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
