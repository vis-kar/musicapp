import React, { useState } from "react"
import { Grid, Button, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from "@material-ui/core"
import { Link, useNavigate } from "react-router-dom"
import { Collapse } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'

export default function CreateRoomPage(props) {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause ?? true);
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip ?? defaultVotes);
  const navigate = useNavigate();
  const title = props.update ? 'Update Room' : 'Create a Room'
  const [successmsg, setSuccessMsg] = useState('')
  const [errormsg, setErrorMsg] = useState('')

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
      .then((data) => navigate('/room/' + data.code));
  }

  const handleUpdatePressed = async e => {
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode
      })
    }
    await fetch('/api/update-room', requestOptions)
      .then(response => {
        if (response.ok) {
          setSuccessMsg('Room Updated successfully')
        } else {
          setErrorMsg('Error updating room')
        }
      })
  }

  function renderCreateButtons() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Button color="primary" variant="contained" onClick={handleCreateRoom}>Create a Room</Button>
        </Grid>
        <Grid item xs={12} align='center'>
          <Button color="secondary" variant="contained" to='/' component={Link}>Back</Button>
        </Grid>
      </Grid>
    )
  }

  function renderUpdateButtons() {
    return (
      <Grid item xs={12} align='center'>
        <Button color="primary" variant="contained" onClick={handleUpdatePressed}>Update Room</Button>
      </Grid>
    )
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={successmsg != '' || errormsg != ''} >
          {successmsg != '' ? <Alert severity="success" onClose={()=>setSuccessMsg('')}>
            {successmsg}
          </Alert> : null}
          {errormsg != '' ? <Alert severity="error" onClose={()=>setErrorMsg('')}>
            {errormsg}
          </Alert> : null}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component='h4' variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component='fieldset'>
          <FormHelperText>
            <div align='center'>Guest control of Playback State</div>
          </FormHelperText>
          <RadioGroup row defaultValue={guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
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
          <TextField required={true} type="number" defaultValue={votesToSkip} inputProps={{
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
      {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  )
}