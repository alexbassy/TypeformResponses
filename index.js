import { Navigation } from 'react-native-navigation'
import { registerScreens } from './src/screens'

registerScreens()

Navigation.startSingleScreenApp({
  screen: {
    screen: 'responses.Start',
    navigatorButtons: {},
    navigatorStyle: {
      largeTitle: true
    }
  }
})
