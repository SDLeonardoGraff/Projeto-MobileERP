// Search.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TOKEN_ERP_ZAGO, USER_ERP_ZAGO, APP_ERP_ZAGO } from '@env';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (text) => {
        setQuery(text);
        //onSearch(text);

        const url = `https://erp.sdbr.app/api/request/Pedidos/Pesquisar?cliente=${text}`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization-Token': TOKEN_ERP_ZAGO,
                    'User': USER_ERP_ZAGO,
                    'App': APP_ERP_ZAGO,
                }
            });
            const data = await response.json();
            onSearch(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Insira o nome do Cliente..."
                value={query}
                onChangeText={handleSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

export default Search;
