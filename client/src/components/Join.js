import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: '',
      redirect: false,
      room: null
    };
  }

  handleChange = (e) => {
    this.setState({
      roomCode: e.target.value,
    });
  };

  handleJoinRoom = async () => {
    try {
      console.log('trying to join..')
      const { roomCode } = this.state;
      const response = await fetch('http://localhost:8000/game/join-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ roomid: roomCode })
      });
      const roomData = await response.json();
      console.log('got data...', roomData.Room)
      if (!roomData.Room) {
        throw new Error('Failed to fetch user data');
      }
      this.setState({
        room: roomData.Room,
      });
      localStorage.setItem('roomid',this.state.room.roomid)
      console.log('redirecting with roomid..',localStorage.getItem('roomid'))
      this.setState({ redirect: true })
    } catch (error) {

    }
  };

  render() {
    if (this.state.redirect === true) {
      const data = this.state.room
      return <Navigate to='/play' state={{ data }} />;
    } else {
      return (
        <div>
          <h2>Join a Room</h2>
          <div>
            <label>Room Code:</label>
            <input
              type="text"
              value={this.state.roomCode}
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleJoinRoom}>Join Room</button>
        </div>
      );
    }
  }
}

export default Join;
