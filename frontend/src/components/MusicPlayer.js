import React from "react";
import { Grid, Typography, Card, IconButton, LinearProgress } from '@material-ui/core'
import { PlayArrow, SkipNext, PauseCircleFilled } from '@material-ui/icons'

export default function MusicPlayer(props) {
    const songProgress = props.time / props.duration * 100

    const pauseButtonPressed = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
        await fetch('/spotify/pause', requestOptions)
    }

    const playButtonPressed = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'}
        }
        await fetch('/spotify/play', requestOptions)
    }

    const skipButtonPressed = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }
        await fetch('/spotify/skip', requestOptions)
    }

    return (
        <Card>
            <Grid container alignItems="center">
                <Grid item align='center' xs={4}>
                    <img src={props.image_url} height='100%' width='100%' />
                </Grid>
                <Grid item align='center' xs={8}>
                    <Typography component='h5' variant="h5">
                        {props.title}
                    </Typography>
                    <Typography color="textSecondary" variant="h5">
                        {props.artist}
                    </Typography>
                    <div>
                        <IconButton onClick={()=>{
                            props.is_playing? pauseButtonPressed(): playButtonPressed()
                        }}>
                            {props.is_playing ? <PauseCircleFilled /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={skipButtonPressed}>
                            <SkipNext /> {props.votes} / {props.votes_required}
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
        </Card>
    )
}