import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MyColors, MyFont } from '../theme/AppTheme';
import Icons from '../theme/Icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootParamList } from '../../utils/RootParamList';

interface Props {
  text: string,
  onPress: () => void;
}

const SingLogin: React.FC<Props> = ({ text, onPress }) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const { SendIcon } = Icons;

  return (
    <TouchableOpacity style={styles.roundedBottom} onPress={onPress}>
        <Text style={styles.textBottom}>{text}</Text>
        <SendIcon width={16} height={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedBottom: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: MyColors.black,
    justifyContent: 'center',
    borderRadius: 15,
  },
  textBottom: {
    color: 'white',
    fontSize: 13,
    fontFamily: MyFont.regular,
  },
});

export default SingLogin;
