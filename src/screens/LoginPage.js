import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = ({ navigation }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    const getUserName = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token , "token........")
        if (token !== null) {
          navigation.navigate("tabs")
        }
      } catch {
        console.log(error)
      }
    }

    getUserName();
  }, [])



  const handleUserDetails = (value, key) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value
    })
  }


  const handleLogin = () => {
    if (loginDetails.email && loginDetails.password) {
      // setLoading(true)
      firebaseAuthentication(loginDetails.email, loginDetails.password)
    }
    setLoginDetails({
      email: "",
      password: ""
    })
  }

  const firebaseAuthentication = async (email, password) => {
    console.log('responseresponseresponseresponse________________firebaseAuthentication',);
    const response = await auth().signInWithEmailAndPassword(email, password)
    try {
      // setLoading(false)
      if (response) {
        console.log('User account created & signed in!', response?.user?.uid)
        navigation.navigate("tabs")
        storage(response?.user?.uid)
      }
    } catch {
      // setLoading(false)
      console.log("error")
    }
  };

  const storage = async (userToken) => {
    try {
      await AsyncStorage.setItem('token', String(userToken));
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={styles.container} >
      <Text style={styles.HeaderBtnText}>Login page</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter Email'
        value={loginDetails.email}
        onChangeText={(e) => handleUserDetails(e, "email")}
      />

      <TextInput
        style={styles.textInput}
        placeholder='Password'
        value={loginDetails.password}
        secureTextEntry={true}
        onChangeText={(e) => handleUserDetails(e, "password")}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handleLogin}
          style={styles.logiButton}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signUpOnLogin}
        onPress={() => navigation.navigate("SignupPage")}
      >
        <Text style={styles.signUpOnLoginText}>
          new user? sign up instead
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15
  },
  HeaderBtnText: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 15
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#1a73e8",
    borderRadius: 5,
    marginVertical: 5
  },
  logiButton: {
    backgroundColor: "#1a73e8",
    paddingVertical: 10,
    width: "30%"
  },
  loginBtnText: {
    textAlign: "center",
    color: "#fff",
  },
  signUpOnLogin: {
    marginTop: 15,
  },
  signUpOnLoginText: {
    fontSize: 15,
    color: "#1a73e8",
    textAlign: "center"
  },

})