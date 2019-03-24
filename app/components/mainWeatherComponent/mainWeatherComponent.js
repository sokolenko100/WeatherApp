import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles';
import { getFromAsyncStorage } from '../../services/writeInAsyncStorage/writeInAsyncStorage';
import Utils from '../../services/utils/utils';

let { fromJSON, getJSON} = Utils;

export class MainWeatherComponent extends Component {
    constructor(props) {
        super(props);
        this.tempKey = '@email:key';
    }
    componentDidMount = ()=>{
        this.getDataFromAsyncStorage();
    
    }
    getDataFromAsyncStorage =()=>{
        let dataFromAsyncStorage = getFromAsyncStorage(this.tempKey);
        if(dataFromAsyncStorage){
            // let parseDataFromAS = fromJSON(dataFromAsyncStorage);
        }
        console.log("this.porps --->>>", this.props );
    }
    render() {
     return (
          <View style={styles.wrapper}>
            <Text>LOOOOOOOOLLLLL</Text>
        </View>
     )}
}

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainWeatherComponent);