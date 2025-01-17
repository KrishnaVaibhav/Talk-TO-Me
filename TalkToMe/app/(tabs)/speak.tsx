import React, { useRef, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Button,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";

export default function Speak() {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestAudioPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (granted) {
          console.log("Microphone permission already granted");
          startSpeechToText();
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: "Audio Permission",
              message:
                "This app needs access to your microphone to recognize speech.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the microphone");
            startSpeechToText();
          } else {
            console.log("Microphone permission denied");
          }
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      startSpeechToText();
    }
  };

  const startSpeechToText = async () => {
    console.log("Starting speech to text");
    await Voice.start("en-NZ");
    setStarted(true);

    setTimeout(async () => {
      await stopSpeechToText();
    }, 5000); // Stop recording after 5 seconds
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result: any) => {
    setResults(result.value);
    console.log(result.value); // Print the results
  };

  const onSpeechError = (error: any) => {
    console.log(error);
  };

  const speak = () => {
    console.log("Hello, how are you?");
    const thingToSay = "Hello, how are you?";
    Speech.speak(thingToSay);
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      {!started ? (
        <Button title="Start Speech to Text" onPress={requestAudioPermission} />
      ) : undefined}
      {started ? (
        <Button title="Stop Speech to Text" onPress={stopSpeechToText} />
      ) : undefined}
      {results.map((result, index) => (
        <Text key={index}>{result}</Text>
      ))}
      <StatusBar style="auto" />
      <Animated.Text
        style={[styles.text, { transform: [{ scale: scaleValue }] }]}
        onPress={speak}
      >
        🎙️
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 100, // Increase the font size to make the icon larger
  },
});
