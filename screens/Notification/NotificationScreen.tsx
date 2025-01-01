import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
import APP_COLORS from "../../constants/color";
import CancelTicket from "../Ticket/components/CancelTicket";
import tinycolor from "tinycolor2";
import { DataContext } from "../../App";
import Toast from "react-native-toast-message";
import CurrentNoti from "./components/currentNoti";
const HEADER_HEIGHT = 100;
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");

const NotificationScreen = () => {
  const [listTB,setListTB]= useState([])
  const {data,setData} = useContext(DataContext);


  useEffect(()=> {
    try {
      axios.post('http://192.168.194.157:9999/api/getThongBao',{idUser: data["id_nguoidung"]})
      .then(response => {
        if(response && response.data) {
          setListTB(response.data.data)
        }
      })
      .catch(error => {
        Toast.show({type:'error',text1: "Không có thông báo"})
      });
    } catch (error) {
      Toast.show({type:'error',text1: "Không có thông báo"})
    }
  },[])

  console.log(listTB)

  return (
    <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Thông báo</Text>
          </View>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                style={styles.verticalScroll}
              >
                {listTB && listTB.map((tb,index) => (
                  <CurrentNoti key={index} data={tb}/>
                ))}
              </ScrollView>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.primary,
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
  },
  headerText: {
    color: APP_COLORS.white,
    fontSize: 18,
    marginBottom: 32,
    fontWeight: "bold",
  },
  contentWrapper: {
    marginTop: -20,
    zIndex: 2,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: APP_COLORS.white,
  },
  tabContainer: {
    backgroundColor: tinycolor(APP_COLORS.primary).lighten(35).toString(),
    height: 50,
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 8,
  },
  tabButton: {
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  tabText: {
    fontSize: 14,
    color: APP_COLORS.black,
  },
  horizontalScroll: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  verticalScroll: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 16,
    flex: 1,
    paddingTop: 16,
  },
  ticketContainer: {
    gap: 16,
    paddingBottom: 100,
  },
  emptyStateContainer: {
    gap: 16,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
    minHeight: SCREEN_HEIGHT - HEADER_HEIGHT,
  },
  emptyStateImage: {
    width: 75,
    height: 75,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: "center",
  },
  activeTabButton: {
    backgroundColor: APP_COLORS.white,
  },
  activeTabText: {
    color: APP_COLORS.primary,
  },
});

export default NotificationScreen;
