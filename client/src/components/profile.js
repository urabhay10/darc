import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import blackDoor from './assets/door.png'
import whiteDoor from './assets/imageedit_3_3314040264.png'
import blackCrowd from './assets/blackCrowd.png'
import whiteCrowd from './assets/whiteCrowd.png'
import logout from './assets/logout.png'

export default class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      isLoading: true,
      dooricon: blackDoor,
      crowdicon: blackCrowd,
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
    if (isLoading) {
      return (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only"></span>
          <div>Loading</div>
        </div>
      );

    } else if (username) {
      return (
        <div className="container mt-5" style={{ width: '99vw', height: '99vh', backgroundImage: `url('./3d-cubes-colorful-geometric-patterns-4010x2480-906.jpg')`, paddingLeft: '10px', paddingTop: '10px'}}>
          <div className="text-center create-room" style={{ width: "26vw", color: 'white' }}>
            <h2>Welcome, {username}</h2>
          <button className="profile-options" onClick={this.logout} style={{ width: '70px',position: 'relative',left:'5px', height: '50px',border: 'none',boxShadow: 'none' }}><Link to='/login' style={{ color: 'white' }}><img src={logout} alt='' style={{ height: '50px'}} /></Link></button>
          </div>
          <div className="mt-4 text-center display-flex justify-content-space-around" style={{ position: 'absolute', bottom: '33%' }}>
            <button className="create-room" onMouseOver={() => { this.setState({ dooricon: whiteDoor }) }} onMouseOut={() => { this.setState({ dooricon: blackDoor }) }} style={{position: 'relative',bottom: '40px' }}><img src={this.state.dooricon} alt='' style={{ height: '90%', padding: '3px'}} />Create Room</button>
            <button className="matchmake" onMouseOver={() => { this.setState({ crowdicon: whiteCrowd }) }} onMouseOut={() => { this.setState({ crowdicon: blackCrowd }) }}><img src={this.state.crowdicon} alt='' style={{ height: '90%', padding: '6px'}} />Matchmake</button>
            <button className="profile-options" style={{top: '40px',position: 'relative' }}><img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="" style={{height: '90%',position: 'relative',right: '10px', padding: '3px'}}/> Settings</button>
          </div>
        </div>
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

