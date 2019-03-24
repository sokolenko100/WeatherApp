import { Platform } from 'react-native';



const checkIsIOS = () => {
    return Platform.OS === "ios" ? true : false;
}

const getJSON = (str) => {
    let result = "";
    if (str) {
        result = JSON.stringify(str);
    }
    return result;
}
const fromJSON = (str) => {
    let result = "";
    if (str) {
        result = JSON.parse(str);
    }
    return result;
}
const Utils = {
    isIOS: checkIsIOS(),
    fromJSON,
    getJSON,
};

export default Utils;
