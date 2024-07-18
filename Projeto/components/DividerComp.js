import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider() {
    return (
        <View style={styles.divider} />
    )
}

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        marginTop: '2%',
        marginBottom: '2%',
    },
});