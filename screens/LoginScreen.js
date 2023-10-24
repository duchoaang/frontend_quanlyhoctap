// import { TextInput } from 'react-native-paper';
import { useState } from "react";

import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { APIURL } from "../utils/APIconfig";
import { useEffect } from "react";
export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [infoLogin, setInfoLogin] = useState({
    username: "",
    password: "",
  });
  const [infoUser, setInfoUser] = useState({});
  const [token, setToken] = useState("");
  

  useEffect(() => {
    const user = AsyncStorage.getItem('user')
    if(user!==null) {
      navigation.navigate("Home")
    }
  
  }, [])
  const handleLogin = () => {
  
    axios
      .post(`${APIURL}/api/v1/users/login`, infoLogin)
      .then((res) => {
        AsyncStorage.setItem("token", res.data);
        console.log(res.data);
        const decoded = jwt_decode(res.data);
        console.log("decode", decoded);
        setInfoUser(decoded);
        console.log(JSON.stringify(decoded));
        const jsonString = JSON.stringify(decoded);
        AsyncStorage.setItem("user", jsonString)
          .then(() => {
            console.log("Dữ liệu đã được lưu vào AsyncStorage.");
            return AsyncStorage.getItem("user");
          })
          .then((storedData) => {
            if (storedData) {
              console.log("Dữ liệu lấy ra từ AsyncStorage:", storedData);
              const parsedData = JSON.parse(storedData);
              console.log("Dữ liệu đã được phân tích:", parsedData);
            } else {
              console.log("Không tìm thấy dữ liệu trong AsyncStorage.");
            
            }
            Alert.alert("Login success")
            navigation.navigate("Home");
          })
          .catch((error) => {
            Alert.alert("Login failed");
            console.error(
              "Lỗi khi lưu hoặc đọc dữ liệu từ AsyncStorage:",
              error
            );
          })
          .finally(setIsLogin(true));
      })
      .catch((error) => {
        Alert.alert("Mật khẩu không đúng");
        console.error("API Error:", error);
      });
  };
  console.log(infoUser);
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/btplogo.png")} /> 
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username."
            placeholderTextColor="#003f5c"
            onChangeText={(username) =>
              setInfoLogin({
                username: username,
                password: infoLogin.password,
              })
            }
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) =>
              setInfoLogin({
                username: infoLogin.username,
                password: password,
              })
            }
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    marginTop: 80,
  },
  image: {
    height:80,
    width:80,
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#89DFF4",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#0791B2",
  },
});
