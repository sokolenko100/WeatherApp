import { SET_DATA_WETHER } from '../constans/constants';

export const getDataWeather = ( latitude, longitude ) => {
    console.log("data from latitude-->>", latitude);
    console.log("data from longitude-->>", longitude);

    return dispatch => {
        let url =	'https://openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=b6907d289e10d714a6e88b30761fae22';
        console.log("data from url-->>", url);

        fetch(url)
		.then(response => response.json())
		.then(data => {
            console.log("data from dispatch-->>", data);

         return  dispatch({
                type: SET_DATA_WETHER,
                data: data,
            });
		}).then(data => {
            console.log("data -->>", data);
		})
        // return dispatch({
        //     type: SET_DATA_WETHER,
        //     data: data,
        // });
    };
}