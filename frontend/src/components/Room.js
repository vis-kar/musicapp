import React, { useState } from "react"
import { Grid, Button, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";

export default function Room() {
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const navigate = useNavigate()
    const { roomCode } = useParams()

    let leaveButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch('/api/leave-room', requestOptions).then(navigate('/'))
    }

    function renderSettingsButton() {
        return (
            <Grid item xs={12} align='center'>
                <Button variant="contained" color="primary" onClick={() => setShowSettings(!showSettings)}>
                    Settings
                </Button>
            </Grid>
        )
    }

    function renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align='center'>
                    <CreateRoomPage
                        update={true}
                        votesToSkip={votesToSkip}
                        guestCanPause={guestCanPause} 
                        roomCode={roomCode} />
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button variant="contained" color="secondary" onClick={() => setShowSettings(false)} >
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    fetch('/api/get-room' + '?code=' + roomCode)
        .then(response => {
            if (!response.ok) {
                navigate('/')
                new AbortController().abort()
            }
            else
                return response.json()
        })
        .then(data => {
            setVotesToSkip(data.votes_to_skip)
            setGuestCanPause(data.guest_can_pause)
            setIsHost(data.is_host)
        })

    return showSettings? renderSettings() : (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography variant="h4" component='h4'>
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography variant="h5" component='h5'>
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography variant="h5" component='h5'>
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Typography variant="h5" component='h5'>
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align='center'>
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
            </Grid>
        </Grid>
    )
}