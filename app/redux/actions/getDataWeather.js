import { SET_DATA_WETHER } from '../constans/constants';

export const getDataWeather = ( latitude, longitude ) => {
    return dispatch => {
        let url =	'https://openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b6907d289e10d714a6e88b30761fae22';
        fetch(url)
		.then(response => response.json())
		.then(data => {
        dispatch({
                type: SET_DATA_WETHER,
                data: data,
            });
		})
    };
}