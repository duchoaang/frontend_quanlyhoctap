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
} from "react-native";
import axios from "axios";
import { APIURL } from "../utils/APIconfig";
import { DataTable, Card } from "react-native-paper";
import { useState, useEffect } from "react";
import moment from "moment";
import { Avatar } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
export default function ProfileScreen() {
  const apiUrl = `${APIURL}/api/v1/users/3`;

  const [infoUser, setInfoUser] = useState({
    mssv: "",
    name: "",
    username: "",
    email: "",
    ngayThamGia: "",
  });
  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoidXNlcjMiLCJzdWIiOiJ1c2VyMyIsImV4cCI6MTY5OTU5ODE0NX0.ScgGrySBAbLGqo14qvh1_wHnIqDUb3KTFrDU7cfYno0",
        },
      })
      .then((response) => {
        console.log(response.data);
        setInfoUser({
          mssv: response.data.mssv,
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          ngayThamGia: response.data.ngayThamGia,
        });
      });
  }, []);
  return (
    <View>
      <Card>
        <Card.Content>
          <Avatar.Image
            style={{
              justifyContent: "center",
              alignContent: "center",
              marginLeft: 130,
            }}
            size={100}
            source={require("../assets/user.png")}
          />
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <AntDesign
              name="user"
              style={{ paddingEnd: 10, opacity: "1" }}
              size="25"
            />
            <Text
              style={{ fontSize: 20, justifyContent: "center", marginTop: 20 }}
            >
              Mã số sinh viên: {infoUser.mssv}
            </Text>
          </View>
          <View  style={{flexDirection:'row', alignItems:'center'}}>
            <AntDesign
              name="smileo"
              style={{ paddingEnd: 10, opacity: "1" }}
              size="25"
            />
            <Text style={{ fontSize: 20, alignItems: "center", marginTop: 20 }}>
              Tên sinh viên: {infoUser.name}
            </Text>
          </View>

          <View  style={{flexDirection:'row', alignItems:'center'}}>
            <AntDesign
              name="google"
              style={{ paddingEnd: 10, opacity: "1" }}
              size="25"
            />
            <Text style={{ fontSize: 20, alignItems: "center", marginTop: 20 }}>
              Email sinh viên: {infoUser.email}
            </Text>
          </View>

          <View  style={{flexDirection:'row', alignItems:'center'}}>
            <AntDesign
              name="contacts"
              style={{ paddingEnd: 10, opacity: "1" }}
              size="25"
            />
            <Text style={{ fontSize: 20, alignItems: "center", marginTop: 20 }}>
              Tên tài khoản: {infoUser.username}
            </Text>
          </View>

          <View  style={{flexDirection:'row', alignItems:'center'}}>
            <AntDesign
              name="dashboard"
              style={{ paddingEnd: 10, opacity: "1" }}
              size="25"
            />
            <Text style={{ fontSize: 20, alignItems: "center", marginTop: 20 }}>
              Ngày tham gia: {moment(infoUser.thoiGian).format("dd/MM/YYYY")}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
