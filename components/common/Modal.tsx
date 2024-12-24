import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal as RNModal,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import APP_COLORS from "../../constants/color";

interface ModalProps {
  visible: boolean;
  title: string;
  subTitle: string;
  onPress: () => void;
  onClose: () => void;
}

const Modal = ({ visible, onClose, title, subTitle, onPress }: ModalProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [showModal, setShowModal] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setShowModal(false);
      });
    }
  }, [visible]);

  if (!showModal && !visible) return null;

  return (
    <RNModal
      transparent
      visible={showModal}
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.modalBackground}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
          <View style={styles.dividerHorizontal} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Text style={styles.buttonTextAccept}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    paddingTop: 30,
    borderRadius: 8,
    elevation: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: APP_COLORS.black,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
  },
  dividerHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 1,
    backgroundColor: "#ccc",
  },
  buttonTextAccept: {
    color: APP_COLORS.primary,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
});
