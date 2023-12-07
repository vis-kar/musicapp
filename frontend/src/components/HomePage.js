import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Route, Routes, useParams, Navigate, Link} from 'react-router-dom'
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null
    }
  }

  componentDidMount = async () => {
    fetch('api/user-in-room')
      .then(response => response.json())
      .then(data => {
        this.setState({
          roomCode: data.code
        })
      })
  }

  clearRoomCode = () => {
    this.setState({
      roomCode: null,
    })
  }

  renderHomePage() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align='center'>
          <Typography variant="h1">
            Party Roomz
          </Typography>
        </Grid>
        <Grid item xs={12} align='center'>
          <ButtonGroup disableElevation>
            <Link to='/join'>
            <Button color="primary" variant="contained">Join Room</Button>
            </Link>
            <Link to='/create'>
            <Button color="secondary" variant="contained">Create a Room</Button>
            </Link>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <div className="center">
        <Router>
          <Routes>
            <Route path="/" element={
              this.state.roomCode ? (
                <Navigate to={`/room/${this.state.roomCode}`} />
              ) : this.renderHomePage()
            }/>
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path="/room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}