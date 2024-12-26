import React from 'react'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { useQueryUser } from '../../hooks/useQueryDiaries'

const Profile: React.FC = () => {
  const { data: user, isLoading } = useQueryUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="mb-4 bg-white shadow-md rounded">
      <CardHeader title="プロフィール" />
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Typography variant="h6">{user?.user_name || 'ゲスト'}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile
