import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { Alert } from "react-native";

const SettingScreen = ({navigation}) => {
  const handleLogout = () => {
    // console.log("click");
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("token");
    Alert.alert("Logout thành công!");
    navigation.navigate("Login");
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View
            style={{
              height: 40,
              backgroundColor: "rgba(0,0,0,0.2)",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: '13px', paddingStart: 10, color: 'red' }}>
              Common
            </Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate("Profile")} >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Entypo
                style={{ marginStart: 10 }}
                size="20"
                name="help-with-circle"
              />
              <Text style={{ marginLeft: 10, fontSize: '16px' }}>Profile</Text>
              <View style={{ flex: 1 }}></View>
              <AntDesign
                name="right"
                style={{ paddingEnd: 10, opacity: "0.3" }}
                size="20"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Entypo
                style={{ marginStart: 10 }}
                size="20"
                name="help-with-circle"
              />
              <Text style={{ marginLeft: 10, fontSize: '16px' }}>Help</Text>
              <View style={{ flex: 1 }}></View>
              <AntDesign
                name="right"
                style={{ paddingEnd: 10, opacity: "0.3" }}
                size="20"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Entypo style={{ marginStart: 10 }} size="20" name="mail" />
              <Text style={{ marginLeft: 10, fontSize: "16px" }}>Email</Text>
              <View style={{ flex: 1 }}></View>
              <AntDesign
                name="right"
                style={{ paddingEnd: 10, opacity: "0.3" }}
                size="20"
              />
            </View>
          </TouchableOpacity>
          
          <View
            style={{
              height: 40,
              backgroundColor: "rgba(0,0,0,0.2)",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: "13px", paddingStart: 10, color: "red" }}>
              Account
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Entypo style={{ marginStart: 10 }} size="20" name="log-out" />
              <Text style={{ marginLeft: 10, fontSize: "16px" }}>Login</Text>
              <View style={{ flex: 1 }}></View>
              <AntDesign
                name="right"
                style={{ paddingEnd: 10, opacity: "0.3" }}
                size="20"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
          <View
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Entypo style={{ marginStart: 10 }} size="20" name="log-out" />
              <Text style={{ marginLeft: 10, fontSize: "16px" }}>Logout</Text>
              <View style={{ flex: 1 }}></View>
              <AntDesign
                name="right"
                style={{ paddingEnd: 10, opacity: "0.3" }}
                size="20"
              />
            </View>
          
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default SettingScreen;
