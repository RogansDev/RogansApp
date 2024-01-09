import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamList } from '../../utils/RootParamList';
import { MyFont } from '../theme/AppTheme';
import Icons from "../theme/Icons";

interface CustomHeaderProps {
  navigation: StackNavigationProp<RootParamList, keyof RootParamList>;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ navigation }) => {
  const { ArrowLeftBright } = Icons;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack()}>
        <ArrowLeftBright width={15} height={15}/>
        <Text style={{marginLeft: 10, fontFamily: MyFont.regular, color: 'white'}}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
