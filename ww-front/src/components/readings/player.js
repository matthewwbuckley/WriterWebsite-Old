import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Duration from './duration'
import './player.css'

export default class Player extends Component{
  constructor(props){
    super(props)

    this.state = {
      url: null,
      playing: false,
      volume: 1,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0
    }
  }

  

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    console.log('play/pause pressed')
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }
  onPause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }
  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }
  ref = player => {
    this.player = player
  }


  render(){
    const { url, playing, volume, muted, loop, played, loaded, duration, playbackRate } = this.state
    return(
      <div>
        <ReactPlayer 
          ref={this.ref}
          url='http://storage.googleapis.com/writer-205511.appspot.com/photocopy-machine-daniel_simon.mp3' 
          width='0%'
          height='0%'
          playing={playing}
          volume={volume}
          muted={muted}
          onReady={() => console.log('onReady')}
          onStart={() => console.log('onStart')}
          onPlay={this.onPlay}
          onPause={this.onPause}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onEnded={this.onEnded}
          onError={e => console.log('onError', e)}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
        />
        
         <div className='audio-holder'> 
         <button className='play-pause' onClick={this.playPause}>{playing ? <i class="fa fa-pause-circle" aria-hidden="true"></i> : <i class="fa fa-play-circle" aria-hidden="true"></i>}</button>
          <input
            type='range' min={0} max={1} step='any'
            value={played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
          <Duration seconds={duration * played} />/<Duration seconds={duration}/>
          <div className='volume-container'>
            {volume > 0.4 ? <i class="fa fa-volume-up" aria-hidden="true"></i> : volume > 0 ? <i class="fa fa-volume-down" aria-hidden="true"></i> : <i class="fa fa-volume-off" aria-hidden="true"></i>}
          </div>
          <input 
            type='range' 
            className='volume' 
            min={0} 
            max={1} 
            step='any' 
            value={volume} 
            onChange={this.setVolume} 
          />
        </div>
      </div>
    )
  }

}