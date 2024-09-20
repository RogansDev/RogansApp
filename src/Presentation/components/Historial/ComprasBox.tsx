import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { MyColors, MyFont } from "../../../Presentation/theme/AppTheme";

const ComprasBox = ({ imageSource, productName, price, purchaseDate }: { imageSource: any, productName: string, price: string, purchaseDate: string }) => {
    return (
        <View style={styles.comprasBoxContainer}>
            <Image source={imageSource} style={styles.productImage} />
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productPrice}>{price}</Text>
            <Text style={styles.purchaseDate}>{purchaseDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    comprasBoxContainer: {
        width: 120, 
        borderRadius: 10,
        backgroundColor: MyColors.white,
        padding: 10,
        marginBottom: 20,
        shadowColor: MyColors.neutro[2],
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
        marginRight: 20,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 14,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.medium,
        textAlign: 'center',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        color: MyColors.verde[3],
        fontFamily: MyFont.bold,
        textAlign: 'center',
        marginBottom: 5,
    },
    purchaseDate: {
        fontSize: 12,
        color: MyColors.neutroDark[3],
        fontFamily: MyFont.regular,
        textAlign: 'center',
    },
});

export default ComprasBox;
