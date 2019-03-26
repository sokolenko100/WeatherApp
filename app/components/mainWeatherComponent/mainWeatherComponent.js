import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles';
import { getFromAsyncStorage, writeInAsyncStorage } from '../../services/writeInAsyncStorage/writeInAsyncStorage';
import Utils from '../../services/utils/utils';
import Geolocation from 'react-native-geolocation-service';
import { getDataWeather } from '../../redux/actions/getDataWeather';
import PermissionForLocation from "../../services/permitions/permitions";
import store from '../../redux/store/store';

let { fromJSON, getJSON} = Utils;

export class MainWeatherComponent extends Component {
    constructor(props) {
        super(props);
        this.tempKey = '@dataTemper:key';
        this.state = {
            main:{
                temp: 0,
                humidity: 0
            },
            name: ""
        }
    }

    componentWillReceiveProps({ dataWether } ,nextState){
        let { main, name } = dataWether;
        let valueToDisplay = { main:{ temp:  main.temp, humidity:  main.humidity }, name };

        this.setState( valueToDisplay );
        let jsonWether = getJSON( valueToDisplay );
        writeInAsyncStorage(this.tempKey, jsonWether);
    }

    componentDidMount = ()=>{
        this.getDataFromAsyncStorage();
        let isPermition = PermissionForLocation.hasLocationPermission();
        if( isPermition ){
            this.watchPosition();
        }
    }

    getDataFromAsyncStorage = async()=>{
        let dataFromAsyncStorage = await getFromAsyncStorage(this.tempKey);
        if(dataFromAsyncStorage){
            let fromWether = fromJSON( dataFromAsyncStorage );
            this.setState(fromWether);
        }
    }

    watchPosition = async ( ) => {
		await Geolocation.getCurrentPosition(
			(position) => { store.dispatch( getDataWeather(position.coords.latitude,position.coords.longitude)); },
			(error) => {console.log(error)},
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
		);
    }

    render() {
        let { main, name } = this.state;
     return (
        <View style={styles.wrapper}>
            <Text>City --> { name }</Text>
            <Text>temp --> { main.temp }</Text>
            <Text>humidity --> { main.humidity }</Text>
        </View>
     )}
}
const mapStateToProps = state => ({
    dataWether: state.dataWether,
});
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainWeatherComponent);