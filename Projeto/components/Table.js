// DataTable.js

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import moment from 'moment';
//import CustomModal from './MOdal';
//import Ionicons from ""

const DataTable = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [lancamento, setLancamento] = useState([]);

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
        handleLancamento(data[index].Codigo);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const clientDocument = (document) => {
        if (document?.length > 11) {
            return `CNPJ: ${document?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}`;
        } else {
            return `CPF: ${document?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}`
        }
    };

    const handleLancamento = async (value) => {
        
        const url = `https://erp.sdbr.app/api/request/Lancamentos/Pesquisar?documento=Pedido ${value}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization-Token': '5d6c05df95c3cd886a84d92f076d8bc492beb4672b47e68419f5a710d1b31f0d851ea943f348e849b9e002915da3ca4e92584e61cd8f3604e3257a2d321eb4e3ea47f8600a876ec9d27cbbf9a93392e8b85c78783c6a87dc975750214b91cccc1f59760f16ea97af217ca01ae0180d56b5341679f1e64ce0f3284845da9a882c',
                    'User': 'demo@sdbr.app',
                    'App': 'AppSDBR_demo',
                }
            });
            const data = await response.json();
            console.log(data);
            setLancamento(data);
        } catch (error) {
            console.log(error);
        }
    }

    const currencyFormat = (value) => {
        const format = value?.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
        );

        return format;
    };

    const dataFormat = (data) => {
        const newData = moment(data).format("DD/MM/YYYY");

        return newData;
    }

    //console.log(pedido.Items?.length);

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
                <View style={{ backgroundColor: 'white', flex: 1/* , justifyContent: 'space-around' */, borderTopLeftRadius: 25, borderTopRightRadius: 25, marginTop: "5%" }}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: '3%' }}>
                        <View style={{ /* alignItems: 'center', */ marginHorizontal: '3%' }}>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Cliente: {pedido.Cliente}</Text>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Empresa: {pedido.Empresa}</Text>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Origem da Venda: {pedido.OrigemVenda}</Text>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Tabela de Preços: {pedido.Tabela}</Text>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Depósito: {pedido.Deposito}</Text>
                            <Text style={{ /* textAlign: 'center', */ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Pedido: {pedido.Codigo}</Text>
                            {/* <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>{clientDocument(pedido.ClienteCNPJ)}</Text> */}
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Categoria: {pedido.Categoria}</Text>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Vendedor: {pedido.Vendedor}</Text>
                            <Text style={{ marginBottom: '2%', backgroundColor: "yellow", padding: 5, borderColor: 'black', borderWidth: 1 }}>Status do Pedido: {pedido.StatusSistema}</Text>
                            {/* <Ionicons 
                            name="logo-whatsapp"
                            color="#000"
                            size={30}
                            onPress={() => openWhatsApp()}
                        /> */}
                        </View>

                        <View style={{ marginHorizontal: '3%' }}>
                            <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>Grupo de Produtos Padrão - 01</Text>
                            <View>
                                {
                                    pedido.Items ? (
                                        pedido.Items.map((item, index) => (
                                            <View key={index}>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>{item.Descricao}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>{item.Quantidade} Kg</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>{currencyFormat(item.ValorUnitario)}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>{currencyFormat(item.ValorFrete)}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>{currencyFormat(item.ValorTotal)}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#7CFC00", padding: 5, borderColor: 'black', borderWidth: 1 }}>{currencyFormat(item.ValorTotal)}</Text>
                                            </View>
                                        ))
                                    ) :
                                        (
                                            <></>
                                        )
                                }
                            </View>
                        </View>

                        <View style={{ marginHorizontal: '3%' }}>
                            <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Informações Financeiras</Text>
                            <View>
                                {
                                    pedido.Pagamentos ? (
                                        pedido.Pagamentos.map((item, index) => (
                                            <View key={index}>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Plano de contas: {!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta }</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Forma de Pagamento: {item.FormaPagamento}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Valor do Pagamento: {currencyFormat(item.ValorPagamento)}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <></>
                                    )
                                }
                            </View>
                            <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Lancamentos</Text>
                            <View>
                                {
                                    lancamento ? (
                                        lancamento.map((item, index) => (
                                            <View key={index}>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Valor do Pagamento: {item.Codigo}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Descriçaõ: {item.Descricao}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Foi Pago: {!item.Quitado ? "Não" : "Sim"}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Data Vencimento: {dataFormat(item.DataVencimento)}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <></>
                                    )
                                }
                            </View>
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
                    </ScrollView>
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
