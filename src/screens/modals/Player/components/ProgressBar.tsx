import React, { Component } from 'react';
import TrackPlayer from 'react-native-track-player';
import styled from 'styled-components/native';
import { Text, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { THEME_COLOR } from 'CONSTANTS';
import { DefaultStylesProvider } from 'components/Colors';

const NumberBar = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
`;

function getSeconds(seconds: number): string {
    return Math.floor(seconds % 60).toString().padStart(2, '0');
}

function getMinutes(seconds: number): number {
    return Math.floor(seconds / 60);
}

interface State {
    position: number;
    duration: number;
    gesture?: number;
}

export default class ProgressBar extends Component<{}, State> {
    state: State = {
        position: 0,
        duration: 0,
    };

    timer: number | null = null;

    componentDidMount() {
        this.timer = setInterval(this.updateProgress, 500);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    updateProgress = async () => {
        const [position, duration] = await Promise.all([
            TrackPlayer.getPosition(),
            TrackPlayer.getDuration(),
        ]);

        this.setState({ position, duration });
    };

    handleGesture = async (gesture: number) => {
        // Set relative translation in state
        this.setState({ gesture });
    };

    handleEndOfGesture = (position: number) => {
        // Calculate and set the new position
        TrackPlayer.seekTo(position);
        this.setState({ gesture: undefined, position });
    };

    render() {
        const { position, duration, gesture } = this.state;
        
        return (
            <DefaultStylesProvider>
                {defaultStyle => (
                    <>
                        <Slider
                            value={gesture || position}
                            minimumValue={0}
                            maximumValue={duration || 0}
                            onValueChange={this.handleGesture}
                            onSlidingComplete={this.handleEndOfGesture}
                            minimumTrackTintColor={THEME_COLOR}
                            thumbTintColor={Platform.OS === 'android' ? THEME_COLOR : undefined}
                            disabled={!duration}
                        />
                        <NumberBar>
                            <Text style={defaultStyle.text}>{getMinutes(gesture || position)}:{getSeconds(gesture || position)}</Text>
                            <Text style={defaultStyle.text}>{getMinutes(duration)}:{getSeconds(duration)}</Text>
                        </NumberBar>
                    </>
                )
                }
            </DefaultStylesProvider>
        );
    }
}