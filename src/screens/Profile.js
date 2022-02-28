import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

const Profile = ({navigation}) => {
  const clearLocal = () =>{
    AsyncStorage.removeItem('token');
    navigation.navigate("LoginPage");
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.signUpOnLogin} onPress={() => {
            clearLocal()
          }}>
        <Text style={styles.signUpOnLoginText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
    // marginHorizontal : 10
  },
  signUpOnLogin: {
    backgroundColor: "#1a73e8",
    padding: 15,
    marginVertical : 10
  },
  signUpOnLoginText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center"
  },
})