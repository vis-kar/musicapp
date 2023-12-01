import React, { useState } from "react"
import { Grid, Button, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core"
import { Link, useNavigate } from "react-router-dom"

export default function CreateRoomPage(props) {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const navigate = useNavigate();

  const handleVotesChanged = e => {
    setVotesToSkip(e.target.value)
  }
  const handleGuestCanPauseChange = e => {
    setGuestCanPause(e.target.value)
  }
  const handleCreateRoom = async e => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause
      })
    }
    await fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => navigate('/room/'+data.code));
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component='fieldset'>
          <FormHelperText>
            <div align='center'>Guest control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
            <FormControlLabel
              value='true'
              control={<Radio color="primary" />}
              label='Play/Pause'
              labelPlacement="bottom"
            />
            <FormControlLabel
              value='false'
              control={<Radio color="secondary" />}
              label='No Control'
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <FormControl>
          <TextField required={true} type="number" defaultValue={defaultVotes} inputProps={{
            min: 1,
            style: {
              textAlign: 'center'
            }
          }}
            onChange={handleVotesChanged}
          />
          <FormHelperText>
            <div align='center'>Votes Required to Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color="primary" variant="contained" onClick={handleCreateRoom}>Create A Room</Button>
      </Grid>
      <Grid item xs={12} align='center'>
        <Button color="secondary" variant="contained" to='/' component={Link}>Back</Button>
      </Grid>
    </Grid>
  )
}