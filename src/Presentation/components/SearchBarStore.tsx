import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MyColors, MyFont } from "../theme/AppTheme";
import Icons from '../theme/Icons';

const SearchBar = ({ onSearch, resetSearch }: any) => {
    const { LupaIcon, CloseIcon } = Icons;

    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<TextInput | null>(null);

    useEffect(() => {
        if (searchQuery === '') {
            resetSearch();
        } else {
            onSearch(searchQuery);
        }
    }, [searchQuery]);

    const handleSearch = () => {
        onSearch(searchQuery);
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSearch} style={styles.icon}>
                <LupaIcon width={20} height={20}/>
            </TouchableOpacity>
            <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="¿Qué especialidad buscas?"
                    placeholderTextColor="#000000"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#F0F0F0B2',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 20,
    },
    input: {
        fontFamily: MyFont.regular,
        fontSize: 13,
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    icon: {
        padding: 10,
    },
    infoTitle: {
        fontFamily: MyFont.regular,
        fontSize: 13,
        marginLeft: 10,
        flex: 1,
    },
    infoText: {
        fontFamily: MyFont.regular,
        fontSize: 12,
        color: '#909090',
        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
    },
    bulletPoint: {
        marginHorizontal: 3,
    }
});

export default SearchBar;
