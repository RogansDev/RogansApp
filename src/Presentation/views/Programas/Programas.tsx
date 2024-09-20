import React from "react";
import { View, StyleSheet } from "react-native";
import Video from 'react-native-video';

const Programas = () => {
    return (
        <View style={styles.container}>
            <Video
                source={require('../../../../assets/video/video.mp4')}
                style={styles.video}
                controls={false}
                resizeMode="cover"
                repeat={true} 
                paused={false} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: 300,
    },
});

export default Programas;
