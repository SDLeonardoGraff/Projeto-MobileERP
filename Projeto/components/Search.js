// Search.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (text) => {
        setQuery(text);
        //onSearch(text);

        const url = `https://erp.sdbr.app/api/request/Pedidos/Pesquisar?cliente=${text}`;

        try{
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization-Token': '5d6c05df95c3cd886a84d92f076d8bc492beb4672b47e68419f5a710d1b31f0d851ea943f348e849b9e002915da3ca4e92584e61cd8f3604e3257a2d321eb4e3ea47f8600a876ec9d27cbbf9a93392e8b85c78783c6a87dc975750214b91cccc1f59760f16ea97af217ca01ae0180d56b5341679f1e64ce0f3284845da9a882c',
                    'User': 'demo@sdbr.app',
                    'App': 'AppSDBR_demo',
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
