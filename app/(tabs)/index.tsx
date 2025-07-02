import { FlashList } from "@shopify/flash-list";
import { Image, Pressable, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { homeFeed } from "../../placeholder";
import ImagePreview from "@/components/ImagePreview";
import { useEffect, useState } from "react";
import fireStore, { Post } from "@/lib/fireStore";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [lastOne, setLastOne] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const fetchPosts = async (loadMore = false) => {
    try {
      if (!loadMore || isLastPage) {
        const {
          posts: posts,
          lastDoc,
          isEndOfCollection,
        } = await fireStore.getInitalPosts();
        setPosts((prev) => (prev ? [...prev, ...posts] : posts));
        setLastOne(lastDoc);
        setIsLastPage(isEndOfCollection);
        console.log("fetching initial posts");
      } else if (loadMore || isLastPage) {
        console.log("fetching more posts");
        const {
          posts: morePosts,
          lastDoc,
          isEndOfCollection,
        } = await fireStore.getMorePosts(lastOne);
        if (morePosts.length === 0) {
          fetchPosts(false);
        } else {
          setPosts((prev) => (prev ? [...prev, ...morePosts] : morePosts));
          setLastOne(lastDoc);
          setIsLastPage(isEndOfCollection);
        }
      }
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
        onEndReached={() => fetchPosts(true)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
