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

  const a = () => {
    TrackerModule.GetDailyTimeForApps(["Chrome", "WhatsApp", "Facebook", "Instagram", "Twitter"], 
    (error: String, value: Object) => {
      if (error) {
        console.log(error)
      }
      else {
        console.log(value)
      }
    })
  }

  const b = () => {
    TrackerModule.StartActivity(0, 0, 10);
  }

  return (
    <>
        <View style={{marginTop:50}} />
        <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={b}
        />
    </>
  );
};

export default NewModuleButton;