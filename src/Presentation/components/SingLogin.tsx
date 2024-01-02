import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamsList } from '../../../App';
import Icons from '../theme/Icons';

interface Props {
    text: string,
}

const SingLogin = () => {

  const { SendIcon } = Icons

  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();


  return (
    <TouchableOpacity
      style={styles.roundedBottom}
      onPress={() => navigation.navigate("Home")}
    >
       <View style={styles.flexBttom}>
          <Text style={styles.textBottom}>Ingresar </Text>
          <SendIcon width={20} height={20}  />
       </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    roundedBottom: {
        width: "100%",
        height: 45,
        display: 'flex',
        alignSelf: 'center',
        backgroundColor: MyColors.black,
        justifyContent: 'center',
        borderRadius: 15,
    }, 
    flexBttom: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    textBottom: {
        color: 'white',
        fontSize: 15,
        fontFamily: MyFont.regular,
    },
    logoLogin: {
        width: 20,
        height: 20,
    }
})
export default SingLogin;
