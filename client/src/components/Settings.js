import React, { Component } from 'react'

export default class Settings extends Component {
    render() {
        return (
            <div style={{
                background: 'linear-gradient(135deg, #cc00ff, #aa00ff)',
                width: '100vw',
                height: '100vh',
                position: 'relative',
            }}>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white',
                    position: 'absolute',
                    top: 0,
                    width: '100vw',
                    textAlign: 'center',
                    height: '10vh',
                }}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/126/126472.png"
                        alt="" style={{
                            height: '90%',
                            position: 'relative',
                            right: '10px',
                            padding: '3px'
                        }}
                    />
                    Settings
                </div>
                Music
            </div>
        )
    }
}
