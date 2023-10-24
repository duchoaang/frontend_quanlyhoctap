import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { DataTable, Card, Button } from "react-native-paper";

import SelectDropdown from "react-native-select-dropdown";
import { APIURL } from "../utils/APIconfig";
function DetailScreen({ navigation }) {
  const [filteredData, setFilteredData] = useState([]);
  const [infoUser, setInfoUser] = useState("");
  const countries = ["6", "7", "8", "9", "10"];
  const [diemMucTieu, setDiemMucTieu] = useState(8);
  const [diemCanCaiThien, setDiemCanCaiThien] = useState(0);
  const apiUrl = `${APIURL}/api/v1/diemMonHoc/${infoUser.userId}`;
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const formattedDate = (originalDate) => {
    return moment(originalDate).format("d/MM/YYYY");
  };
  const [items] = useState([
    {
      key: 1,
      name: "Cupcake",
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: "Eclair",
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: "Frozen yogurt",
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: "Gingerbread",
      calories: 305,
      fat: 3.7,
    },
  ]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const reLoad = () => {
    AsyncStorage.getItem("user")
      .then((storedData) => {
        if (storedData) {
          console.log("Dữ liệu lấy ra từ AsyncStorage:", storedData);
          const parsedData = JSON.parse(storedData);
          console.log("Dữ liệu đã được phân tích:", parsedData);
          setInfoUser(parsedData);
        } else {
          Alert.alert("Vui lòng đăng nhập để xem thống kê");
          console.log("Không tìm thấy dữ liệu trong AsyncStorage.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lưu hoặc đọc dữ liệu từ AsyncStorage:", error);
      });

    AsyncStorage.getItem("token")
      .then((item) => {
        return item;
      })
      .then((resToken) => {
        axios
          .get(apiUrl, {
            headers: {
              Authorization: "Bearer " + resToken,
            },
          })
          .then((response) => {
            console.log(response.data);
            const filteredDataTemp = response.data.filter(
              (item) => item.diem < 5
            );
            // console.log(filteredDataTemp);
            setFilteredData(filteredDataTemp);
            return response.data;
          })
          .then((response2) => {
            const newDataPoints = [];
            const newLabels = [];

            response2.forEach((item) => {
              const diem = item.diem;
              const formattedTime = moment(item.thoiGian).format("d/MM/YYYY");
              newDataPoints.push(diem);
              newLabels.push(formattedTime);
            });

            const total = newDataPoints.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
            const average = total / newDataPoints.length;
            console.log(" trung binh", average);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        const monHocDuoi5 = filteredData.filter((item) => item.diem < 5.0);
        const totalDiemDuoi5 = monHocDuoi5.reduce(
          (accumulator, item) => accumulator + item.diem,
          0
        );
        const totalDiem = filteredData.reduce(
          (accumulator, item) => accumulator + item.diem,
          0
        );
        const trungBinhHienTai = totalDiem / filteredData.length;

        const diemMongMuon = diemMucTieu * filteredData.length;
        const diemCanCaiThien = diemMongMuon - totalDiem + totalDiemDuoi5;

        setDiemCanCaiThien(diemCanCaiThien);
      });
  };
  console.log("Diem thap: ", filteredData);
  const tinhDiemCaiThien = () => {};

  return (
    <ScrollView>
      <View>
        <Card>
          <Card.Content>
            <Text
              variant="titleLarge"
              style={{
                textAlign: "center",
                fontWeight: "700",
                
              }}
            >
              Các nội dung cần cải thiện
            </Text>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tên môn học</DataTable.Title>
                <DataTable.Title numeric>Số điểm</DataTable.Title>
                <DataTable.Title numeric>Thời gian</DataTable.Title>
              </DataTable.Header>

              {filteredData.slice(from, to).map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.tenMonHoc}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.diem}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {" "}
                    {formattedDate(item.thoiGian)}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(items.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${items.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={"Trang"}
              />
            </DataTable>
            <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: '19px' }}>
            Số điểm cần cải thiện để có thể đạt trung bình là {diemMucTieu} điểm là :{" "}
            {diemCanCaiThien} điểm
          </Text>
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem);
              setDiemMucTieu(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.goBack()}>Quay lại</Button>
            <Button onPress={reLoad}>Xem thống kê</Button>
          </Card.Actions>
        </Card>
        <Card>
         
        </Card>
       
        
        {/* <Button title="Quay lại" } /> */}
      </View>
    </ScrollView>
  );
}

export default DetailScreen;
