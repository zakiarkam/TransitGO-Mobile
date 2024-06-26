import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios"; // Import axios for HTTP requests
import Config from "../../../config";

const apiUrl = Config.API_BASE_URL;

const Picker = ({ placeholder, onSelect }) => {
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    const loadBusStops = async () => {
      try {
        const busStopData = await axios.get(`${apiUrl}/busstops`);
        // Use a Set to store unique bus stop names
        const uniqueNamesSet = new Set();
        const busStopNames = busStopData.data
          .filter((stop) => {
            if (uniqueNamesSet.has(stop.name.trim())) {
              return false; // Exclude duplicate names
            } else {
              uniqueNamesSet.add(stop.name.trim());
              return true; // Include unique names
            }
          })
          .map((stop) => ({
            label: stop.name.trim(),
            value: stop.name,
            orderIndex: stop.orderIndex, // Include orderIndex
          }));

        setBusStops(busStopNames);
      } catch (error) {
        console.error("Error loading bus stops:", error.message);
      }
    };
    loadBusStops();
  }, []);

  const handleValueChange = (value) => {
    const selectedBusStop = busStops.find((stop) => stop.value === value);
    if (selectedBusStop) {
      onSelect(value, selectedBusStop.orderIndex);
    }
  };

  return (
    <View style={styles.input}>
      <AntDesign
        name="caretdown"
        size={15}
        color="#132968"
        style={styles.icon}
      />
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={busStops}
        placeholder={{ label: placeholder, value: null }}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 5,
    padding: 20,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    fontSize: 13,
    color: "#808080",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 180,
    fontSize: 13,
    color: "#808080",
    borderRadius: 4,
    color: "black",
  },
  inputAndroid: {
    width: 180,
    fontSize: 13,
    color: "#808080",
    borderRadius: 8,
    color: "black",
  },
  placeholder: {
    color: "#808080",
  },
});

export default Picker;
