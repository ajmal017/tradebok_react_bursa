import React from "react";
import { StyleSheet, View, RefreshControl, Text } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { ListEmptyComponent } from "../../../components";
import ExplorePostCard from "./ExplorePostCard";
// import { ExplorePost } from '@app/types/screens';
import { responsiveWidth } from "react-native-responsive-dimensions";

// import MasonryList from 'react-native-masonry-list';

const ExploreGrid = ({ navigation, posts, onRefresh, tintColor }) => {
  const renderItem = ({ item }) => {
    const { id: postId, uri } = item;
    // console.log("item", item);
    return (
      <ExplorePostCard navigation={navigation} postId={postId} uri={uri} />
    );
  };

  const refreshControl = () => (
    <RefreshControl
      tintColor={tintColor}
      refreshing={false}
      onRefresh={onRefresh}
    />
  );

  return (
    <View style={styles.container}>
      {/* <MasonryList
        images={posts}
        imageContainerStyle={{ height: 100, width: 100 }}
        listContainerStyle={{ flex: 1 }}
        containerWidth={200}
      /> */}
      <FlatGrid
        staticDimension={responsiveWidth(92)}
        refreshControl={refreshControl()}
        itemDimension={100}
        showsVerticalScrollIndicator={false}
        items={posts}
        ListEmptyComponent={() => (
          <ListEmptyComponent placeholder="No posts found" spacing={60} />
        )}
        spacing={6}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1

  },
});

export default ExploreGrid;
