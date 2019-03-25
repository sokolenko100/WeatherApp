import Geolocation from 'react-native-geolocation-service';
// import store from '../../redux/store/store';

export default class GeolocationClass{

    static  watchPosition = async( ) => {
		console.log('watchPosition');        
		await Geolocation.getCurrentPosition(
			(position) => {
			  console.log('Position -> ',position);
			//   this.setState(
			// 	(prevState) => ({
			// 	latitude: position.coords.latitude, 
			// 	longitude: position.coords.longitude
            //     }), () => {  }
            GeolocationClass.getWeather(position.coords.latitude, position.coords.longitude);
			// );
			},
			(error) => {console.log(error)},
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
		);
    }
    // static  getWeather = ( {latitude, longitude} ) =>{
	// 	let url =	'https://openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b6907d289e10d714a6e88b30761fae22';
	// 	fetch(url)
	// 	.then(response => response.json())
	// 	.then(data => {
	// 	})
	// }
}