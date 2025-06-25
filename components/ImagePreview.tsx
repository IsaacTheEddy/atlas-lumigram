import { Image } from "react-native";
import { View } from "react-native";

export default function ImagePreview({ image }: { image: string | undefined }) {
  const source = image
    ? { uri: image }
    : require("../assets/images/placeholder.png");
  return (
    <View style={{ flex: 0, height: "100%", width: "100%", marginTop: 20 }}>
      <Image
        source={source}
        style={{ width: 400, height: 400, borderRadius: 10 }}
        resizeMode="cover"
      />
    </View>
  );
}
