import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { APIURL } from "../utils/APIconfig";
import axios from "axios";
import AntDesign from "react-native-vector-icons/Ionicons";
export default function HomeScreen({ navigation }) {
  const [listThongBao, setListThongBao] = useState([]);

  const apiUrl = `${APIURL}/api/v1/thongbao`;

  const handleThongBao = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setListThongBao(data);
      })
      .catch((err) => {});
  };

  const navigateToHomework = () => {
    navigation.navigate("Homeworks");
  };

  const handleItemPress = () => {
    // Xử lý khi người dùng nhấn vào một mục trong danh sách thông báo
    // Điều hướng đến trang Homework hoặc thực hiện hành động mong muốn
    navigateToHomework(); // Chuyển hướng đến trang Homework, bạn có thể sửa lại cho phù hợp với nhu cầu của bạn
  };

  return (
    <View>
      <Button
        style={{
          width: 200,
          height: 40,
          padding: 0,
          right: 0,
          backgroundColor: "#F0D600",
          fontWeight: "800",
        }}
        mode="contained"
        onPress={handleThongBao}
      >
        Xem thông báo mới nhất
      </Button>
      <ScrollView>
      {listThongBao.length > 0 ? (
        listThongBao.map((thongbao, index) => (
          <TouchableOpacity key={index} onPress={handleItemPress}>
            <Card style={{ flexDirection: "row" }}>
              <Card.Content>
                <View style={{ flexDirection: "row" }}>
                  <AntDesign
                    name="notifications-circle"
                    style={{ paddingEnd: 10, opacity: "1" }}
                    size="25"
                  />
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {thongbao.title}
                  </Text>
                </View>
                <Text style={{ fontSize: 14, marginLeft: "20px" }}>
                  {thongbao.content}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Không có thông báo.</Text>
      )}
      </ScrollView>
  
    </View>
  );
}
