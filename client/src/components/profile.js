import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import blackDoor from './assets/door.png'
import whiteDoor from './assets/imageedit_3_3314040264.png'
import blackCrowd from './assets/blackCrowd.png'
import whiteCrowd from './assets/whiteCrowd.png'
import logout from './assets/logout.png'
import blackEntrance from './assets/entrance-icon-4.png'
import whiteEntrance from './assets/entrance-icon.png'
import Join from './Join'
import DarcTheme from './DarcTheme'
import FlipCard from './FlipCard'
import Card from './Card'

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      isLoading: true,
      dooricon: blackDoor,
      entranceicon: blackEntrance,
      crowdicon: blackCrowd,
      redirect_to: 'none',
      openedtab: 'help',
      bgMusic: true,
    };
  }
  logout = () => {
    localStorage.removeItem('token')
  }
  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:8000/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
      const userData = await response.json();
      if (!userData.username) {
        throw new Error('Failed to fetch user data');
      }
      this.setState({
        username: userData.username,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }
  render() {
    const { username, isLoading } = this.state;
    if (this.state.redirect_to === 'create') {
      return <Navigate to='/play' />
    } else if (this.state.redirect_to === 'join') {
      return <Navigate to='/join' />
    }else if(this.state.redirect_to === 'settings'){
      return <Navigate to='/settings' />
    }
    if (isLoading) {
      return (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only"></span>
          <div>Loading</div>
        </div>
      );

    } else if (username) {
      return (
        <>
          <div className="container mt-5" style={{ width: '99vw', height: '99vh', backgroundImage: `url('./3d-cubes-colorful-geometric-patterns-4010x2480-906.jpg')`, paddingLeft: '10px', paddingTop: '10px' }}>
            <div className="text-center create-room" style={{ width: "23vw", color: 'white' }}>
              <h2>Welcome, {username}</h2>
              <button className="profile-options" onClick={this.logout} style={{ width: '70px', position: 'relative', left: '5px', height: '50px', border: 'none', boxShadow: 'none' }}><Link to='/login' style={{ color: 'white' }}><img src={logout} alt='' style={{ height: '50px' }} /></Link></button>
            </div>
            <div className="mt-4 text-center display-flex justify-content-space-around" style={{ position: 'absolute', bottom: '20%' }}>
              <button
                className="create-room"
                onMouseOver={() => {
                  this.setState({ dooricon: whiteDoor })
                }}
                onMouseOut={() => {
                  this.setState({ dooricon: blackDoor })
                }}
                onClick={() => {
                  localStorage.removeItem('roomid');
                  this.setState({ redirect_to: 'create' })
                }}
                style={{
                  position: 'relative',
                  bottom: '40px'
                }}>
                <img
                  src={this.state.dooricon}
                  alt=''
                  style={{
                    height: '90%',
                    padding: '3px'
                  }} />
                Create Room
              </button>
              <button
                className="join-room"
                onMouseOver={() => {
                  this.setState({ entranceicon: whiteEntrance })
                }}
                onMouseOut={() => {
                  this.setState({ entranceicon: blackEntrance })
                }}
                onClick={() => {
                  if (this.state.openedtab !== 'join') {
                    this.setState({ openedtab: 'join' })
                  } else {
                    this.setState({ openedtab: 'help' })
                  }
                }}
                style={{
                  position: 'relative',
                  bottom: '20px'
                }}>
                <img
                  src={this.state.entranceicon}
                  alt=''
                  style={{
                    height: '90%',
                    padding: '3px'
                  }} />
                Join Room
              </button>
              <button
                className="matchmake"
                title={`Coming soon`}
                onMouseOver={() => {
                  this.setState({ crowdicon: whiteCrowd })
                }}
                onMouseOut={() => {
                  this.setState({ crowdicon: blackCrowd })
                }}
                onClick={() => {
                  if (this.state.openedtab !== 'matchmake') {
                    this.setState({ openedtab: 'matchmake' })
                  } else {
                    this.setState({ openedtab: 'help' })
                  }
                }}>
                <img src={this.state.crowdicon} alt='' style={{ height: '90%', padding: '6px' }} />
                Matchmake
              </button>
              <button
                className="profile-options"
                title={`Settings`}
                onClick={() => {
                  this.setState({
                    redirect_to: 'settings'
                  })
                }}
                style={{
                  top: '40px', position: 'relative'
                }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/126/126472.png"
                  alt="" style={{
                    height: '90%',
                    position: 'relative',
                    right: '10px',
                    padding: '3px'
                  }}
                /> Settings</button>
            </div>
          </div>
          <div style={{ height: '70vh', top: '15vh', position: 'fixed', width: '70vw', right: '4.5vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {this.state.openedtab === 'join' ? <div style={{
              position: 'relative',
              transform: 'scale(0.7)',
            }}>
              <Join />
            </div> : <></>}
            {this.state.openedtab === 'matchmake' ? <><div style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #cc00ff, #aa00ff)',
              width: '100%',
              height: '100%',
              textAlign: 'center',
              fontSize: '30px',
              lineHeight: '70vh'
            }}>
              Coming soon!
            </div></> : <></>}
            {this.state.openedtab === 'help' ? <>
              <FlipCard front={<div style={{ border: '5px solid black' }}>
                <Card color='purple' textColor='white' text={`DARC is an interactive card game`} width={4} height={4} fontSize={2} />
              </div>} back={<div style={{ border: '5px solid black' }}>
                <Card color='white' textColor='purple' text={`This is a beta version`} width={4} height={4} fontSize={2} />

              </div>} interval={5} />
            </> : <></>}
            <DarcTheme isPlaying={this.state.bgMusic} />
          </div></>
      )

    } else {
      return (<div className="text-center mt-5">
        <p className="lead">
          Please{' '}
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>{' '}
          or{' '}
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>{' '}
          to start gaming with DARC.
        </p>
      </div>
      )
    }
  }
}

