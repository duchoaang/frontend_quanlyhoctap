import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Button, Card, TextInput } from "react-native-paper";
import axios from "axios";
import { APIURL } from "../utils/APIconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";



 const BaiTapDetails = ({ route, navigation }) => {
  const [dapAn, setDapAn] = useState("");
  const {item, infoUser} = route.params; 
  const [formNopBai, setFormNopBai] = useState({
    'idNguoiDung': '',
    'idBaiTap:': item.id
  });
  console.log("from", formNopBai)
  // console.log("props", infoUser);
  console.log(dapAn);

  const handleNopBai = () => {
    if (dapAn === item.dapAn) {
      Alert.alert('Chúc mừng!', 'Đáp án của bạn chính xác.');
      // setFormNopBai({
      //   '...formNopBai,
      //   'idNguoiDung': infoUser.userId,'
      // })  
   
      AsyncStorage.getItem('token')
      .then((resToken) => {
        
      
        axios
          .post(`${APIURL}/api/v1/diemBaiTap`, {
            'idNguoiDung': infoUser.userId,
            'idBaiTap': item.id
          }, {
            headers: {
              Authorization: 'Bearer ' + resToken,
            
            },
          })
          .then((response) => {
            // Xử lý khi đã gửi thành công
            console.log('Gửi thông tin thành công:', response.data);
          })
          .catch((error) => console.error(error));
      });



      // axios.post(`${APIURL}/api/v1/diemBaiTap`, )
      console.log(infoUser);
      setDapAn("");
    } else {
      Alert.alert('Thông báo', 'Đáp án của bạn không chính xác. Vui lòng kiểm tra lại.');
    }
  };

  return (
    <>
     
      <View></View>
      <Card>
        <Card.Content>
          <View style={styles.title}>
          <Text style={{fontSize:20, fontWeight:600}}>{item.tenBaiTap}</Text>
          </View>
          <Text>{item.noiDung}</Text>
          
          <TextInput
            label="Đáp án của bạn"
            value={dapAn}
            onChangeText={(text) => setDapAn(text)}
          />
          <Card.Actions>
            <Button onPress={() => navigation.goBack()}>Quay lại</Button>
            <Button onPress={handleNopBai}>Nộp bài</Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
    tenMonHoc: {
      fontSize: "16px",
    },
    maMonHoc: {
      fontSize: "15px",
    },
    item: {},
    title: {
      fontSize: 25,
      justifyContent: "center",
      alignItems: "center",
      
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "nowrap",
    },
  });
  

export default BaiTapDetails;
