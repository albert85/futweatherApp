import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screen/Home';
import ReportScreen from '../screen/Report';

const MainNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Report: {screen: ReportScreen},
  },
  {
    initialRouteName: 'Home',
  },
);

const App = createAppContainer(MainNavigator);

export default App;
