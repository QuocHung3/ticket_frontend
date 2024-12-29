import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { DataContext } from "../../../App";
import APP_COLORS from "../../../constants/color";
import tinycolor from "tinycolor2";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../../types/stackParamList";

const TICKET_NOTCH_SIZE = {
  width: 16,
  height: 24,
};

const TimeDurationIndicator = () => (
  <View style={styles.durationContainer}>
    <View style={styles.dotLineContainer}>
      <View style={styles.startDot} />
      <View style={styles.line} />
    </View>
    <Text style={styles.durationText}>8h50</Text>
    <View style={styles.dotLineContainer}>
      <View style={styles.line} />
      <View style={styles.endDot} />
    </View>
  </View>
);

const TicketNotch = ({ style }: { style: any }) => (
  <View style={[styles.ticketNotch, style]} />
);

const TripResultCard = ({noiDi,noiDen,dataProp}) => {
  const navigation = useNavigation<navigation<"BookingStack">>();
  const {data, setData} = useContext(DataContext);

  const handleSelectTrip = () => {
    const ngayKH = data.ngayKhoiHanh.split(' ')[0] + ' ' + dataProp.GioDi;
    setData({...data,ngayKhoiHanh: ngayKH,idChuyen: dataProp.ID_ChuyenXe,idXe: dataProp.ID_Xe,soXe:dataProp.SoXe})

    navigation.navigate("SelectSeat");
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleSelectTrip()}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.busTypeContainer}>
          <Text style={styles.busTypeText} numberOfLines={2}>
            Limousine 34 giường
          </Text>
        </View>
        <View style={styles.seatsContainer}>
          <Text style={styles.seatsText}>Còn {dataProp.GheConTrong} chỗ trống</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Trip Details Section */}
      <View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{dataProp.GioDi}</Text>
          <TimeDurationIndicator />
          <Text style={styles.timeText}>{dataProp.GioDen}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Text numberOfLines={2} style={styles.locationText}>
            {noiDi}
          </Text>
          <Text
            numberOfLines={2}
            style={[styles.locationText, styles.rightAlign]}
          >
            {noiDen}
          </Text>
        </View>
      </View>

      <View style={styles.dashedDivider} />

      {/* Price Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{dataProp.GiaVeMin}đ</Text>
      </View>

      {/* Ticket Notches */}
      <TicketNotch style={styles.leftNotch} />
      <TicketNotch style={styles.rightNotch} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: APP_COLORS.white,
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  busTypeContainer: {
    flex: 0.5,
  },
  busTypeText: {
    marginRight: 16,
  },
  seatsContainer: {
    flex: 0.8,
    justifyContent: "center",
  },
  seatsText: {
    color: APP_COLORS.blue,
    textAlign: "right",
    fontSize: 18,
  },
  divider: {
    height: 1,
    backgroundColor: APP_COLORS.lightGray,
    marginVertical: 8,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 24,
    color: APP_COLORS.blue,
    fontWeight: "bold",
  },
  durationContainer: {
    flexDirection: "row",
  },
  dotLineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  startDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: APP_COLORS.primary,
  },
  endDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    borderColor: APP_COLORS.primary,
    borderWidth: 1,
  },
  line: {
    height: 1,
    backgroundColor: APP_COLORS.primary,
    width: 16,
  },
  durationText: {
    fontSize: 20,
    color: tinycolor(APP_COLORS.blue).lighten(20).toString(),
    marginHorizontal: 8,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
  },
  rightAlign: {
    textAlign: "right",
  },
  dashedDivider: {
    height: 1,
    marginVertical: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    marginHorizontal: 8,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 4,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  ticketNotch: {
    height: TICKET_NOTCH_SIZE.height,
    width: TICKET_NOTCH_SIZE.width,
    position: "absolute",
    backgroundColor: APP_COLORS.aliceBlue,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    bottom: 45,
  },
  leftNotch: {
    left: 0,
    transform: [{ rotate: "180deg" }],
  },
  rightNotch: {
    right: 0,
    transform: [{ rotate: "360deg" }],
  },
});

export default TripResultCard;
