import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
// import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Badge } from '@mui/material'
import { onSnapshot, doc } from 'firebase/firestore'
import { appFirestore } from '../firebase/config'

function User({ user1, user, selectUser, chat }) {
  const user2 = user?.uid
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
  const [data, setData] = useState('')
  useEffect(() => {
    let unsub = onSnapshot(doc(appFirestore, 'lastMsg', id), (doc) => {
      setData(doc.data())
    })
    return () => unsub()
    // eslint-disable-next-line
  }, [])
  //   console.log(data)

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        alignItems="flex-start"
        onClick={() => selectUser(user)}
        sx={{ cursor: 'pointer' }}
        className={`${chat.name === user.name && 'selected_user'}`}
      >
        <ListItemAvatar>
          <Avatar>S</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
            <>
              {data && (
                <Typography
                  sx={{ display: 'inline', fontSize: '13px' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <b>{data.from === user1 ? 'Me:' : null}</b>
                  {data.text}
                </Typography>
              )}
            </>
          }
        />
        <ListItemAvatar>
          <Badge variant="dot" color={user.isOnline ? 'primary' : 'error'} />
        </ListItemAvatar>
        <ListItemAvatar>
          {data?.from !== user1 && data?.unread && <MailOutlineIcon />}
        </ListItemAvatar>
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
    </List>
  )
}

export default User
