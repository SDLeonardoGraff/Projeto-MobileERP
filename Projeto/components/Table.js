// DataTable.js

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import moment from 'moment';
import Divider from './DividerComp';
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
                    {/* <View style={{marginRight: '3%', borderRadius: 25}}>
                    <Text style={{fontSize: 24, alignSelf: 'flex-end'}}>X</Text>
                </View> */}
                    <ScrollView /* contentContainerStyle={{ paddingHorizontal: '3%' }} */>
                        <View style={{ /* alignItems: 'center',  marginHorizontal: '3%',*/ marginBottom: 15, gap: 10 }}>
                            {/* <Text style={{
                                /* borderWidth: 1,
                                borderColor: '#ccc',
                                padding: 10,
                                borderRadius: 5,
                                marginLeft: 5,
                            }}>Informações do Pedido</Text> */}
                            {/* <Divider /> */}

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Cliente</Text>
                                    <Text style={{ /* marginBottom: '2%', */ /* backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{pedido.Cliente}</Text>
                                </View>
                            </View>

                            <Divider />

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Pedido</Text>
                                    <Text style={{ /* marginBottom: '2%', */ /* backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{pedido.Codigo}</Text>
                                </View>
                            </View>

                            <Divider />
                            {/* <View style={{ marginHorizontal: '3%', borderColor: 'black', borderWidth: 1, marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, }}>Empresa</Text>
                                    <Text style={{ /* marginBottom: '2%', backgroundColor: "#ccc", padding: 5/* , borderColor: 'black', borderWidth: 1 , borderBottomColor: "#000", borderBottomWidth: 1 }}>{pedido.Empresa}</Text>
                                </View>
                            </View> */}

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Data de Cadastro</Text>
                                    <Text style={{ /* marginBottom: '2%', */ /* backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{moment(pedido.Data).format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>

                            <Divider />

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Vendedor</Text>
                                    <Text style={{ /* marginBottom: '2%', */ /* backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{pedido.Vendedor}</Text>
                                </View>
                            </View>

                            <Divider />

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Categoria</Text>
                                    <Text style={{ /* marginBottom: '2%', */ /* backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{pedido.Categoria}</Text>
                                </View>
                            </View>

                            <Divider />

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%' }}>
                                <View>
                                    <Text style={{ marginLeft: 5, borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Status do Pedido</Text>
                                    <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{pedido.StatusSistema}</Text>
                                </View>
                            </View>

                            {/* <Divider /> */}

                            {/* <View style={{ marginLeft: '3%',  borderColor: 'black', borderWidth: 1, marginRight: '30%' }}>
                                <View>
                                <Text style={{marginLeft: 5, borderRadius: 10,}}>Tabela de Preços</Text>
                                <Text style={{ /* marginBottom: '2%', backgroundColor: "#eaeff6", padding: 5 , borderColor: 'black', borderWidth: 1 , borderBottomColor: "#000", borderBottomWidth: 1 borderRadius: 10, borderColor: "#000", borderWidth: 1}}>{pedido.Tabela}</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: '3%', borderColor: 'black', borderWidth: 1,  marginRight: '30%' }}>
                                <View>
                                <Text style={{marginLeft: 5, borderRadius: 10,}}>Depósito</Text>
                                <Text style={{ /* marginBottom: '2%', backgroundColor: "#eaeff6", padding: 5, borderColor: 'black', borderWidth: 1 , borderBottomColor: "#000", borderBottomWidth: 1 borderRadius: 10, borderColor: "#000", borderWidth: 1}}>{pedido.Deposito}</Text>
                                </View>
                            </View> */}
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={{/*  marginBottom: '2%', padding: 5, borderColor: 'black', borderWidth: 1 */paddingRight: 20, paddingLeft: 20, paddingTop: 20, backgroundColor: "#D3D3D3", fontSize: 18 }}>Grupo de Produtos</Text>
                            {/* <Divider /> */}
                            {/*  */}<View style={{ marginHorizontal: '3%' }}>
                                {
                                    pedido.Items ? (
                                        pedido.Items.map((item, index) => (
                                            <View key={index}>
                                                <View>
                                                    <Text style={{ color: "#BA55D3", fontSize: 16 }}>{item.Descricao}</Text>
                                                    <View>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Quantidade</Text>
                                                        <Text>{item.Quantidade} KG/ UN</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', gap: 50 }}>
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Valor Un.</Text>
                                                            <Text>{item.ValorUnitario}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>SubTotal</Text>
                                                            <Text>{item.ValorTotal}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        ))
                                    ) :
                                        (
                                            <></>
                                        )
                                }
                            </View>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={{/*  marginBottom: '2%', padding: 5, borderColor: 'black', borderWidth: 1 */paddingRight: 20, paddingLeft: 20, paddingTop: 20, backgroundColor: "#D3D3D3", fontSize: 18 }}>Informações Financeiras</Text>
                            {/* <Divider />*/}
                            <View style={{ marginHorizontal: '3%' }}>
                                <View>
                                    {
                                        pedido.Pagamentos ? (
                                            pedido.Pagamentos.map((item, index) => (
                                                <View key={index}>
                                                    <View>
                                                        <Text>Plano De Contas</Text>
                                                        <Text>{!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                    </View>
                                                    <View>
                                                        <Text>Forma de Pagamento</Text>
                                                        <Text>{item.FormaPagamento}</Text>
                                                    </View>
                                                    <View>
                                                        <Text>Valor do Pagamento</Text>
                                                        <Text>{currencyFormat(item.ValorPagamento)}</Text>
                                                    </View>
                                                    {/* <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Plano de contas: {!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                    <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Forma de Pagamento: {item.FormaPagamento}</Text>
                                                    <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Valor do Pagamento: {currencyFormat(item.ValorPagamento)}</Text> */}
                                                </View>
                                            ))
                                        ) : (
                                            <></>
                                        )
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={{ marginBottom: 15 }}>
                            <Text style={{/*  marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1  */marginLeft: 5, }}>Lancamentos</Text>
                            {/* <Divider />
                            <View style={{ marginHorizontal: '3%' }}>
                                {
                                    lancamento ? (
                                        lancamento.map((item, index) => (
                                            <View key={index}>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Código Lançamento: {item.Codigo}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Descrição: {item.Descricao}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Foi Pago: {!item.Quitado ? "Não" : "Sim"}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Data Vencimento: {dataFormat(item.DataVencimento)}</Text>
                                                <Text style={{ marginBottom: '2%', backgroundColor: "#87CEEB", padding: 5, borderColor: 'black', borderWidth: 1 }}>Valor: {currencyFormat(item.Valor)}</Text>
                                            </View>
                                        ))
                                    ) : (
                                        <></>
                                    )
                                }
                            </View> */}
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
