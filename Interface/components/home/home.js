import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tab1" component={Screen1} />
        <Tab.Screen name="Tab2" component={Screen2} />
        <Tab.Screen name="Tab3" component={Screen3} />
        <Tab.Screen name="Tab4" component={Screen4} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
