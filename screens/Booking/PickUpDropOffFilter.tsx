import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { navigation, route } from "../../types/stackParamList";
import Header from "../../components/common/Header";
import APP_COLORS from "../../constants/color";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

interface Location {
  id: string;
  name: string;
  children?: Location[];
  isSelected: boolean;
}

const AccordionItem = ({
  item,
  level = 0,
  onToggle,
}: {
  item: Location;
  level?: number;
  onToggle: (id: string, value: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = (value: boolean) => {
    onToggle(item.id, value);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.accordionHeader, { paddingLeft: level * 20 }]}
        onPress={() => onToggle(item.id, !item.isSelected)}
      >
        <Checkbox
          style={styles.checkbox}
          value={item.isSelected}
          onValueChange={handleCheckboxChange}
          color={item.isSelected ? APP_COLORS.primary : undefined}
        />
        <Text style={styles.locationText}>{item.name}</Text>
        {item.children && (
          <TouchableOpacity
            hitSlop={20}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Ionicons
              name={isExpanded ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {isExpanded && item.children && (
        <View style={styles.childrenContainer}>
          {item.children.map((child) => (
            <AccordionItem
              key={child.id}
              item={child}
              level={level + 1}
              onToggle={onToggle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const PickUpDropOffFilter = () => {
  const navigation = useNavigation<navigation<"PickUpDropOffFilter">>();
  const { params } = useRoute<route<"PickUpDropOffFilter">>();
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      name: "Hà Nội",
      isSelected: false,
      children: [
        { id: "1-1", name: "Quận Ba Đình", isSelected: false },
        { id: "1-2", name: "Quận Hoàn Kiếm", isSelected: false },
      ],
    },
    {
      id: "2",
      name: "TP. Hồ Chí Minh",
      isSelected: false,
      children: [
        { id: "2-1", name: "Quận 1", isSelected: false },
        { id: "2-2", name: "Quận 2", isSelected: false },
      ],
    },
  ]);

  const updateLocationState = (
    locations: Location[],
    targetId: string,
    value: boolean
  ): Location[] => {
    return locations.map((location) => {
      if (location.id === targetId) {
        return {
          ...location,
          isSelected: value,
          children: location.children?.map((child) => ({
            ...child,
            isSelected: value,
          })),
        };
      } else if (location.children) {
        return {
          ...location,
          children: updateLocationState(location.children, targetId, value),
        };
      }
      return location;
    });
  };

  const handleToggle = (id: string, value: boolean) => {
    setLocations((prevLocations) =>
      updateLocationState(prevLocations, id, value)
    );
  };

  const handleUnselectAll = () => {
    setLocations((prevLocations) =>
      prevLocations.map((location) => ({
        ...location,
        isSelected: false,
        children: location.children?.map((child) => ({
          ...child,
          isSelected: false,
        })),
      }))
    );
  };

  const handleSave = () => {
    console.log(locations);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title={params.type === "pickup" ? "Chọn điểm đón" : "Chọn điểm trả"}
      />
      <View style={styles.searchContainer}>
        <TextInput
          cursorColor={APP_COLORS.primary}
          style={styles.searchInput}
          placeholder="Tìm Tỉnh / Thành / Quận / Huyện"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {locations.map((location) => (
            <AccordionItem
              key={location.id}
              item={location}
              onToggle={handleToggle}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.unselectAllButton}
          onPress={handleUnselectAll}
        >
          <Text style={styles.unselectAllText}>Bỏ chọn tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PickUpDropOffFilter;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    height: 48,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    fontSize: 16,
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: APP_COLORS.gray,
  },
  locationText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  childrenContainer: {
    backgroundColor: "white",
  },
  listContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  checkbox: {
    borderColor: APP_COLORS.black,
    borderWidth: 1.5,
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  unselectAllButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: APP_COLORS.primary,
    borderRadius: 16,
    padding: 12,
  },
  saveButton: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: APP_COLORS.primary,
    padding: 12,
  },
  unselectAllText: {
    fontSize: 16,
    color: APP_COLORS.primary,
    textAlign: "center",
  },
  saveText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
