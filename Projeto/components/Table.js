// DataTable.js

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
//import CustomModal from './MOdal';
//import Ionicons from ""

const DataTable = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pedido, setPedido] = useState([]);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => openModal(item, index)}>
            <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0' }]}>
                <Text style={styles.cell}>{item.Codigo}</Text>
                <Text style={styles.cell}>{item.Cliente}</Text>
                <Text style={styles.cell}>{item.ClienteEmail}</Text>
            </View>
        </TouchableOpacity>
    );

    const openModal = (item, index) => {
        setModalVisible(true);
        setPedido(data[index])
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerCell}>Codigo</Text>
                <Text style={styles.headerCell}>Nome</Text>
                <Text style={styles.headerCell}>Email</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.ID/* .toString() */}
            />
            {/* <CustomModal visible={modalVisible} onClose={closeModal}>
                <Text>Este é um modal personalizado</Text>
            </CustomModal> */}
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
            >
                <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'space-around', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={{ alignItems: 'center', marginHorizontal: '5%' }}>
                        <Text style={{ textAlign: 'center', marginBottom: '5%' }}>Pedido: {pedido.Codigo}</Text>
                        <Text style={{ marginBottom: '15%' }}>Cliente: {pedido.Cliente}</Text>
                        {/* <Ionicons 
                            name="logo-whatsapp"
                            color="#000"
                            size={30}
                            onPress={() => openWhatsApp()}
                        /> */}
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ alignItems: 'center' }}>
                        {/* <Ionicons 
                            name="close-circle"
                            color="#000"
                            size={40}
                            onPress={() => setVisible(!visible)}
                        /> */}
                        <Text>X</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
        borderColor: '#000',
        borderWidth: 1,
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        paddingVertical: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});

export default DataTable;
