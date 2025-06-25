import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import ImagePreview from "../../components/ImagePreview";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useState } from "react";

export default function Page() {
  const [caption, setCaption] = useState("");
  const { image, openImage, reset } = useImagePicker();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 1, marginBottom: 100 }}>
        <ImagePreview image={image} />
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        {!image && (
          <Pressable
            style={{
              backgroundColor: "#63cfb1",
              height: 80,
              marginHorizontal: 40,
              borderRadius: 6,
              justifyContent: "center",
            }}
            onPress={openImage}
          >
            <Text style={{ flex: 0, textAlign: "center", color: "white" }}>
              Choose a photo
            </Text>
          </Pressable>
        )}
        {image && (
          <>
            <TextInput
              style={styles.textInput}
              placeholder="Add a caption"
              placeholderTextColor={"gray"}
              onChangeText={setCaption}
              value={caption}
            ></TextInput>
            <Pressable
              style={{
                backgroundColor: "#63cfb1",
                height: 80,
                marginHorizontal: 40,
                borderRadius: 6,
                justifyContent: "center",
              }}
              onPress={() => {
                Alert.alert(caption);
              }}
            >
              <Text style={{ flex: 0, textAlign: "center", color: "white" }}>
                Save
              </Text>
            </Pressable>
            <Pressable
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
                marginHorizontal: "auto",
              }}
              onPress={reset}
            >
              <Text>Reset</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderColor: "#52ac9b",
    margin: 10,
    color: "gray",
    height: 60,
    borderRadius: 6,
  },
});
