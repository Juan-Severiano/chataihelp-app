import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from '../screens/Auth'
import Chat from '../screens/App'
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Auth' component={Auth} />
          <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}