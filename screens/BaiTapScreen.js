import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import {
  ScrollView,
  View,
  Alert,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Card, DataTable } from "react-native-paper";
import { APIURL } from "../utils/APIconfig";
export default function BaiTapScreen({ navigation }) {
  const [listBaiTap, setListBaiTap] = useState([]);
  const [infoUser, setInfoUser] = useState([]);
  const [listBaiTapDaLam, setListBaiTapDaLam] = useState([]);
  const [baiTapChuaLam, setBaiTapChuaLam] = useState([]);
  const [currentPage, setCurrentPage] = useState(8);
  const totalPages = 20;
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList, setNumberOfItemsPerPageList] = useState([
    2, 3, 4, 5, 6, 7, 9, 10, 11,
  ]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [items, setItem] = useState([
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
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    axios
      .get(`${APIURL}/api/v1/baiTap`)
      .then((response) => {
        setListBaiTap(response.data);
        setItem(response.data);

        console.log(response.data.length);
      })
      .catch();

    AsyncStorage.getItem("user")
      .then((storedData) => {
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          setInfoUser(parsedData);
          AsyncStorage.getItem("token")
            .then((item) => {
              return item;
            })
            .then((resToken) => {
              return axios.get(
                `${APIURL}/api/v1/diemBaiTap/${infoUser.userId}`,
                {
                  headers: {
                    Authorization: "Bearer " + resToken,
                  },
                }
              );
            })
            .then((response) => {
              setListBaiTapDaLam(response.data);
            })
            .catch((error) => {});
        } else {
          Alert.alert("Vui lòng đăng nhập để làm bài tập");
        }
      })
      .catch((error) => {});
  }, []);

  const reload = () => {
    AsyncStorage.getItem("user")
      .then((storedData) => {
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          setInfoUser(parsedData);
          AsyncStorage.getItem("token")
            .then((item) => {
              return item;
            })
            .then((resToken) => {
              return axios.get(
                `${APIURL}/api/v1/diemBaiTap/${infoUser.userId}`,
                {
                  headers: {
                    Authorization: "Bearer " + resToken,
                  },
                }
              );
            })
            .then((response) => {
              setListBaiTapDaLam(response.data);
            })
            .catch((error) => {});
        } else {
          Alert.alert("Vui lòng đăng nhập để xem bài tập");
        }
      })
      .catch((error) => {})
      .finally(() => {
        const baiTapChuaLamData = listBaiTap.filter((baiTap) => {
          const baiTapDaLam = listBaiTapDaLam.find(
            (item) => item.tenMonHoc === baiTap.tenBaiTap
          );

          return !baiTapDaLam;
        });
        setBaiTapChuaLam(baiTapChuaLamData);
      });

    // AsyncStorage.getItem("user")
    //   .then((storedData) => {
    //     if (storedData) {
    //       console.log("Dữ liệu lấy ra từ AsyncStorage:", storedData);
    //       const parsedData = JSON.parse(storedData);
    //       console.log("Dữ liệu đã được phân tích:", parsedData);
    //       setInfoUser(parsedData);
    //       return storedData;
    //     } else {
    //       console.log("Không tìm thấy dữ liệu trong AsyncStorage.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi khi lưu hoặc đọc dữ liệu từ AsyncStorage:", error);
    //   });
    //   AsyncStorage.getItem("token")
    //   .then((item) => {
    //   console.log(infoUser)

    //     return item;
    //   })
    //   .then((resToken) => {
    //     axios
    //       .get(`${APIURL}/api/v1/diemBaiTap/${infoUser.userId}`, {
    //         headers: {
    //           Authorization: "Bearer " + resToken,
    //         },
    //       })

    //       .then((response) => {
    //         console.log(response.data);
    //         setListBaiTapDaLam(response.data);
    //         return response.data;
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <Card.Actions>
        <Button onPress={reload}>Tất cả bài tập</Button>
        <Button onPress={reload}>Bài tập đã làm </Button>
      </Card.Actions>
      
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={2}
          style={{ marginTop: 10 }}
          data={baiTapChuaLam.slice(from, to)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Homework", {
                  item: item,
                  infoUser: infoUser,
                });
              }}
            >
              <View
                style={{
                  flex: 0.5,
                  height: 200,
                  marginLeft: index % 2 === 0 ? 10 : 0,
                  marginRight: 10,
                  marginBottom: 5,
                  borderRadius: 5,
                  borderColor: "#DCDCDC",
                  borderWidth: 1,
                }}
              >
                <Text style={styles.title}>{item.tenBaiTap}</Text>
                <View>
                  <View
                    style={[styles.row, { marginBottom: 15, marginTop: 10 }]}
                  >
                    <AntDesign name="book" size={15} />
                    <Text style={styles.tenMonHoc}>
                      Môn học: {item.monHoc.tenMonHoc}
                    </Text>
                  </View>
                  <View style={[styles.row, { marginBottom: 15 }]}>
                    <AntDesign name="export" size={15} />
                    <Text style={styles.maMonHoc}>
                      Mã môn học: {item.monHoc.maMonHoc}
                    </Text>
                  </View>
                </View>

                <View>
                  <Text style={styles.maMonHoc}>
                    GV: {item.monHoc.giangVien.tenGiangVien}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
      <DataTable>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  tenMonHoc: {
    fontSize: 16,
  },
  maMonHoc: {
    fontSize: 15,
  },
  item: {},
  title: {
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
});
