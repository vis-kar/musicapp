import React, { useEffect, useState } from "react"
import { Grid, Button, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room({ leaveRoomCallback = () => { } }) {
    const [votesToSkip, setVotesToSkip] = useState(2)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false)
    const [song, setSong] = useState({})
    const navigate = useNavigate()
    const { roomCode } = useParams()
    let interval

    const leaveButtonPressed = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }
        await fetch('/api/leave-room', requestOptions)
        navigate('/')
        leaveRoomCallback()
    }
    const getCurrentSong = async () => {
        await fetch('/spotify/current-song').then(response => {
            if (!response.ok)
                return {}
            else
                return response.json()
        }).then(data => setSong(data))
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

    const authenticateSpotify = () => {
        if (!spotifyAuthenticated)
            fetch('/spotify/is-authenticated')
                .then(response => response.json())
                .then(data => {
                    if (!data.status) {
                        fetch('/spotify/get-auth-url')
                            .then(response => response.json())
                            .then(data => {
                                window.location.replace(data.url)
                            })
                    }
                    setSpotifyAuthenticated(data.status)
                })
    }

    fetch('/api/get-room' + '?code=' + roomCode)
        .then(response => {
            if (!response.ok) {
                navigate('/')
                leaveRoomCallback()
                return
            }
            else
                return response.json()
        })
        .then(data => {
            if(!data)
                return
            setVotesToSkip(data.votes_to_skip)
            setGuestCanPause(data.guest_can_pause)
            setIsHost(data.is_host)

            if (isHost)
                authenticateSpotify()
        })

    useEffect(() => {
        interval = setInterval(getCurrentSong, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return showSettings ? renderSettings() : (
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
            <MusicPlayer {...song} />
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align='center'>
                <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
            </Grid>
        </Grid>
    )
}