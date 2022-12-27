/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Scanner from 'react-native-document-scanner';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import ImageResizer from 'react-native-image-resizer';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      flashEnabled: false,
      useFrontCam: false,
    };
  }

  renderDetectionType() {
    switch (this.state.lastDetectionType) {
      case 0:
        return 'Correct rectangle found';
      case 1:
        return 'Bad angle found';
      case 2:
        return 'Rectangle too far';
      default:
        return 'No rectangle detected yet';
    }
  }

  resetImage() {
    this.setState({image: ''});
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.camera}>
            {this.state.image ? (
              <Image
                style={{flex: 1, width: '100%', height: '100%'}}
                source={{uri: this.state.image}}
                resizeMode="stretch"
              />
            ) : (
              <Scanner
                uri
                onPictureTaken={data => {
                  this.setState({image: data.initialImage});
                  this.setState({cropImage: data.croppedImage});
                }}
                overlayColor="rgba(255,130,0, 0.7)"
                enableTorch={this.state.flashEnabled}
                useFrontCam={this.state.useFrontCam}
                quality={1}
                onRectangleDetect={({stableCounter, lastDetectionType}) =>
                  this.setState({stableCounter, lastDetectionType})
                }
                detectionCountBeforeCapture={2}
                detectionRefreshRateInMS={30}
                style={styles.scanner}
              />
            )}
          </View>
          {this.state.image ? (
            <View
              style={{
                marginBottom: -20,
                marginVertical: 10,
                height: 40,
                bottom: 0,
                width: '80%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({image: ''});
                  this.setState({cropImage: ''});
                }}
              >
                <Text style={styles.titleText}> Retake </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('resize', {
                    imagePath: this.state.cropImage,
                  });
                }}
              >
                <Text style={styles.titleText}> Next </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

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
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  newPic: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 20,
    bottom: 20,
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
  },
  left: {
    left: 20,
  },
  right: {
    right: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scanner: {
    flex: 1,
  },
});
