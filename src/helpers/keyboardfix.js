import { Animated } from 'react-native';

function showKeyboard(event) {
    
    if (!event) return;

    Animated.timing(
        this.state.keyboardHeight,{
            toValue: event.endCoordinates.height,
            duration: 100
        }).start();

    this.setState({
        keyboardShown: true
    });
}

function hideKeyboard(){
    Animated.timing(
        this.state.keyboardHeight,{
            toValue: 0,
            duration: 100
        }).start();

    this.setState({ 
        keyboardShown: false
    })
}

export const keyboardfix = {
    showKeyboard,
    hideKeyboard
};