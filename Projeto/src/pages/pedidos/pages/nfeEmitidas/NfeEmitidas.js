// App.js

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Search from '../../../../../components/Search';
import DataTable from '../../../../../components/Table';

const NfeEmitidas = () => {
    const [data, setData] = useState([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' },
        // Adicione mais dados conforme necessário
    ]);

    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (query) => {
        /* const filtered = data.filter(
            (item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.email.toLowerCase().includes(query.toLowerCase())
        ) */;
        setFilteredData(filtered);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Search onSearch={handleSearch} />
            </View>
            <View style={styles.tableContainer}>
                <DataTable data={filteredData} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    tableContainer: {
        flex: 1,
    },
});

export default NfeEmitidas;
