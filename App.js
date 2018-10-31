import { createStackNavigator } from 'react-navigation';
import { DetailsScreen } from './screens/DetailsScreen';
import { HomeScreen } from './screens/HomeScreen';

const RootStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
}, {
    initialRouteName: 'Home',
});

export default RootStack;
