import React, { useState, useRef } from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // Import Icon component

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../config/colors";

const AppCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const scrollViewRef = useRef(); // Ref for the ScrollView
  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());

    // Calculate the offset to scroll to
    const dayIndex = today.getDate() - 1; // Index of today's date in the dates array
    const offset = dayIndex * 70; // Assuming each date cell is approximately 70 pixels wide
    scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    // Scroll to the start of the month
    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const renderDate = (date) => {
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const isCurrent = isToday(date);

    return (
      <TouchableOpacity
        key={date.toDateString()}
        style={[
          styles.dateCell,
          isCurrent && styles.currentDate,
          isSelected && styles.selectedDate,
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text style={styles.dateText}>{date.getDate()}</Text>
      </TouchableOpacity>
    );
  };

  const renderDates = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    let dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(renderDate(new Date(currentYear, currentMonth, i)));
    }
    return dates;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Icon name="angle-left" size={30} />
        </TouchableOpacity>
        <Text style={styles.text}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Icon name="angle-right" size={30} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={goToToday} style={styles.todayButton}>
        <Text>Today</Text>
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.calendarContainer}>{renderDates()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateCell: {
    marginHorizontal: 10,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  currentDate: {
    backgroundColor: "lightblue",
  },
  selectedDate: {
    backgroundColor: "lightgreen",
  },
  todayButton: {
    alignItems: "center",
    padding: 10,
  },
  dateText: {},
  text: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AppCalendar;
