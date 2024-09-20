import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";

const CitaCard = ({}: any) => {
    return (
        <View style={Styles.citaCardContainer}>
            <View style={Styles.dateContainer}>
                <Text style={Styles.dayOfWeek}>Lunes</Text>
                <Text style={Styles.dayNumber}>15</Text>
                <Text style={Styles.month}>Noviembre</Text>
            </View>
            <View style={Styles.detailsContainer}>
                <View style={Styles.timeAndTypeContainer}>
                    <Text style={Styles.timeAndType}>11:00 AM | Telemedicina</Text>
                    <View style={Styles.bottomBorder} />
                </View>
                <Text style={Styles.procedure}>Botox</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text style={Styles.moreInfoText}>Más información</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={Styles.editScheduleText}>Reprogramar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    citaCardContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(159, 237, 226, 0.4)', 
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    dateContainer: {
        backgroundColor: MyColors.verde[3],
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        width: 88,
    },
    dayOfWeek: {
        fontSize: MyFont.size[8],
        color: MyColors.white,
        fontFamily: MyFont.regular,
        marginBottom: 2,
    },
    dayNumber: {
        fontSize: MyFont.size[3],
        color: MyColors.white,
        fontFamily: MyFont.Poppins[600],
        lineHeight: 40,
    },
    month: {
        fontSize: MyFont.size[8],
        color: MyColors.white,
        fontFamily: MyFont.regular,
        lineHeight: 12,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    timeAndTypeContainer: {
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    timeAndType: {
        fontSize: MyFont.size[7],
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.Poppins[400],
        marginBottom: 15,
    },
    bottomBorder: {
        height: 1,
        backgroundColor: MyColors.neutroDark[4],
        marginTop: -5,
    },
    procedure: {
        fontSize: MyFont.size[5],
        color: MyColors.black,
        fontFamily: MyFont.Poppins[500],
    },
    moreInfoText: {
        fontSize: MyFont.size[7],
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.Poppins[400],
    },
    editScheduleText: {
        fontSize: MyFont.size[7],
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.Poppins[400],
    },
});

export default CitaCard;
