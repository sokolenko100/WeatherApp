import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import store from './redux/store/store';
import MainWeatherComponent from './components/mainWeatherComponent/mainWeatherComponent';

export class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.wrapper}>
           <MainWeatherComponent/>
        </View>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
})
export default App;