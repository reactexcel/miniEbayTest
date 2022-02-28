import { StyleSheet, Text, View, Image, Touchable } from 'react-native'
import React, {useEffect , useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import storage from '@react-native-firebase/storage';
import database, { firebase } from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import HomeComponent from '../components/HomeComponent';

const Home = () => {
  const[PostCollections , setPostCollections] = useState([])

  useEffect(() => {
    getDataFromFireStore();
  }, []);

  const getDataFromFireStore = async () => {
    const usersCollection = firestore().collection('Posts');
    const res = await usersCollection.get()
    const newArr = res?._docs?.map((rest)=>{
      return rest?._data
    })
    setPostCollections(newArr)
}

useFocusEffect(
        useCallback(()=>{
          getDataFromFireStore()
        },[])
    )

  return (
    <ScrollView>
      {
        PostCollections?.map((item , i)=>{
           return <HomeComponent imageUrl={item?.imageName} publicOrPrivate={item?.private} item={item} key={i}/>
        })
      }
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})