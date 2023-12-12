import React, { Component } from 'react';
import music from './assets/beatoven darc theme.mp3'

class BackgroundMusic extends Component {
  audio = new Audio(music)
  componentDidMount() {
    if(this.props.isPlaying){
    this.audio.play().catch((error) => {
      console.error('Autoplay was prevented:', error);
    });}
  }
  componentDidUpdate(prevProps){
    if(this.props.isPlaying && !prevProps.isPlaying){
      this.audio.play();
    }else if(!this.props.isPlaying && prevProps.isPlaying){
      this.audio.pause();
    }
  }
  componentWillUnmount(){
    this.audio.pause()
  }
  render() {
    return <></>; // Replace this with your actual component content
  }
}

export default BackgroundMusic;
