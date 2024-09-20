import React, { useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { MyStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import Icons from '../../theme/Icons'; 

const TratamientoBox = ({ backgroundColor }: { estadoTratamiento: string, backgroundColor?: string }) => {
    const { UbicacionVerde, Calendar, MoreVertical, Editar3Icon, InfoIcon } = Icons;
    const [menuVisible, setMenuVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const openMenu = () => {
        setMenuVisible(true);
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeMenu = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setMenuVisible(false);
        });
    };

    const toggleMenu = () => {
        if (menuVisible) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    return (
        <View style={[Styles.tratamientoBoxContainer, { backgroundColor: backgroundColor || 'white' }]}>
            <View
                style={[
                    Styles.leftLine,
                    { backgroundColor: MyColors.verde[1] },
                ]}
            ></View>
            <View style={Styles.tratamientoBoxContent}>
                <View style={Styles.textContainer}>
                    <Text style={Styles.title}>Implante Capilar</Text>
                    <Text style={Styles.subTitle}>Procedimiento clínico</Text>
                </View>
                <TouchableOpacity style={Styles.moreIconContainer} onPress={toggleMenu}>
                    <MoreVertical width={20} height={20} color={MyColors.neutroDark[4]} />
                </TouchableOpacity>
                {menuVisible && (
                    <Animated.View
                        style={[
                            Styles.menu,
                            {
                                opacity: opacityAnim,
                                transform: [
                                    {
                                        translateY: slideAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-10, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <TouchableOpacity style={Styles.menuItem} onPress={() => { }}>
                            <InfoIcon width={22} height={22} />
                            <Text style={Styles.menuText}>Ver detalles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.menuItem} onPress={() => { }}>
                            <Editar3Icon width={22} height={22} />
                            <Text style={Styles.menuText}>Editar tratamiento</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
            <View style={Styles.detailsSection}>
                <Text style={Styles.detailsTitle}>Detalles</Text>
                <View style={Styles.iconRow}>
                    <View style={Styles.iconContainer}>
                        <Calendar width={16} height={16} />
                        <Text style={Styles.detailsText}>30 Sep 2024 - 10:00 a.m.</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    tratamientoBoxContainer: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: MyColors.neutro[2],
        shadowOffset: { width: 20, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 15,
        position: 'relative',
    },
    leftLine: {
        width: 4,
        position: 'absolute',
        left: 10,
        top: 15,
        bottom: 15,
        borderRadius: 2,
    },
    tratamientoBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 20,
        position: 'relative', 
        zIndex: 10, 
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
        flex: 1, 
    },
    title: {
        fontSize: 18,
        fontFamily: MyFont.medium,
        color: MyColors.verde[3],
    },
    subTitle: {
        fontSize: 13,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
    },
    detailsSection: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'column', 
    },
    detailsTitle: {
        fontSize: 13,
        color: MyColors.neutroDark[4],
        fontFamily: MyFont.regular,
        marginBottom: 5, 
    },
    iconRow: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15, 
    },
    detailsText: {
        fontSize: 13,
        color: MyColors.neutro[2],
        fontFamily: MyFont.regular,
        marginLeft: 5,  
        lineHeight: 16, 
    },
    moreIconContainer: {
        padding: 5,
        zIndex: 20, 
    },
    menu: {
        position: 'absolute',
        right: 25,
        top: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        zIndex: 1000, 
        paddingVertical: 5,
    },
    menuItem: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 16,
        color: MyColors.neutro[1],
        fontFamily: MyFont.Poppins[400],
    },
});

export default TratamientoBox;
