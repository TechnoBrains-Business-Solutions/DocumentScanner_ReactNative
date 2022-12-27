import 'react-native-reanimated';
import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableHighlight,
} from 'react-native';
import {PermissionsAndroid, Platform, Dimensions} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import ImageResizer from 'react-native-image-resizer';
import {TextInput} from 'react-native-gesture-handler';

import Scanner from 'react-native-document-scanner';

const CaptureScreen = props => {
  const [stbCount, setStbcount] = useState(0);
  const [detection, setetection] = useState(0);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  takePicture = async function () {
    if (camera) {
      const photo = await camera.current.takePhoto({
        quality: 100,
      });
      console.log('photo Detail after capture - ', photo);
      // cropImage(photo.path);
    }
  };

  async function savePicture(tagID) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
    console.log('tag ID ', tagID);
    CameraRoll.save(tagID);
  }

  // if (device == null) return <View />;

  const [detectedRectangle, setDetectedRectangle] = useState(false);
  const [camera, setCamera] = useState(React.createRef());
  const [takingPicture, setTakingPicture] = useState(false);
  const [processingImage, setProcessingImage] = useState(false);

  const onPictureProcessed = ({croppedImage, initialImage}) => {
    this.props.doSomethingWithCroppedImagePath(croppedImage);
    this.props.doSomethingWithOriginalImagePath(initialImage);
  };

  const captureImage = () => {
    console.log('Capture Image');
    camera.current.capture();
  };
  const pictureTaken = imageData => {
    console.log('picture TAKEN', imageData);
  };

  console.log('DocumentScaner::');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.camera}>
          {/* <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            // frameProcessor={frameProcessor}
          ></Camera>
           */}

          <Scanner
            useBase64
            onPictureTaken={data => pictureTaken(data)}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={false}
            useFrontCam={true}
            brightness={0.2}
            saturation={0}
            quality={0.5}
            contrast={1.2}
            onRectangleDetect={({stableCounter, lastDetectionType}) =>
              setStbcount(stableCounter)
            }
            detectionCountBeforeCapture={10}
            detectionRefreshRateInMS={50}
          />
        </View>
      </View>
      <View style={{backgroundColor: '#312C2C'}}>
        <TouchableHighlight
          style={styles.capture}
          onPress={takePicture}
          underlayColor="blue"
        >
          <View />
        </TouchableHighlight>
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
  cameraLayer: {
    position: 'absolute',
    margin: 10,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'yellow',
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginBottom: 15,
  },
});

export default CaptureScreen;
