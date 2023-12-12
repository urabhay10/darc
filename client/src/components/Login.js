import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.state)
    e.preventDefault();
    const { email, password } = this.state;
    let login = await fetch('http://localhost:8000/users/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    login = await login.json()
    if (login.message) {
      alert(login.message)
    } else if (login.error) {
      alert(login.error)
    } else if (login.token) {
      localStorage.setItem('token', login.token)
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
      <div className="container d-flex justify-content-center align-items-center flex-column" style={{ background: 'linear-gradient(135deg, #cc00ff, #aa00ff)', width: '100vw', height: '100vh' }}>
        <h2 className="mt-4">Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group mt-3">
            <label htmlFor="email">Enter your email</label>
            <input
              style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: 'rgba(255,255,255,0.7)',width: '200px'}}
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
              placeholder='...'
              autoFocus
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password">Enter your password</label>
            <div className="input-group">
              <input
                style={{ border: 'none', borderBottom: '1px solid #000', backgroundColor: 'rgba(255,255,255,0.7)',width: '200px'}}
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
            Login
          </button>
        </form>
        <div style={{ fontWeight: 700, color: 'white' }}>
          New to darc?  <Link to='/register' style={{ color: 'white', textDecoration: 'underline' }}>Signup here</Link>
        </div>
      </div>
    );
  }
}

export default Login;