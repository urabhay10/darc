import React, { Component } from 'react'
import ChatContainer from './ChatContainer';

export default class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div id="chatbox" style={{
                position: 'absolute',
                border: '1px solid white',
                height: '464px',
                width: '360px',
                left: '1120px',
                top: '100px',
                backgroundColor: 'rgb(40, 37, 60)',
            }}>
                <div id="chats" style={{
                    height: '440px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    overflowY: 'auto',
                    overflowX: 'hidden'
                }}>
                    {this.props.chats.map((chat) => (
                        <div className="received-chat" key={this.props.chats.indexOf(chat)}>
                            <ChatContainer text={chat} />
                        </div>
                    ))}
                </div>
                <div id="send-form" style={{
                    position: 'relative',
                    bottom: '0',
                    height: '20px',
                }}>
                    <input
                        type="text"
                        name="textcontent"
                        id="textcontent"
                        value={this.props.textcontent}
                        onChange={this.props.handleTextChange}
                        style={{
                            position: 'relative',
                            left: '3px',
                            width: '290px',
                            backgroundColor: 'rgb(129, 126, 152)',
                            border: '1px solid black',
                            borderRadius: '3%',
                            bottom: '3px',
                        }} />
                    <button
                        onClick={() => {
                            this.props.sendText();
                        }}
                        id="sendbutton"
                        style={{
                            backgroundColor: 'rgb(129, 126, 152)',
                            border: '1px solid black',
                            width: '55px',
                            position: 'relative',
                            bottom: '3px',
                        }}>Send</button>
                </div>
            </div >
        )
    }
}
