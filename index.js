import {Navigation} from 'react-native-navigation'
import {registerScreens} from './src/registerScreens'

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
