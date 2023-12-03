import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import Room from "./Room";
import RoomJoinPage from "./RoomJoinPage";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <Router>
          <Routes>
            <Route path="/" element={
              <p>
                This is the home page
              </p>
            } />
            <Route path="/join" element={<RoomJoinPage />} />
            <Route path="/create" element={<CreateRoomPage />} />
            <Route path="/room/:roomCode" element={<Room />} />
          </Routes>
        </Router>
      </div>
    )
  }
}