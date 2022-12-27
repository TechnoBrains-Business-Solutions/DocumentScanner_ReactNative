import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {PermissionsAndroid, Platform} from 'react-native';

const CameraScreen = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('capture');
          }}
        >
          <Image source={require('../asset/camera.jpg')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
  },
});

export default CameraScreen;
