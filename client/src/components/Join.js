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
      // this.setState({
      //   room: roomData.Room,
      // });
      localStorage.setItem('roomid', roomData.Room.roomid)
      console.log('redirecting with roomid..', localStorage.getItem('roomid'))
      this.setState({ redirect: true })
    } catch (error) {

    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Navigate to='/play' />;
    } else {
      return (
        <div
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              this.handleJoinRoom();
            }
          }}
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #cc00ff, #aa00ff)',
          }}
        >
          <h2 style={{ color: 'black' }}>Join a Room</h2>
          <div>
            <label style={{ color: 'black' }}>Room Code:</label>
            <input
              type="text"
              value={this.state.roomCode}
              onChange={this.handleChange}
              style={{
                width: '200px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid black',
                background: 'white',
                color: 'black',
              }}
              autoFocus
            />
          </div>
          <button
            onClick={() => {
              this.handleJoinRoom();
            }}
            style={{
              padding: '10px 20px',
              marginTop: '10px',
              background: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Join Room
          </button>
        </div>
      );
      
    }
  }
}

export default Join;
