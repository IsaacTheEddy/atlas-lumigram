import { Image, Text, Alert } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
export default function ImagePreview({
  image,
  caption,
  createdBy,
  canFavorite,
  showCap,
}: {
  image: string | undefined;
  caption?: string;
  createdBy?: string;
  canFavorite?: boolean;
  showCap?: boolean;
}) {
  const source = image
    ? { uri: image }
    : require("../assets/images/placeholder.png");

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
    Alert.alert("Double Tap", "Its been double tapped");
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(handleAlert)();
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
          source={source}
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
