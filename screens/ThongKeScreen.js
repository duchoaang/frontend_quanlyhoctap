import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import moment from "moment";
import { PieChart, BarChart } from "react-native-gifted-charts";

import {
  Button,
  Card,
  DataTable,
  ProgressBar,
  MD3Colors,
} from "react-native-paper";

const formattedDate = (originalDate) => {
  return moment(originalDate).format("d/MM/YYYY");
};
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import SelectDropdown from "react-native-select-dropdown";
import { APIURL } from "../utils/APIconfig";

const ThongKeBang = (props) => {
  const tableHead = ["Điểm trung bình hệ 10", "Điểm trung bình hệ 4"];
  const tableData = [[props.diemTB.diemHe10, props.diemTB.diemHe4]];

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={tableHead}
          flexArr={[1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={tableData}
            flexArr={[1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </View>
  );
};
const styles = {
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { flex: 1 },
  row: { height: 28 },
  text: { textAlign: "center", fontSize: 16, color: "black" }, // Ví dụ: fontSize và color
};

export default function ThongKeScreen({ navigation }) {
  const [infoUser, setInfoUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dataSetScore, setDataSetScore] = useState([]);
  const apiUrl = `${APIURL}/api/v1/diemMonHoc/${infoUser.userId}`;
  const [token, setToken] = useState("");
  const [dataPoints, setDataPoints] = useState([0, 0, 0, 0]);
  const [labels, setLabels] = useState([1, 1, , 1, 1]);
  const [diemTB, setDiemTB] = useState({
    diemHe10: "",
    diemHe4: "",
  });
  const [listLabels, setListLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [barData, setbarData] = useState([]);
  const [pieChart, setPieChart] = useState([
    {
      value: 0,
      text: ">5",
    },
    {
      value: 0,
      text: "<5",
    },
  ]);
  const [mostScoreBarData, setmostScoreBarData] = useState();
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

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((storedData) => {
        if (storedData) {
          // console.log("Dữ liệu lấy ra từ AsyncStorage:", storedData);
          const parsedData = JSON.parse(storedData);
          // console.log("Dữ liệu đã được phân tích:", parsedData);
          setInfoUser(parsedData);
        } else {
          console.log("Không tìm thấy dữ liệu trong AsyncStorage.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lưu hoặc đọc dữ liệu từ AsyncStorage:", error);
      });
  }, []);

  const reLoad = () => {
    AsyncStorage.getItem("user")
      .then((storedData) => {
        if (storedData) {
          const parsedData = JSON.parse(storedData);

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
            console.log("data", response.data);
            setDataSetScore(response.data);
            return response.data;
          })
          .then((response2) => {
            const newDataPoints = [];
            const newLabels = [];

            const scoresLessThan5 = response2.filter(
              (item) => item.diem < 5
            ).length;
            console.log("be hon 5 ", scoresLessThan5);
            const scoresGreaterOrEqualTo5 = response2.filter(
              (item) => item.diem >= 5
            ).length;

            console.log("be hon 5 ", scoresGreaterOrEqualTo5);
            setPieChart([
              { value: scoresLessThan5, color: "#79D2DE", text: "< 5" },
              { value: scoresGreaterOrEqualTo5, color: "#ED6665", text: "> 5" },
            ]);


            response2.forEach((item) => {
              const diem = item.diem;
              const formattedTime = moment(item.thoiGian).format("d/MM/YYYY");
              newDataPoints.push(diem);
              newLabels.push(formattedTime);
            });

            setDataPoints(newDataPoints);
            setLabels(newLabels);
            setListLabels(newLabels);

            const total = newDataPoints.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
            const average = total / newDataPoints.length;

            setDiemTB({
              diemHe10: average,
              diemHe4: average,
            });
          });
      })
      .catch((error) => {
        // console.log("loix", error);

      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
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
            const dataFromAPI = response.data;
            const scoreCounts = {};
           
            const scoreNames = {};
            dataFromAPI.forEach((item) => {
              const score = item.diem;
              if (scoreCounts[score] === undefined) {
                scoreCounts[score] = 1;
                scoreNames[score] = item.tenMonHoc;
              } else {
                scoreCounts[score]++;
              }
            });
            const barDataTemp = Object.entries(scoreCounts).map(
              ([score, count]) => ({
                label: score.toString(),
                value: count,
              })
            );
            barDataTemp.sort(
              (a, b) => parseFloat(a.label) - parseFloat(b.label)
            );
            const mostScoreBarData = barDataTemp.sort(
              (a, b) => b.value - a.value
            );
            const mostFrequentScore = barData[0];
            setmostScoreBarData(mostFrequentScore);

            const pieDataTemp = Object.entries(scoreCounts).map(
              ([score, count]) => ({
                text: score.toString(),
                value: count,
              })
            );

           
  
            setbarData(barDataTemp);

            setDataSetScore(response.data);
            return response.data;
          })
          .then((response2) => {
            const newDataPoints = [];
            const newLabels = [];

            response2.forEach((item) => {
              const diem = item.diem;
              const formattedTime = moment(item.thoiGian).format("MM/YYYY");
              newDataPoints.push(diem);
              newLabels.push(formattedTime);
            });
          
            setDataPoints(newDataPoints);
            setLabels(newLabels);

            const total = newDataPoints.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );
            const average = total / newDataPoints.length;

            setDiemTB({
              diemHe10: average,
              diemHe4: average,
            });
          });
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text> // Hoặc hiển thị một phần tử tạm thời khác
      ) : (
        <ScrollView>
          <View>
            <Card>
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text variant="titleLarge" style={{ fontSize: "20px" }}>
                  <Text style={{ fontWeight: "300" }}>Xin chào: </Text>
                  <Text
                    style={{
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {infoUser.username}
                  </Text>{" "}
                </Text>
                <View style={{ alignItems: "flex-end" }}>
                  <Button
                    style={{
                      width: 200,
                      height: 40,
                      padding: 0,
                      right: 0,
                      backgroundColor: "#F0D600",
                      fontWeight: "800",
                    }}
                    icon=""
                    mode="contained"
                    onPress={reLoad}
                  >
                    Xem thống kê điểm
                  </Button>
                </View>
              </Card.Content>
            </Card>

            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Tên môn học</DataTable.Title>
                <DataTable.Title numeric>Số điểm</DataTable.Title>
                <DataTable.Title numeric>Thời gian</DataTable.Title>
              </DataTable.Header>

              {dataSetScore.slice(from, to).map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.tenMonHoc}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.diem}</DataTable.Cell>
                  <DataTable.Cell numeric>
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

            <View>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: "20",
                    marginLeft: 20,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Biểu đồ điểm số
                </Text>
                <Card>
                  <Card.Content></Card.Content>

                  <LineChart
                    data={{
                      labels: labels,
                      datasets: [
                        {
                          data: dataPoints,
                        },
                      ],
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#e26a00",
                      backgroundGradientFrom: "#22C0CA",
                      backgroundGradientTo: "#22C0CA",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        width: "90%",
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                  />
                </Card>

                <Text
                  style={{
                    fontSize: "20",
                    marginLeft: 20,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  Biểu đồ thống kê điểm trên 5 và dưới 5
                </Text>
                <Card>
                  <Card.Content>
                    {/* <Text variant="titleLarge">Biểu đồ điểm số</Text> */}
                  </Card.Content>
                  <View>
                    <PieChart
                      showText
                      textColor="black"
                      radius={150}
                      // style={{padding:'0'}}
                      textSize={20}
                      showTextBackground
                      textBackgroundRadius={50}
                      data={pieChart}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: "20px" }}>
                      <Button
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#ED6665",
                          borderRadius: "0",
                          width: 100,
                          height: 20,
                        }}
                      ></Button>
                      <Text style={{ fontWeight: "300" }}>Số điểm trên 5:</Text>{" "}
                      <Text style={{ fontWeight: "650", fontSize: "22px" }}>
                        {pieChart[1].value}
                      </Text>
                    </Text>
                    <Text style={{ fontSize: "20px" }}>
                      <Button
                        style={{
                          border: "1px solid black",
                          backgroundColor: "#79D2DE",
                          borderRadius: "0",
                          width: 100,
                         
                      height: 20,
                        }}
                      ></Button>
                      <Text style={{ fontWeight: "300" }}>Số điểm dưới 5:</Text>{" "}
                      <Text style={{ fontWeight: "650", fontSize: "22px" }}>
                        {pieChart[0].value}
                      </Text>
                    </Text>
                  </View>
                </Card>
              </View>

              <Button
                outlined="theme.colors.primary"
                onPress={() => navigation.navigate("DetailScreen")} // Điều hướng đến màn hình "Detail"
              >
                {" "}
                Xem thêm
              </Button>
            </View>
            <ThongKeBang diemTB={diemTB} />
          </View>
        </ScrollView>
      )}
    </>
  );
}
