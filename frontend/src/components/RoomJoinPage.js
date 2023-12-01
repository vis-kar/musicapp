import React from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTextFieldChange = (event) => {
    setRoomCode(event.target.value);
  };

  const roomButtonPressed = async () => {
    try {
      const response = await fetch('/api/join-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: roomCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Room not found');
      }
      setError('')
      navigate('/room/'+roomCode)
      // Handle successful join here
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid
      container
      spacing={1}>
      <Grid
        item
        xs={12}
        align="center">
        <Typography
          variant="h4"
          component="h4">
          Join a Room
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        align="center">
        <Button
          variant="contained"
          color="primary" component={Link} onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center"></Grid>
      <Grid
        item
        xs={12}
        align="center">
        <Button
          variant="contained"
          color="secondary"
          to="/"
          component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}