import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import APP_COLORS from "../../../constants/color";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

interface ContactBottomSheetProps {
  onClose: () => void;
}

const ContactBottomSheet = forwardRef(
  (
    props: ContactBottomSheetProps,
    ref: React.ForwardedRef<BottomSheetModal>
  ) => {
    const snapPoints = useMemo(() => ["45%"], []);

    const { onClose } = props;

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
            marginTop: -20,
            width: 40,
          }}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Liên hệ</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>Đóng</Text>
              </TouchableOpacity>
            </View>
            {/* Divider */}
            <View style={styles.divider} />

            <ScrollView style={styles.contactContainer}>
              <View style={styles.contactItem}>
                <View style={styles.contactItemContent}>
                  <View>
                    <MaterialIcons
                      name="local-phone"
                      size={24}
                      color={APP_COLORS.black}
                    />
                  </View>
                  <Text style={styles.contactText}>
                    Tổng đài đặt vé:{" "}
                    <Text style={styles.contactLink}>0909090909</Text>
                  </Text>
                </View>

                <View style={styles.contactItemContent}>
                  <View>
                    <MaterialIcons
                      name="email"
                      size={24}
                      color={APP_COLORS.black}
                    />
                  </View>
                  <Text style={styles.contactText}>
                    Email:{" "}
                    <Text style={styles.contactLink}>admin@gmail.com</Text>
                  </Text>
                </View>
                <View style={styles.contactItemContent}>
                  <View>
                    <AntDesign
                      name="earth"
                      size={24}
                      color={APP_COLORS.black}
                    />
                  </View>
                  <Text style={styles.contactText}>
                    Website:{" "}
                    <Text style={styles.contactLink}>
                      https://xetuantrung.com
                    </Text>
                  </Text>
                </View>
                <View style={styles.contactItemContent}>
                  <View>
                    <AntDesign
                      name="facebook-square"
                      size={24}
                      color={APP_COLORS.black}
                    />
                  </View>
                  <Text style={styles.contactText}>
                    Facebook:{" "}
                    <Text style={styles.contactLink}>
                      https://xetuantrung.com
                    </Text>
                  </Text>
                </View>
              </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    color: APP_COLORS.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: "auto",
    textDecorationColor: APP_COLORS.primary,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: APP_COLORS.lightGray,
    marginTop: 16,
  },
  contactItem: {
    width: "100%",
  },
  contactItemContent: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: APP_COLORS.lightGray,
    borderRadius: 8,
    width: "100%",
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactContainer: {
    width: "100%",
    backgroundColor: APP_COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  padding: {
    paddingBottom: 24,
  },
  contactLink: {
    color: APP_COLORS.primary,
  },
});

export default ContactBottomSheet;
