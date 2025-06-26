import { FlashList } from "@shopify/flash-list";
import { Image, StyleSheet } from "react-native";

import { View, Text } from "react-native";
import { homeFeed } from "../../placeholder";
import ImagePreview from "@/components/ImagePreview";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "auto",
        marginHorizontal: "auto",
      }}
    >
      <FlashList
        data={homeFeed}
        renderItem={({ item }) => (
          <ImagePreview
            image={item.image}
            caption={item.caption}
            createdBy={item.createdBy}
            canFavorite={false}
          />
        )}
        estimatedItemSize={440}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
