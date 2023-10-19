import React, { Component } from 'react'

export default class ChatContainer extends Component {
    render() {
        return (
            <div style={{
                backgroundColor: 'cyan',
                width: '360px',
                height: '20px',
            }}>
                {this.props.text.length > 56 ? this.props.text.slice(0, 53) + '...':this.props.text }
            </div>
        )
    }
}
