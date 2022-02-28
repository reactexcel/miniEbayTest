import { StyleSheet, Text, View, Image, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import storage from '@react-native-firebase/storage';

const HomeComponent = (props) => {
  const { imageUrl, publicOrPrivate, item } = props;

  const [urlState, setUrl] = useState()

  const imagesUrl = async (imageName) => {
    try {
      const url = await storage().ref('/' + imageName).getDownloadURL()
      console.log(url)
      setUrl(url)
    } catch (e) {
      console.log(e, "error")
    }
  }

  useEffect(() => {
    imagesUrl(imageUrl)
  }, [imageUrl])

  console.log("prpublicOrPrivate", item)

  return (
    <View style={styles.container}>
      {publicOrPrivate ? null :
        <View>
          <Image style={styles.image} source={{ uri: urlState }} />
          {item?.description && <View>
            <View style={styles.titlebar}>
            <Text style={styles.descText}>{item?.description?.title}</Text>
            <Text style={styles.rateText}>₹ {item?.description?.rate}</Text>
            </View>
            <Text>
              Description :
            </Text>
            <Text>
              {item?.description?.description}
            </Text>
          </View>}
        </View>}
    </View>
  )
}

export default HomeComponent

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 15,
    marginTop: 16,
    borderWidth: 1,
    borderColor : "#1a73e8",
    marginHorizontal :10,
    paddingVertical :15,
    borderRadius :10
  },
  commentSection: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15
  },
  commentSectionInput: {
    width: '80%'
  },
  signUpOnLogin: {
    backgroundColor: "#1a73e8",
    paddingHorizontal: 10,
  },
  signUpOnLoginText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center"
  },
  image: {
    height: 500,
    width:"100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 5
  },
  descText: {
    fontWeight: '600',
    fontSize: 25,
    letterSpacing: 1,
    textTransform: 'capitalize',
    color: '#1a73e8',
    width :"78%"
  },
  rateText: {
    fontSize: 20,
    paddingVertical: 2,
    color :"red",
    width :"20%",
    textAlign :"right"
  },
  titlebar:{
    display:"flex",
    flexDirection :"row",
    justifyContent : "space-between",
    alignItems : "center"
  }
})