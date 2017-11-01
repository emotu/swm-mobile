/**
 * Auth.js
 * This will be responsible for managing authentication with the state of the application in view.
 */

import { AsyncStorage } from 'react-native'


export async function isAuthenticated() {
    const authToken = await AsyncStorage.getItem('__xcred');
    if(authToken) {
        return true;
    }
    return false;

}

export async function loginUser(authToken) {

    try {
        const res = await AsyncStorage.setItem('__xcred', authToken);
    } catch (error) {
        // An error occured here. It should do something
    }
}

export async function logoutUser(purge = false) {
    try {
        const res = await AsyncStorage.removeItem('__xcred');
    } catch (error) {
        // An error occured here. It should do something
    }
}

export async function getAuthHeaders() {

    let __xcred = await AsyncStorage.getItem('__xcred');
    
    if(__xcred) {
        return {
            'X-Request-With': 'XMLHttpRequest',
            'Authorization': `${__xcred}`,
        };
    }

    return {
        'X-Request-With': 'XMLHttpRequest',
    };
}
