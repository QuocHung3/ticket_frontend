import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef ,useContext, useEffect} from "react";
import { DataContext } from "../../App";
import Header from "../../components/common/Header";
import BookingStep from "./components/BookingStep";
import APP_COLORS from "../../constants/color";
import { AntDesign } from "@expo/vector-icons";
import SeatItem from "./components/SeatItem";
import TripOverviewHeader from "./components/TripOverviewHeader";
import TripOverviewBottomSheet from "./components/TripOverviewBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import axios from "axios";

const NUM_SEAT_FLOOR_2 = 17;

const SelectSeats = () => {
  const {data,setData}= useContext(DataContext);
  const navigation = useNavigation<navigation<"BookingStack">>();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const tripOverviewBottomSheetRef = useRef<BottomSheetModal>(null);
  const [vtChoDuoi,setVTChoDuoi] = useState([])
  const [vtChoTren,setVTChoTren] = useState([])

  useEffect(() => {
    try {
      axios.post('http://192.168.31.45:9999/api/AllVTCho',{idChuyen:data["idChuyen"]})
      .then(response => {
        if(response && response.data) {
          response.data.data.forEach(seat => {
            if (seat.viTriCho.startsWith('D')) {
              setVTChoDuoi(prevVtChoDuoi => [...prevVtChoDuoi, seat]);
            } else {
              setVTChoTren(prevVtChoTren => [...prevVtChoTren, seat]);
            }
          });
        }
        
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.log(error)
    }
  },[])

  const handleOpenTripOverviewBottomSheet = () => {
    tripOverviewBottomSheetRef.current?.present();
  };

  const handleSelectSeat = (seatName: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatName)
        ? prev.filter((seat) => seat !== seatName)
        : [...prev, seatName]
    );
  };

  const handleConfirmSeats = () => {
    setData({...data,viTriCho: selectedSeats,giaVe: selectedSeats?.length * 350000})
    console.log(data)
    navigation.navigate("ChoosePickUpDropOff");
  }

  return (
    <View style={styles.container}>
      <Header title="Chọn Ghế Chuyến Đi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <BookingStep currentStep={1} />
        </View>
        <View style={styles.status}>
          <View style={styles.statusItem}>
            <View style={styles.statusItemIconSoldOut}>
              <AntDesign name="close" size={16} color={APP_COLORS.gray} />
            </View>
            <Text style={styles.statusItemText}>Đã bán</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={styles.statusItemIconSelected} />
            <Text style={styles.statusItemText}>Đang chọn</Text>
          </View>
        </View>
        <View style={styles.status}>
          <View style={styles.statusItem}>
            <View style={styles.statusItemIconPrice} />
            <View>
              <Text style={styles.statusItemText}>Giá</Text>
              <Text style={styles.statusItemPrice}>350.000 đ</Text>
            </View>
          </View>
        </View>

        <View style={styles.floorContainer}>
          <View style={styles.floor}>
            <Text style={styles.floorText}>Tầng 1</Text>
            <View style={styles.floorSeatContainer}>
              {vtChoDuoi && vtChoDuoi.map((value, index) => (
                <SeatItem
                  key={index}
                  isSold={value.trangThaiCho !== "còn trống"}
                  seatName={value.viTriCho}
                  onPress={() => handleSelectSeat(value.viTriCho)}
                  isSelected={selectedSeats.includes(value.viTriCho)}
                />
              ))}
            </View>
          </View>
          <View style={styles.floorLine} />
          <View style={styles.floor}>
            <Text style={styles.floorText}>Tầng 2</Text>
            <View style={styles.floorSeatContainer}>
              {vtChoTren.map((value, index) => (
                <SeatItem
                  key={index}
                  isSold={value.trangThaiCho !== "còn trống"}
                  seatName={value.viTriCho}
                  onPress={() => handleSelectSeat(value.viTriCho)}
                  isSelected={selectedSeats.includes(value.viTriCho)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {selectedSeats.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.footerTextSeat}>
              Vị trí: {selectedSeats.join(",")}
            </Text>
            <Text style={styles.footerPrice}>
              {selectedSeats.length * 350000} đ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => handleConfirmSeats()}
          >
            <Text style={styles.footerButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedSeats.length === 0 && (
        <TripOverviewHeader onPress={handleOpenTripOverviewBottomSheet} />
      )}
      <TripOverviewBottomSheet ref={tripOverviewBottomSheetRef} />
    </View>
  );
};

export default SelectSeats;

const styles = StyleSheet.create({
  status: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  statusItem: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 8,
  },
  statusItemIconSoldOut: {
    width: 20,
    height: 20,
    backgroundColor: APP_COLORS.lightGray,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  statusItemIconSelected: {
    width: 20,
    height: 20,
    backgroundColor: APP_COLORS.blue,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "black",
  },
  statusItemIconPrice: {
    width: 20,
    height: 20,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "red",
  },
  statusItemText: {
    fontSize: 12,
  },
  statusItemPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  floor: {
    flex: 1,
    paddingHorizontal: 4,
  },
  floorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  floorContainer: {
    flexDirection: "row",
    marginTop: 16,
    borderRadius: 32,
    backgroundColor: "#f8f8f8",
    paddingVertical: 16,
  },
  floorLine: {
    width: 2.5,
    backgroundColor: APP_COLORS.white,
  },
  floorSeatContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 16,
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 14,
  },
  footerTextSeat: {
    fontSize: 16,
    color: APP_COLORS.blue,
  },
  footerPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footerButton: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLORS.white,
  },
});
