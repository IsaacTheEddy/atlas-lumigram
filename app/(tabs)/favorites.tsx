import { FlashList } from "@shopify/flash-list";
import { Image, StyleSheet } from "react-native";

import { View, Text } from "react-native";
import { homeFeed } from "../../placeholder";
import ImagePreview from "@/components/ImagePreview";
import getFavorites from "@/lib/fireStore";
import { useEffect, useState } from "react";
import fireStore, { Post } from "@/lib/fireStore";

export default function FavoriteScreen() {
  const [posts, setPosts] = useState<Post[]>();

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
        data={posts}
        refreshing={!posts}
        renderItem={({ item }) => (
          <ImagePreview
            image={item.image}
            caption={item.caption}
            createdBy={item.createdBy}
            canFavorite={true}
            showCap={true}
          />
        )}
        estimatedItemSize={440}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
