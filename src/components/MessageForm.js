import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Box, Button, TextField, Grid } from '@mui/material'

function MessageForm({ handleSubmit, text, setText }) {
  return (
    <Box
      component="form"
      className="message_form"
      marginBottom={2}
      onSubmit={handleSubmit}
    >
      <label htmlFor="img">
        <UploadFileIcon />
      </label>
      <Grid>
        <TextField
          size="small"
          placeholder="Enter message"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Grid>
      <Grid>
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Grid>
    </Box>
  )
}

export default MessageForm
