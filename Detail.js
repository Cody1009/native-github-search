import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default class Detail extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: navigation.state.params.item.name
  // });

  render() {
    //これでもいいが、ネストが深いので、
    // const { navigation } = this.props;
    //下のような書き方もできる
    const {
      navigation: {
        state: {
          params: { item }
        }
      }
    } = this.props;
    console.log(item);

    return (
      <View>
        <Text> repo name: {item.full_name}</Text>
        <Image source={{ uri: item.owner.avatar_url }} />
        <Text>owner name: {item.owner.login}</Text>
      </View>
    );
  }
}
