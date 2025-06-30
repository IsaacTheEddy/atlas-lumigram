import { Image, Text, Alert } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import storage from "@/lib/storage";
import fireStore from "@/lib/fireStore";
import { useAuth } from "./AuthProvider";
import { use } from "react";
export default function ImagePreview({
  image,
  caption,
  createdBy,
  canFavorite,
  showCap,
}: {
  image: string | undefined;
  caption: string;
  createdBy?: string;
  canFavorite?: boolean;
  showCap?: boolean;
}) {
  const auth = useAuth();
  const source = image
    ? { uri: image }
    : require("../assets/images/placeholder.png");
  const sourceComplete = source;

  async function save() {
    if (!image) {
      return;
    }
    const name = image?.split("/").pop() as string;

    const { downloadUrl, metadata } = await storage.upload(image, name);
    alert(`Added ${caption} to favorites`);

    fireStore.addFav({
      caption: caption,
      image: downloadUrl,
      createdAt: new Date(),
      createdBy: auth.user?.uid!!,
    });
    return downloadUrl;
  }

  const showCaption = useSharedValue(0);

  const captionStyle = useAnimatedStyle(() => ({
    opacity: withTiming(showCaption.value),
  }));

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      if (showCap) {
        return (showCaption.value = 1);
      }
    })
    .onEnd(() => {
      showCaption.value = 0;
    });
  const handleAlert = () => {
    Alert.alert("Double Tap", "It has been added to favorites");
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(handleAlert)();
      runOnJS(save)();
    });

  const combinedGestures = Gesture.Simultaneous(longPress, doubleTap);

  return (
    <GestureDetector gesture={canFavorite ? combinedGestures : longPress}>
      <Animated.View
        style={{
          flex: 0,
          height: "100%",
          width: "100%",
          marginTop: 20,
          marginHorizontal: 10,
        }}
      >
        <Image
          source={sourceComplete}
          resizeMode="cover"
          style={{
            width: 400,
            height: 400,
            borderRadius: 10,
          }}
        />
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 100,
              left: 50,
              padding: 8,
            },
            captionStyle,
          ]}
        >
          <Text>Title: {caption ? caption : "unknown"} </Text>
          <Text>Created By: {createdBy ? createdBy : "unknown"} </Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}
