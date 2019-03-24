import React, {Component} from 'react';
import { View, Text, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			latitude: 0,
			longitude: 0,
			forecast: [],
			error:'',
			isLoad: false,
			errorText: " Wait @!!!!!",
		};
	}

	componentDidMount = async()=>{
	 await this.requestLocationPermission();
	}
	async watchPosition() {
		console.log('watchPosition');        
		await Geolocation.getCurrentPosition(
			(position) => {
			  console.log('Position -> ',position);
			  this.setState(
				(prevState) => ({
				latitude: position.coords.latitude, 
				longitude: position.coords.longitude
				}), () => { this.getWeather(); }
			);
			},
			(error) => {
				this.setState(
					(prevState) => ({
						errorText: "ERROR-->>>  " + JSON.stringify(error), 
					})
				);
				console.log(error)},
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
		);
	}
 requestLocationPermission = async ()=> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
	  this.watchPosition();
    } else {
      console.log("location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
	getWeather(){
		let {latitude, longitude} = this.state;
		let url =	'https://openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b6907d289e10d714a6e88b30761fae22';
		fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log("data -->>", data)
			this.setState((prevState, props) => ({
				forecast: data,
				isLoad: true
			}));
		})
	}

	render() {
		let { forecast, isLoad, errorText, latitude, longitude } = this.state;
		return (
			<View style ={ { flex:1 } }>
			<View style ={ { flex:1, height: 100 ,marginBottom:15} }>
			<Text>latitude = { latitude } </Text>
			</View>
			<View style ={ { flex:1, height: 100,marginBottom:15 } }>
			<Text> longitude = { longitude } </Text>
			</View>
			<View style ={ { flex:1, height: 100,marginBottom:15 } }>
			<Text> tempForSities = { JSON.stringify(forecast) } </Text>
			</View>
				{/* { isLoad ?	<FlatList data={ forecast.list} style={{marginTop:20}} keyExtractor={item => item.dt_txt} renderItem={({item}) => <ForecastCard detail={item} location={ forecast.city.name } />} />:<Text> { errorText } </Text>} */}
				{/* { isLoad ? <Text> { JSON.stringify(forecast) } </Text>:	<Text> { errorText } </Text>} */}

			</View>
		);
	}
}


// import React, { Component } from 'react';
// import {
//   Button,
//   PermissionsAndroid,
//   Platform,
//   StyleSheet,
//   Text,
//   ToastAndroid,
//   View
// } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

// export default class App extends Component<{}> {
//   watchId = null;

//   state = {
//     loading: false,
//     updatesEnabled: false,
//     location: {}
//   };

//   hasLocationPermission = async () => {
//     if (Platform.OS === 'ios' ||
//         (Platform.OS === 'android' && Platform.Version < 23)) {
//       return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );

//     if (hasPermission) return true;

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//       ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//       ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
//     }

//     return false;
//   }

//   getLocation = async () => {
//     const hasLocationPermission = await this.hasLocationPermission();

//     if (!hasLocationPermission) return;

//     this.setState({ loading: true }, () => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           this.setState({ location: position, loading: false });
//           console.log(position);
//         },
//         (error) => {
//           this.setState({ location: error, loading: false });
//           console.log(error);
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
//       );
//     });
//   }

//   getLocationUpdates = async () => {
//     const hasLocationPermission = await this.hasLocationPermission();

//     if (!hasLocationPermission) return;

//     this.setState({ updatesEnabled: true }, () => {
//       this.watchId = Geolocation.watchPosition(
//         (position) => {
//           this.setState({ location: position });
//           console.log(position);
//         },
//         (error) => {
//           this.setState({ location: error });
//           console.log(error);
//         },
//         { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
//       );
//     });
//   }

//   removeLocationUpdates = () => {
//       if (this.watchId !== null) {
//           Geolocation.clearWatch(this.watchId);
//           this.setState({ updatesEnabled: false })
//       }
//   }

//   render() {
//     const { loading, location, updatesEnabled } = this.state;
//     return (
//       <View style={styles.container}>
//         <Button title='Get Location' onPress={this.getLocation} disabled={loading || updatesEnabled} />
//         <View style={styles.buttons}>
//             <Button title='Start Observing' onPress={this.getLocationUpdates} disabled={updatesEnabled} />
//             <Button title='Stop Observing' onPress={this.removeLocationUpdates} disabled={!updatesEnabled} />
//         </View>

//         <View style={styles.result}>
//             <Text>{JSON.stringify(location, null, 4)}</Text>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//     paddingHorizontal: 12
//   },
//   result: {
//       borderWidth: 1,
//       borderColor: '#666',
//       width: '100%',
//       paddingHorizontal: 16
//   },
//   buttons: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       alignItems: 'center',
//       marginVertical: 12,
//       width: '100%'
//   }
// });