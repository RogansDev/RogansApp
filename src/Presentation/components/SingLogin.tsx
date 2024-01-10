import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import Icons from '../theme/Icons';

interface Props {
  text: string,
  onPress: () => void;
}

const SingLogin: React.FC<Props> = ({ text, onPress }) => {
  const { SendIcon } = Icons;

  return (
    <TouchableOpacity style={styles.roundedBottom} onPress={onPress}>
      <View style={styles.flexBttom}>
        <Text style={styles.textBottom}>{text}</Text>
        <SendIcon width={20} height={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedBottom: {
    width: '100%',
    height: 45,
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: MyColors.black,
    justifyContent: 'center',
    borderRadius: 15,
  },
  flexBttom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textBottom: {
    color: 'white',
    fontSize: 15,
    fontFamily: MyFont.regular,
  },
});

export default SingLogin;
