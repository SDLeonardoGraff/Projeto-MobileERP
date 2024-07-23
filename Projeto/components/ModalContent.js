import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const ModalContent = ({ isVisible, onClose, existeNfe }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            animationIn="slideInRight"
            animationOut="slideOutLeft"
        >
            <View style={styles.modalContent}>
                {/* <Text style={styles.modalTitle}>Detalhes do Pedido</Text>
                <Text>Cliente: Leonardo Pereira Duarte Graff</Text>
                <Text>Pedido: 7</Text>
                <Text>Data de Cadastro: 21/12/2023</Text>
                <Text>Vendedor: demo@sdbr.app</Text>
                <Text>Categoria: Venda de Materiais e Serviços</Text>
                <Text>Status do Pedido: Pedido Faturado</Text>*/}
                {
                    existeNfe ? (
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons
                                name="newspaper"
                                color="#000"
                                size={30}
                            />
                            <Text>Imprimir NFe</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons
                                name="newspaper"
                                color="#000"
                                size={30}
                            />
                            <Text>Gerar NFe</Text>
                        </TouchableOpacity>
                    )
                }
                <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Ionicons
                                name="newspaper-outline"
                                color="#000"
                                size={30}
                            />
                            <Text>Imprimir Pedido</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons
                                name="lead-pencil"
                                color="#000"
                                size={30}
                            />
                            <Text>Modificar Pedido</Text>
                        </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center', // Posição do modal
        margin: 0, // Sem margens
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        minWidth: 200, // Largura mínima
        alignSelf: 'center', // Centraliza horizontalmente
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalContent;
