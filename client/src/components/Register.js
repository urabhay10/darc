import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      showPassword: false,
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    let register = await fetch('http://localhost:8000/users/register', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    })
    register = await register.json()
    if (register.message) {
      alert(register.message)
    } else if (register.error) {
      alert(register.error)
    } else if (register.token) {
      localStorage.setItem('token', register.token)
      this.setState({ redirect: true })
    }
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
  async componentDidMount() {
    if (localStorage.getItem('token')) {
      this.setState({ redirect: true })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/profile" />;
    }
    return (
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{ background: 'linear-gradient(135deg, #ff6b6b, #3a1c71)', width: '100vw', height: '100vh' }}>
        <h2 className="mt-4">Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="username">Pick a username</label>
            <input
              style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: 'rgba(255,255,255,0.7)', width: '200px' }}
              type="text"
              placeholder='...'
              className="form-control"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
              autoFocus
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Enter your email</label>
            <input
              style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: 'rgba(255,255,255,0.7)', width: '200px' }}
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              placeholder='...'
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: 'rgba(255,255,255,0.7)', width: '200px' }}
                type={this.state.showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                placeholder='...'
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <div className="input-group-append">
                <button
                  className="log-reg-button btn btn-outline-secondary"
                  type="button"
                  onClick={this.togglePasswordVisibility}
                >
                  {this.state.showPassword ? 'Hide' : 'View'}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="log-reg-button btn mt-3" onClick={this.handleSubmit}>
            Register
          </button>
        </form>
        <div style={{ fontWeight: 700, color: 'white' }}>
          Already a user?<Link to='/login' style={{ color: 'white', textDecoration: 'underline' }}>Login here</Link>
        </div>
      </div>
    );
  }
}

export default Register;

