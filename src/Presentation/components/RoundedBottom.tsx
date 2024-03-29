import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MyFont } from '../theme/AppTheme';
import Icons from "../theme/Icons";


const RoundedBottom = ({ title, onPress }: any) => {
  const { SendIcon } = Icons;

  return (
    <TouchableOpacity
      style={styles.roundedBottom}
      onPress={onPress}
    >
      <Text style={styles.textBottom}>{title}</Text>
      <SendIcon width={16} height={16} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  roundedBottom: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 15
  },
  contentNext: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    left: 10,
    top: 6,

  },
  textBottom: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
    fontFamily: MyFont.regular,
  }
})

export default RoundedBottom
