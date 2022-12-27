import React from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import ImageResizer from 'react-native-image-resizer';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const ResizeScreen = ({route, navigation}) => {
  const {imagePath} = route.params;
  console.log('get image data', imagePath);

  resizeByImageResizer = imageURI => {
    ImageResizer.createResizedImage(
      imageURI,
      678,
      1056,
      'JPEG',
      100,
      0,
      null,
      false,
      {mode: 'stretch'},
    )
      .then(response => {
        console.log('Response,', response.uri);
        savePicture(response.uri);
      })
      .catch(err => {});
  };

  async function savePicture(tagID) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    console.log('tag ID ', tagID);
    CameraRoll.save(tagID);
    navigation.goBack();
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.camera}>
          <Image
            source={{uri: imagePath}}
            resizeMode="stretch"
            style={{flex: 1}}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#312C2C',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={styles.capture}
          onPress={() => {
            resizeByImageResizer(imagePath);
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#312C2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: '85%',
    width: '80%',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: 'black',
  },
  capture: {
    width: 200,
    height: 40,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEACAC',
  },
});

export default ResizeScreen;
