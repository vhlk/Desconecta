import React from 'react';
import { Button, View } from 'react-native';
import TrackerModule from "./TrackerModule";

const NewModuleButton = () => {
  const onPress = () => {
    TrackerModule.StartDailyTimeWorkerForApps(["Chrome", "WhatsApp", "Facebook", "Instagram", "Twitter"], ["1", "2", "3", "4", "5"],
    (error: String) => {
      if (error) {
        console.log(error)
      }
    });
  };

  return (
    <>
        <View style={{marginTop:50}} />
        <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
        />
    </>
  );
};

export default NewModuleButton;