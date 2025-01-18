import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av";

const Index = () => {
  const recordingRef = useRef<Audio.Recording | null>(null); // Reference to the current recording instance
  const [isRecording, setIsRecording] = useState(false); // State to track recording status
  const [sound, setSound] = useState<Audio.Sound | null>(null); // State to store the sound instance for playback

  useEffect(() => {
    // Request microphone permission when the component mounts
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access microphone was denied");
      }
    })();
  }, []);

  const startRecording = async () => {
    try {
      console.log("Starting recording..");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync();
      await recording.startAsync();

      recordingRef.current = recording; // Save the recording instance to the ref
      setIsRecording(true);

      console.log("Recording started");
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");

    try {
      await recordingRef.current?.stopAndUnloadAsync(); // Stop and unload the recording
      const uri = recordingRef.current?.getURI(); // Get the URI of the recording

      if (uri) {
        const { sound: playbackSound } = await Audio.Sound.createAsync({ uri }); // Create a sound instance for playback
        setSound(playbackSound); // Save the sound instance
      } else {
        console.error("Recording URI is null or undefined");
      }

      console.log("Recording stopped and ready to play");
    } catch (error) {
      // Handle errors or ignore if already unloaded
      console.error("Error stopping recording:", error);
    }

    recordingRef.current = null; // Clear the reference
    setIsRecording(false);
  };

  const playRecording = async () => {
    try {
      if (sound) {
        await sound.playAsync(); // Play the recorded audio
      }
    } catch (error) {
      console.error("Error playing recording:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Audio Recording Example</Text>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording} // Toggle recording state
      />

      {sound && (
        <View style={{ marginTop: 20 }}>
          <Button title="Play Recording" onPress={playRecording} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});

export default Index;
