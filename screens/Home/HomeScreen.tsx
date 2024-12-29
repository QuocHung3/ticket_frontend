import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  Animated,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';
import React ,{useContext,useEffect,useState} from "react";
import { DataContext } from "../../App";
import APP_COLORS from "../../constants/color";
import Feather from "@expo/vector-icons/Feather";
import RecentlySearchCard from "./components/RecentlySearchCard";
import NewCard from "./components/NewCard";
import { useNavigation } from "@react-navigation/native";
import { navigation } from "../../types/stackParamList";
import tinycolor from "tinycolor2";
const HomeImg = require("../../assets/app_img/home_img.jpg");

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

const HomeScreen = () => {
  const { data, setData } = useContext(DataContext);
  const [selectedNoiDi, setSelectedNoiDi] = useState("");
  const [selectedNoiDen, setSelectedNoiDen] = useState("");
  const [dataTinhThanh, setDataTinhThanh] = useState([]);
  const [ngayKhoiHanh, setNgayKhoiHanh] = useState(()=> {
    const ngay = new Date();
    return ngay.toLocaleDateString();
  });

  const [ngayVe, setNgayVe] = useState("");

  useEffect(() => {
    if(!ngayKhoiHanh) {
      const ngay = new Date();
      setNgayKhoiHanh(ngay.toLocaleDateString());
    }
  })
  

  useEffect(() => {
    try {
      setData({...data,ngayKhoiHanh,ngayVe: ngayVe});

      axios.get('http://192.168.31.45:9999/api/AllTinhThanh')
      .then(response => {
        if(response && response.data) {
          const dataTT= response.data.data.map((val)=> {
            return {key: val.ID_TinhThanh,value:val.TenTinhThanh}
          })
          setDataTinhThanh(dataTT);
        }
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.log(error)
    }
  },[])


  const scrollViewRef = React.createRef<ScrollView>();

  const [isOneWay, setIsOneWay] = React.useState(true);

  const scrollY = React.useRef(new Animated.Value(0));

  const navigation = useNavigation<navigation<"RootTab">>();
  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY.current,
          },
        },
      },
    ],
    { useNativeDriver: false }
  );

  const imageOverlayColor = scrollY.current.interpolate({
    inputRange: [0, SCREEN_WIDTH * 0.6],
    outputRange: ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"],
    extrapolate: "extend",
  });

  const handleFindTrip = () => {
    setData({...data,noiDi: selectedNoiDi,noiDen: selectedNoiDen})

    navigation.navigate("BookingStack")
    console.log(data);
  }

  useEffect(() => {
    if(data && data["ngayKhoiHanh"]){
      setNgayKhoiHanh(data["ngayKhoiHanh"]);
    }

    if(data && data["ngayVe"]){
      setNgayVe(data["ngayVe"]);
    }
  },[data])

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Đăng xuất!', 'Bạn có chắc chắn?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigation.navigate("LoginStack")},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.homeImgWrapper}>
        <Animated.View
          style={{
            ...styles.homeImgOverlay,
            backgroundColor: imageOverlayColor,
          }}
        />
        <Image source={HomeImg} style={styles.homeImg} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={onScroll}
        style={styles.scrollView}
      >
        <View style={styles.wellcomeText}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Chào bạn
          </Text>
          <Text style={{ fontSize: 16, marginTop: 5 }}>
            Bạn đã sãn sàng cho chuyến hành trình của riêng mình?
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.locationCard}>
            <View style={styles.locationIconContainer}>
              <Feather name="circle" size={20} color={APP_COLORS.primary} />
              <View style={styles.locationDivider} />
              <Feather name="map-pin" size={20} color={APP_COLORS.primary} />
            </View>
            <View style={styles.locationTextContainer}>
              <View style={styles.locationTextContainer}>
                <Text>Nơi đi</Text>
                <SelectList 
                    setSelected={(val) => setSelectedNoiDi(val)} 
                    data={dataTinhThanh} 
                    save="value"
                    // defaultOption={{key:18,value: "Đắk Lắk"}}
                    placeholder="Chọn nơi đi"
                    dropdownStyles={{
                      backgroundColor: "white",
                      position: "absolute",
                      top: 40,
                      // right: 10,
                      width: "100%",
                      zIndex: 999,
                      maxHeight: 200
                    }}   
                />
              </View>
              <View
                style={styles.locationTextContainer}
              >
                <Text>Nơi đến</Text>
                <SelectList 
                    setSelected={(val) => setSelectedNoiDen(val)} 
                    data={dataTinhThanh} 
                    save="value"
                    placeholder="Chọn nơi đến"
                    // defaultOption={{key: 2, value: "Hồ Chí Minh"}}
                    dropdownStyles={{
                      backgroundColor: "white",
                      position: "absolute",
                      top: 40,
                      // right: 10,
                      maxHeight:200,
                      width: "100%",
                      zIndex: 999,
                    }} 
                />
              </View>
            </View>
            
          </View>

          <View style={styles.datePickerContainer}>
            <View style={styles.datePickerTextContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChooseDate", { type: "oneway" })
                }
                style={styles.datePickerButton}
              >
                <Text style={styles.lightGrayText}>Ngày khởi hành</Text>
                <Text style={styles.dateText}>{ ngayKhoiHanh}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
              <TouchableOpacity
                onPress={() => setIsOneWay(true)}
                style={{
                  backgroundColor: isOneWay
                    ? tinycolor(APP_COLORS.primary).setAlpha(0.3).toRgbString()
                    : APP_COLORS.gray,
                  ...styles.oneWayButton,
                }}
              >
                <Text
                  style={{
                    color: isOneWay ? APP_COLORS.primary : APP_COLORS.black,
                    fontSize: 12,
                  }}
                >
                  Một chiều
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsOneWay(false)}
                style={{
                  ...styles.roundTripButton,
                  backgroundColor: !isOneWay
                    ? tinycolor(APP_COLORS.primary).setAlpha(0.3).toRgbString()
                    : APP_COLORS.gray,
                }}
              >
                <Text
                  style={{
                    color: !isOneWay ? APP_COLORS.primary : APP_COLORS.black,
                    fontSize: 12,
                  }}
                >
                  Khứ hồi
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {!isOneWay && (
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerTextContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChooseDate", { type: "roundtrip" })
                  }
                  style={styles.datePickerButton}
                >
                  <Text style={styles.lightGrayText}>Ngày về</Text>
                  <Text style={styles.dateText}>{data['ngayVe']}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <TouchableOpacity
            onPress={handleFindTrip}
            style={styles.searchButton}
          >
            <Text style={styles.searchButtonText}>Tìm chuyến đi</Text>
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>Xoá tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: SCREEN_WIDTH * 0.075,
                paddingBottom: 16,
              }}
            >
              <View style={{ marginTop: 16, flexDirection: "row", gap: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <RecentlySearchCard key={i} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tin tức</Text>
              <TouchableOpacity onPress={() => navigation.navigate("News")}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: SCREEN_WIDTH * 0.075,
                paddingBottom: 16,
              }}
            >
              <View style={{ marginTop: 16, flexDirection: "row", gap: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <NewCard key={i} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeImg: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
  },
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.white,
  },
  homeImgWrapper: {
    zIndex: 1,
    position: "absolute",
  },
  homeImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  wellcomeText: {
    position: "absolute",
    top: SCREEN_WIDTH * 0.2,
    textAlign: "center",
    maxWidth: SCREEN_WIDTH * 0.75,
    left: SCREEN_WIDTH * 0.1,
    zIndex: 2,
  },
  scrollView: {
    zIndex: 2,
  },
  contentContainer: {
    height: 2000,
    top: SCREEN_WIDTH * 0.6,
  },
  locationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.white,
    height: 150,
    zIndex: 99,
    elevation: 8,
    borderRadius: 10,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    paddingHorizontal: 16,
  },
  locationIconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  locationDivider: {
    flex: 0.5,
    width: 1,
    backgroundColor: APP_COLORS.primary,
  },
  locationTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  switchButtonContainer: {
    justifyContent: "center",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  rotatedIcon: {
    transform: [{ rotate: "90deg" }],
  },
  footer: {
    height: 100,
    backgroundColor: APP_COLORS.white,
    width: SCREEN_WIDTH,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.white,
    height: 60,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    zIndex: 1,
    elevation: 8,
    borderRadius: 10,
    marginTop: 16,
  },
  datePickerTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
    zIndex: 10
  },
  datePickerButton: {
    flex: 1,
    justifyContent: "center",
  },
  lightGrayText: {
    color: APP_COLORS.lightGray,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  centerContainer: {
    justifyContent: "center",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  oneWayButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 64,
  },
  roundTripButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: 64,
  },
  calendarButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 15,
  },
  searchButton: {
    marginTop: 16,
    marginHorizontal: SCREEN_WIDTH * 0.075,
    height: 50,
    backgroundColor: APP_COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  searchButtonText: {
    color: APP_COLORS.white,
    fontWeight: "400",
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SCREEN_WIDTH * 0.075,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: APP_COLORS.primary,
    fontSize: 16,
  },
});
