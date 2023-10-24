// import AppNavigator from "../screens/AppNavigator";
import BaiTapScreen from "../screens/BaiTapScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ThongKeScreen from "../screens/ThongKeScreen";
import DetailScreen from "../screens/DetailsScreen";
import BaiTapDetail from "../screens/BaiTapDetail";
import SettingScreen from "../screens/SettingScreen";
import ProfileScreen from "../screens/ProfileScreen";

const screens = [
    {
        name: 'Login',
        component: LoginScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: true,
        
    },
    {
        name: 'Home',
        component: HomeScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: false,
        tabIconName: 'home',
        tabIconSize: 30
    },
    {
        name: 'Homeworks',
        component: BaiTapScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: false,
        tabIconName: 'book',
        tabIconSize: 30
    },
    {
        name: 'ThongKe',
        component: ThongKeScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: false,
        tabIconName: 'barchart',
        tabIconSize: 30
    },
    {
        name: 'DetailScreen',
        component: DetailScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: true,
        tabIconName: 'barchart',
        tabIconSize: 30
    },
    {
        name: 'Homework',
        component: BaiTapDetail,
        activeColor: '#ee4b2b',
        isHideTabItem: true,
        tabIconName: 'barchart',
        tabIconSize: 30
    },
    {
        name: 'Setting',
        component: SettingScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: false,
        tabIconName: 'setting',
        tabIconSize: 30
    },
    {
        name: 'Profile',
        component: ProfileScreen,
        activeColor: '#ee4b2b',
        isHideTabItem: true,
        tabIconName: 'profile',
        tabIconSize: 30
    },
]
export default screens;