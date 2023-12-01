import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Room from "./Room";

const RoomWrapper = () =>{
  const {roomCode} = useParams()
  return (
    <Room roomCode={roomCode} />
  )
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={this.props.history}>
        <Routes>
          <Route path="/" element={
            <p>
            This is the home page
          </p>
          } />
          <Route path="/join" element={<RoomJoinPage/>} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<RoomWrapper />}/>
        </Routes>
      </Router>
    )
  }
}