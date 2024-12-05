import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons';
import ButtonSmall from "../buttons/ButtonSmall";

const FormulasMedicasBox = ({ pdfTitle, consultationDate, issue, price, pressAction = () => {}, pressComprar = () => {}, pago = true}: { pdfTitle: string, consultationDate: string, issue: string, price: string, pressAction: any, pressComprar: any, pago: any }) => {
    const { DocumentoIcon, Calendar, Doctor, DineroVerde, TickCircleIcon } = Icons;

    return (
        <View style={styles.formulasMedicasBoxContainer}>
            <View style={styles.leftLine}></View>
            <View style={styles.formulasMedicasBoxContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>Fórmula médica</Text>
                    <Text style={styles.pdfTitle}>{pdfTitle}</Text>
                    <View style={styles.detailsSection}>
                        <View style={{flexDirection: 'row', gap: 6,}}>
                            <Calendar width={17} height={17} />
                            <Text style={styles.consultationDate}>{consultationDate}</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 6,}}>
                            <Doctor width={17} height={17} />
                            <Text style={styles.issue}>{issue}</Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 6,}}>
                            <DineroVerde width={17} height={17} />
                            <Text style={styles.issue}>{price}</Text>
                        </View>
                    </View>
                    {pago ? (
                        <View style={styles.pagadoBox}>
                            <TickCircleIcon width={15} height={15} />
                            <Text style={styles.pagado}>Pagado</Text>
                        </View>
                        
                    ):(
                        <ButtonSmall text="Comprar" width={110} pressAction={pressComprar} />
                    )}
                    
                </View>
                
                <View>
                    <TouchableOpacity style={styles.pdfContainer} onPress={pressAction}>
                        <DocumentoIcon width={45} height={45} />
                        <Text style={styles.pdfTextBtn}>PDF</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formulasMedicasBoxContainer: {
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
    formulasMedicasBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 15,
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
        fontSize: 14,
        color: MyColors.neutro[4],
        fontFamily: MyFont.Poppins[700],
    },
    subtitle: {
        fontSize: 14,
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
        fontSize: 14,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
        marginBottom: 5,
    },
    issue: {
        fontSize: 14,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.medium,
        marginBottom: 5,
    },
    pagadoBox: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: MyColors.neutroDark[4],
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        gap: 5,
        marginTop: 8,
    },
    pagado: {
        fontSize: 14,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.medium,
    }
});

export default FormulasMedicasBox;
