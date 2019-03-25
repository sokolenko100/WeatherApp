import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles';
import { getFromAsyncStorage } from '../../services/writeInAsyncStorage/writeInAsyncStorage';
import Utils from '../../services/utils/utils';
import Geolocation from 'react-native-geolocation-service';
import { getDataWeather } from '../../redux/actions/getDataWeather';
import PermissionForLocation from "../../services/permitions/permitions";

let { fromJSON, getJSON} = Utils;

export class MainWeatherComponent extends Component {
    constructor(props) {
        super(props);
        this.tempKey = '@dataTemper:key';
    }
    componentDidMount = ()=>{
        this.getDataFromAsyncStorage();
        let isPermition = PermissionForLocation.hasLocationPermission();
        if( isPermition ){
            this.watchPosition();
        }
    }
    getDataFromAsyncStorage =()=>{
        let dataFromAsyncStorage = getFromAsyncStorage(this.tempKey);
        if(dataFromAsyncStorage){
            // let parseDataFromAS = fromJSON(dataFromAsyncStorage);
        }
        console.log("this.porps --->>>", this.props );
    }
    watchPosition = async ( ) => {
		console.log('watchPosition');        
		await Geolocation.getCurrentPosition(
			(position) => {
                let { getDataWeather } = this.props;
              console.log('Position -> ',position);
              getDataWeather(position.coords.latitude,position.coords.longitude);
			},
			(error) => {console.log(error)},
			{enableHighAccuracy: true, timeout: 10000, maximumAge: 3000}
		);
    }
    componentWillReceiveProps(nextProps,nextState){
        console.log("componentWillReceiveProps ---->   ",nextProps);
    }
    render() {
     return (
        <View style={styles.wrapper}>
            <Text>LOOOOOOOOLLLLL</Text>
        </View>
     )}
}

const mapStateToProps = state => ({
    dataWether: state.dataWetherReducer.dataWether,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDataWeather
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainWeatherComponent);