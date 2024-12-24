import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import APP_COLORS from "../../../constants/color";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export const FEED_BACK_PROBLEM_LIST = [
  {
    id: 1,
    name: "Trải nghiệm đặt vé",
  },
  {
    id: 2,
    name: "Thanh toán",
  },
  {
    id: 3,
    name: "Huỷ vé",
  },
  {
    id: 4,
    name: "Hoàn tiền",
  },
  {
    id: 5,
    name: "Giá vé",
  },
  {
    id: 6,
    name: "Điểm đón/trả",
  },
  {
    id: 7,
    name: "Xe",
  },
  {
    id: 8,
    name: "Điểm thành viên",
  },
  {
    id: 9,
    name: "Tổng đài CSKH",
  },
  {
    id: 10,
    name: "Khác",
  },
];

interface FeedBackBottomSheetProps {
  onClose: () => void;
}
const FeedBackBottomSheet = forwardRef(
  (
    props: FeedBackBottomSheetProps,
    ref: React.ForwardedRef<BottomSheetModal>
  ) => {
    const snapPoints = useMemo(() => ["55%"], []);
    const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    // renders
    return (
      <View>
        <BottomSheetModal
          snapPoints={snapPoints}
          ref={ref}
          enablePanDownToClose
          handleIndicatorStyle={{
            backgroundColor: APP_COLORS.lightGray,
            width: 40,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Chọn vấn đề</Text>
            </View>
            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
                <AntDesign
                  name="search1"
                  size={24}
                  color={APP_COLORS.lightGray}
                />
                <BottomSheetTextInput
                  placeholder="Nhập từ khoá"
                  style={styles.searchInput}
                />
              </View>
            </View>
            <ScrollView style={styles.problemListContainer}>
              {FEED_BACK_PROBLEM_LIST.map((item, index) => (
                <TouchableOpacity
                  style={styles.problemItem}
                  key={item.id}
                  onPress={() => {
                    setSelectedProblem(item.id);
                    props.onClose();
                  }}
                >
                  <View style={styles.problemItemContent}>
                    <Text style={styles.problemItemText}>{item.name}</Text>
                    {selectedProblem === item.id && (
                      <AntDesign
                        name="checkcircleo"
                        size={20}
                        color={APP_COLORS.primary}
                      />
                    )}
                  </View>
                  {index !== FEED_BACK_PROBLEM_LIST.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </TouchableOpacity>
              ))}
              <View style={styles.padding} />
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: APP_COLORS.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.primary,
  },

  padding: {
    paddingBottom: 24,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
    borderColor: APP_COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  searchWrapper: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  problemListContainer: {
    width: "100%",
    paddingTop: 16,
  },
  problemItem: {
    width: "100%",
  },
  problemItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  problemItemText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: APP_COLORS.lightGray,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
  },
});

export default FeedBackBottomSheet;
