import { useState } from "react";
import { View } from "react-native";
import { CalendarList } from "react-native-calendars";

const Calendar = () => {
  const [selected, setSelected] = useState("");

  return (
    <View>
      <CalendarList
        initialScrollIndex={200}
        showsVerticalScrollIndicator={false}
        bounces={false}
        pastScrollRange={1}
        futureScrollRange={1}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        theme={{
          dayTextColor: "black",
          selectedDayBackgroundColor: "#365FF1",
          textDayFontWeight: "500",
          textDayHeaderFontWeight: "400",
          selectedDayTextColor: "white",
          todayTextColor: "white",
          todayBackgroundColor: "#365FF1",
          monthTextColor: "#404040",
          textMonthFontWeight: "400",
          textDayFontSize: 17,
          textMonthFontSize: 15,
        }}
        onVisibleMonthsChange={(months) => {
          // console.log("Visible months changed", months);
        }}
        monthFormat="MMMM"
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            // selectedDotColor: "orange",
          },
        }}
      />
    </View>
  );
};

export default Calendar;
