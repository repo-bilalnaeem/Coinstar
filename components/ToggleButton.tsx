import { View, Text, Switch } from "react-native";
import React, { useState } from "react";

const ToggleButton = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View>
      <Switch
        value={checked}
        onValueChange={() => setChecked(!checked)}
        trackColor={{ true: "#365FF1" }}
      />
    </View>
  );
};

export default ToggleButton;
