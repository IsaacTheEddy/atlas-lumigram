import { FlashList } from "@shopify/flash-list";
import { Image, Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { homeFeed } from "../../placeholder";
import ImagePreview from "@/components/ImagePreview";
import { useEffect, useState } from "react";
import fireStore, { Post } from "@/lib/fireStore";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>();

  const fetchPosts = async () => {
    try {
      const { posts: fetchedPosts } = await fireStore.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "auto",
        marginHorizontal: "auto",
      }}
    >
      <Pressable onPress={() => fireStore.getPosts()}>
        <Text>Press</Text>
      </Pressable>
      <FlashList
        data={posts}
        onRefresh={fetchPosts}
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
