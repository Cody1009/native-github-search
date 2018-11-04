/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AppState,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  TextInput
} from "react-native";

type Props = {};
export default class App extends Component<Props> {
  state = {
    items: [],
    refreshing: false,
    text: ""
  };

  page = 0;

  fetchGithub = (refreshing = false) => {
    const newPage = refreshing ? 1 : this.page++;
    const API = `https://api.github.com/search/repositories?q=${
      this.state.text
    }react&page=${newPage}`;
    this.setState({ refreshing: refreshing });
    fetch(API)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;

        if (refreshing) {
          this.setState({ items, refreshing: false });
        } else {
          this.setState({ items: [...this.state.items, ...items] });
        }
      });
  };

  componentDidMount() {
    AppState.addEventListener("change", this.onChangeState);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.onChangeState);
  }

  onChangeState = appState => {
    console.log(appState);
    if (appState === "active") {
      this.fetchGithub(true);
    }
  };

  navigateToDetail = item => {
    this.props.navigation.navigate("Detail", { item });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({ text: text })}
          />
          <TouchableOpacity onPress={() => this.fetchGithub(true)}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.fetchBtn}
          onPress={() => this.fetchGithub()}
        >
          <Text>Fetch!</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.items}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.navigateToDetail(item)}>
              <Text style={{ padding: 30, color: "blue" }}>
                id:
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => this.fetchGithub()}
          onEndReachedThreshold={0.1}
          onRefresh={() => this.fetchGithub(true)}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  },
  fetchBtn: {
    backgroundColor: "#DDD",
    width: 100,
    height: 50
  },
  inputContainer: {
    padding: 20,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center"
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EEE"
  },
  searchText: {
    padding: 10,
    color: "green"
  }
});
