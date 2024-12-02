import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';

const ExamenesBox = ({ pdfTitle, consultationDate, issue, pressAction = () => {}, }: { pdfTitle: string, consultationDate: string, issue: string, pressAction: any }) => {
    const { DocumentoIcon, Calendar, DocumentoVerde } = Icons;

    return (
        <View style={styles.examenesBoxContainer}>
            <View style={styles.leftLine}></View>
            <View style={styles.examenessBoxContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>Orden de exámenes</Text>
                    <Text style={styles.pdfTitle}>{pdfTitle}</Text>
                    <View style={styles.detailsSection}>
                        <View style={{flexDirection: 'row', gap: 6,}}>
                            <Calendar width={20} height={20} />
                            <Text style={styles.consultationDate}>{consultationDate}</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 6,}}>
                            <DocumentoVerde width={20} height={20} />
                            <Text style={styles.issue}>{issue}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.pdfContainer} onPress={pressAction}>
                    <DocumentoIcon width={50} height={50} />
                    <Text style={styles.pdfTextBtn}>PDF</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    examenesBoxContainer: {
        flexDirection: 'column',
        padding: 15,
        borderRadius: 10,
        backgroundColor: MyColors.white,
        marginBottom: 20,
        shadowColor: MyColors.neutro[2],
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        position: 'relative',
    },
    leftLine: {
        width: 4,
        position: 'absolute',
        left: 10,
        top: 15,
        bottom: 15,
        backgroundColor: MyColors.verde[1],
        borderRadius: 2,
    },
    examenessBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 10,
        position: 'relative',
        zIndex: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    pdfContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pdfTextBtn: {
        fontSize: 16,
        color: MyColors.neutro[4],
        fontFamily: MyFont.Poppins[700],
    },
    subtitle: {
        fontSize: 16,
        color: MyColors.neutroDark[3],
        fontFamily: MyFont.medium,
        marginBottom: 5,
    },
    pdfTitle: {
        fontSize: 18,
        color: MyColors.neutro[2],
        fontFamily: MyFont.bold,
        marginBottom: 8,
    },
    detailsSection: {
        marginTop: 5,
    },
    consultationDate: {
        fontSize: 16,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
        marginBottom: 5,
    },
    issue: {
        fontSize: 16,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.medium,
    },
});

export default ExamenesBox;
