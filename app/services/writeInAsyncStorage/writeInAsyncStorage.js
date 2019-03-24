import { AsyncStorage } from 'react-native';
export const writeInAsyncStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
    }
}

export const getFromAsyncStorage = async (key) => {
    let result = '';
    try {
        result = await AsyncStorage.getItem(key);
    } catch (error) {
    }
    return result;
}