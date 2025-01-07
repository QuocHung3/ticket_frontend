import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState,useContext, useEffect } from "react";
import axios from "axios";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import { Ionicons } from "@expo/vector-icons";
import APP_COLORS from "../../constants/color";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import Toast from "react-native-toast-message";

const ChoosePickUpDropOff = () => {
  const {data,setData} =  useContext(DataContext);
  const navigation = useNavigation<navigation<"ChoosePickUpDropOff">>();
  const [dataDiemDen,setDataDiemDen] = useState([]);
  const [diemDon,setDiemDon] = useState("");
  const [diemTra,setDiemTra] = useState("");
  const [selection, setSelection] = useState('option1');
  const [selectionT, setSelectionT] = useState('option1');
  const [diemDonC,setDiemDonC] = useState("");
  const [diemTraC,setDiemTraC] = useState("");


  useEffect(() => {
    try {
      setDiemTra("");

      axios.post('http://192.168.31.45:9999/api/DiaDiem',{diaDiem: diemDon ? data["noiDi"] : data["noiDen"]})
      .then(response => {
        if(response && response.data) {
          console.log(response.data.data)
          setDataDiemDen(response.data.data)
        }
      })
      .catch(error => {
        console.error("Lỗi :", error);
      });
    } catch (error) {
      console.log(error)
    }
  },[diemDon])

  const handleConfirmDestination = () => {

    let traTai = "Số 27 Nguyễn Tường Phổ, Hoà Minh , Liên Chiểu, Đà Nẵng.";
    let donTai = "Thôn 3, Krông Jing, M'ĐrắK, Đắk Lắk.";
    if(selection === "option1") {
      if(!diemDonC) {
        Toast.show({type:'error', text1: "Nhập đủ thông tin đón/trả"})
      return;
      }
      
      donTai = diemDonC;
    }
    if(selectionT === "option1") {
      if(!diemTraC) {
        Toast.show({type:'error', text1: "Nhập đủ thông tin đón/trả"})
        return;
      }
      traTai = diemTraC;
    }
    if(!diemDon || !diemTra) {
      Toast.show({type:'error', text1: "Nhập đủ điểm đón, trả"})
      return;
    }
    if(!diemDon || !diemTra) {
      Toast.show({type:'error', text1: "Nhập đủ điểm đón, trả"})
      return;
    }
    setData({...data,diemDonV: diemDon,diemTraV:diemTra,donTaiV: donTai,traTaiV: traTai});

    navigation.navigate("BookingInfomation")
  };
  return (
    <View style={styles.container}>
      <Header title="Chọn điểm đón / trả chuyến đi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <BookingStep currentStep={2} />
          <View style={styles.pickupSection}>
            <View>
              <View>
                <Text style={styles.chooseTypeButtonText}>Điểm đón</Text>
                <Text style={styles.chooseTypeButtonAddress}>
                  {diemDon || "Chọn điểm đón ..."}
                </Text>
                
                {diemDon && 
                <View style={styles.clearContainer}>
                  <Text onPress={() => setDiemDon("")} style={styles.clearButton}>X</Text>
                    <View style={styles.radioGroup}>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setSelection('option1')}
                      >
                        <View style={[styles.circle, selection === 'option1' && styles.selected]} />
                        <Text style={styles.radioText}>Địa chỉ đón cụ thể</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setSelection('option2')}
                      >
                        <View style={[styles.circle, selection === 'option2' && styles.selected]} />
                        <Text style={styles.radioText}>Đón tại nhà xe</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.output}>
                      {selection === 'option1' ? (
                        <TextInput
                          style={styles.input}
                          onChangeText={(text) => setDiemDonC(text)}
                          value={diemDonC}
                          placeholder="Nhập nội dung..."
                          placeholderTextColor="#999"
                        />
                      ) : (
                        <Text style={styles.textOutput}>Địa chỉ: Địa chỉ: Thôn 3, Krông Jing, M'ĐrắK, Đắk Lắk.</Text>
                      )}
                    </View>
                </View>
                }
              </View>
              {diemDon && 
                <View>
                <Text style={styles.chooseTypeButtonText}>Điểm trả</Text>
                <Text style={styles.chooseTypeButtonAddress}>
                  {diemTra || "Chọn điểm trả ..."} 
                </Text>
                <View style={styles.clearContainer}>
                <Text onPress={() => setDiemTra("")} style={styles.clearButton}>X</Text>
                <View style={styles.radioGroup}>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setSelectionT('option1')}
                      >
                        <View style={[styles.circle, selectionT === 'option1' && styles.selected]} />
                        <Text style={styles.radioText}>Địa chỉ dừng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setSelectionT('option2')}
                      >
                        <View style={[styles.circle, selectionT === 'option2' && styles.selected]} />
                        <Text style={styles.radioText}>Dừng tại nhà xe</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.output}>
                      {selectionT === 'option1' ? (
                        <TextInput
                          style={styles.input}
                          onChangeText={(text) => setDiemTraC(text)}
                          value={diemTraC}
                          placeholder="Dừng tại..."
                          placeholderTextColor="#999"
                        />
                      ) : (
                        <Text style={styles.textOutput}>Số 27 Nguyễn Tường Phổ, Hoà Minh , Liên Chiểu, Đà Nẵng.</Text>
                      )}
                    </View>
                </View>
                
              </View>
              }
            </View>
            

            <Text style={styles.listTitle}>
              Danh sách điểm đón
            </Text>

            {dataDiemDen && dataDiemDen.map((point, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.pointItem}
                  onPress={() => diemDon ? setDiemTra(point.TenQuanHuyen) : setDiemDon(point.TenQuanHuyen)}
                >
                  <View style={styles.pointLeft}>
                    <Ionicons
                      name="location"
                      size={24}
                      color={APP_COLORS.primary}
                    />
                    <View style={styles.pointInfo}>
                      <Text style={styles.pointName}>{point.TenTinhThanh}</Text>
                      <Text style={styles.pointAddress}>{point.TenQuanHuyen}</Text>
                    </View>
                  </View>
                  <Text style={styles.pointTime}>{point.time}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.continueButtonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => handleConfirmDestination()}
        >
          <Text style={styles.continueText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChoosePickUpDropOff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pickupSection: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: APP_COLORS.primary,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#666",
  },
  searchIcon: {
    marginLeft: 10,
  },
  listTitle: {
    fontSize: 18,

    color: "#333",
    marginBottom: 12,
  },
  pointItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  pointLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  pointInfo: {
    marginLeft: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#007BFF',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  output: {
    width: '100%',
    alignItems: 'center',
  },
  clearContainer: {
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  textOutput: {
    fontSize: 16,
    color: '#333',
  },
  pointName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  pointAddress: {
    fontSize: 16,
    color: "#666",
  },
  pointTime: {
    fontSize: 14,
    color: "#666",
  },
  continueButton: {
    backgroundColor: APP_COLORS.primary,
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  continueButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  chooseTypeButton: {
    borderRadius: 8,
    borderColor: APP_COLORS.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
    gap: 4,
    marginBottom: 12,
  },
  chooseTypeButtonText: {
    fontSize: 18,
    color: APP_COLORS.primary,
  },
  chooseTypeButtonAddress: {
    fontSize: 18,
    backgroundColor: APP_COLORS.lightGray,
    padding:10,
  },
  clearButton: {
    width: 200,
    textAlign: 'center',
    marginVertical: 10,
    color: APP_COLORS.white,
    backgroundColor: APP_COLORS.primary,
    padding: 10,
  }
});

