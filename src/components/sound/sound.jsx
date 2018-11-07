import React, { Component } from 'react';
import Sound from 'react-sound'
import soundFile from '../../assets/Star_Wars_original_opening_crawl_1977.mp3'

export default class Alert extends Component {
    state = {
        isLoaded: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.song !== this.props.song) {
            this.setState({
                isLoaded: false
            });
        }
    }

    playSong = () => {
        this.setState({
            isLoaded: true,
        });
    }

    render() {
        const { song } = this.props;
        const { isLoaded } = this.state;

        return (
            <div>
                <audio
                    preload="auto"
                    src={soundFile}
                    loop="true"
                    autoPlay={true}
                    onLoadedData={() => this.playSong()}
                    controls={false}
                />
            </div>
        );
    }
}