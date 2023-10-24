import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'userToken';

export const saveTokenToStorage = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Lỗi khi lưu token: ', error);
    }
};

export const getTokenFromStorage = async () => {
    try {
        const userToken = await AsyncStorage.getItem(TOKEN_KEY);
        return userToken;
    } catch (error) {
        console.error('Lỗi khi truy xuất token: ', error);
    }
};

export const removeTokenFromStorage = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error('Lỗi khi xóa token: ', error);
    }
};