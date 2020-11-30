import 'react-native-gesture-handler';
import React from 'react';
import { translate } from 'react-translate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Notifications from './../components/Notification';
import HomeScreen from './HomeScreen';
import ComicsPage from './ComicsPage';

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
	cardStyle: {
		opacity: current.progress
	},
});

const RootScreen = () => {
	return (
		<>
		    <NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen 
						name="Home" 
						component={HomeScreen}
						options={
							{
								headerShown: false,
								gestureEnabled: false
							}
						}
					/>
					<Stack.Screen
						name="ComicsPage"
						component={ComicsPage}
						options={
							{
								headerShown: false,
								gestureEnabled: false,
								cardStyleInterpolator: forFade,
								...TransitionPresets.ModalSlideFromBottomIOS
							}
						}
					/>
				</Stack.Navigator>
			</NavigationContainer>
			<Notifications />
		</>
	);
}

const translated = translate('Navigation')(RootScreen);
export default translated;
