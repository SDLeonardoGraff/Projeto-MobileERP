// DataTable.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import moment from 'moment';
import Divider from './DividerComp';
//import CustomModal from './MOdal';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ModalContent from './ModalContent';
import { TOKEN_ERP_ZAGO, USER_ERP_ZAGO, APP_ERP_ZAGO } from '@env';

const DataTable = ({ data }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [existeNfe, setExisteNfe] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [lancamento, setLancamento] = useState([]);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => openModal(item, index)}>
            <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e0e0e0' }]}>
                {/* <Text style={styles.cell}>{item.Codigo}</Text>
                <Text style={styles.cell}>{item.Cliente}</Text> */}
                <Text style={{ flexBasis: 80, paddingLeft: '5%', paddingVertical: 10 }}>{item.Codigo}</Text>
                <Text style={{ flexBasis: 400, paddingLeft: "5%", paddingVertical: 10 }}>{item.Cliente}</Text>
            </View>
        </TouchableOpacity>
    );

    const openModal = (item, index) => {
        setModalVisible(true);
        setPedido(data[index]);
        handleLancamento(data[index].Codigo);
    };

    //console.log(TOKEN_ERP);

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

    useEffect(() => {
        const verificaNfe = (pedido) => {
            if (pedido.NumeroNFe === null || pedido.NumeroNFe === undefined || pedido.NumeroNFe === '') {
                setExisteNfe(existeNfe);
            } else {
                setExisteNfe(!existeNfe);
            }
        }
        verificaNfe(pedido);
    }, []);

    const handleLancamento = async (value) => {

        const url = `https://erp.sdbr.app/api/request/Lancamentos/Pesquisar?documento=Pedido ${value}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization-Token': TOKEN_ERP_ZAGO,
                    'User': USER_ERP_ZAGO,
                    'App': APP_ERP_ZAGO,
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
        const format = value.toLocaleString(
            'pt-BR',
            { style: 'currency', currency: 'BRL' }
        );

        return format;
    };

    const dataFormat = (data) => {
        const newData = moment(data).format("DD/MM/YYYY");

        return newData;
    };

    const toggleModal = () => {
        setMenuVisible(!menuVisible);
    }

    //console.log(pedido.Items?.length);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ flexBasis: 80, paddingLeft: '5%', fontWeight: 'bold', }}>Codigo</Text>
                <Text style={{ flexBasis: 400, paddingLeft: "5%", fontWeight: 'bold', }}>Nome</Text>
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
                <View style={{ backgroundColor: 'white', flex: 1/* , justifyContent: 'space-around' */, borderTopLeftRadius: 25, borderTopRightRadius: 25, /* marginTop: "5%" */ }}>
                    {/* <View style={{marginRight: '3%', borderRadius: 25}}>
                    <Text style={{fontSize: 24, alignSelf: 'flex-end'}}>X</Text>
                </View> */}
                    <View style={{ backgroundColor: "#ddd", flexDirection: 'row', padding: '2%', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ flex: 1, alignItems: 'flex-start' }}>
                            <AntDesign
                                name="leftcircleo"
                                color="#000"
                                size={40}
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 3, alignItems: 'center' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Venda</Text>
                        </View>
                        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={{ flex: 1, alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons
                                name="menu"
                                color="#000"
                                size={40}
                            />
                        </TouchableOpacity>
                    </View>

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

                            <View style={{ marginLeft: '3%', /* borderColor: 'black', borderWidth: 1, */ marginRight: '30%', marginTop: 5 }}>
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
                                    <Text style={{ /* marginBottom: '2%', */ /* backgroundColor: "#eaeff6", */ padding: 5/* , borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{dataFormat(pedido.Data)}</Text>
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

                        <View style={{ marginBottom: 5 }}>
                            <Text style={{/*  marginBottom: '2%', padding: 5, borderColor: 'black', borderWidth: 1 */paddingRight: 20, paddingLeft: 20, paddingTop: 20, backgroundColor: "#D3D3D3", fontSize: 18 }}>Grupo de Produtos</Text>
                            {/* <Divider /> */}
                            {/*  */}<View style={{ marginHorizontal: '3%' }}>
                                {
                                    pedido.Items ? (
                                        pedido.Items.map((item, index) => (
                                            <View key={index}>
                                                <View style={{ marginTop: 5 }}>
                                                    <Text style={{ color: "#8A2BE2", fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>{item.Descricao}</Text>
                                                    <View style={{ marginTop: '3%' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Quantidade</Text>
                                                        <Text>{item.Quantidade} KG/ UN</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', gap: 50, marginTop: '2%' }}>
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Valor Un.</Text>
                                                            <Text>{currencyFormat(item.ValorUnitario)}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>SubTotal</Text>
                                                            <Text>{currencyFormat(item.ValorTotal)}</Text>
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

                        {
                            pedido.Pagamentos ? (
                                <View style={{ marginBottom: 5 }}>
                            <Text style={{/*  marginBottom: '2%', padding: 5, borderColor: 'black', borderWidth: 1 paddingRight: 20,*/ paddingLeft: 20, paddingTop: 20, backgroundColor: "#D3D3D3", fontSize: 18 }}>Informações Financeiras</Text>
                            {/* <Divider />*/}
                            <View style={{ marginHorizontal: '3%' }}>
                                <View>
                                    {
                                            pedido.Pagamentos.map((item, index) => (
                                                <View key={index}>

                                                    <View style={{ /*marginLeft: '1%',  borderColor: 'black', borderWidth: 1,  marginRight: '30%'*/ marginTop: 5 }}>
                                                        <View style={{ marginBottom: '2%' }}>
                                                            <Text style={{ marginLeft: 5,/* */ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Plano De Contas</Text>
                                                            <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 5 /*, borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                        </View>
                                                    </View>

                                                    <Divider />
                                                    {/* <View>
                                                        <Text>Plano De Contas</Text>
                                                        <Text>{!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                    </View> */}
                                                    <View style={{ marginBottom: '2%' }}>
                                                        <Text style={{ marginLeft: 5, /**/ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Forma de Pagamento</Text>
                                                        <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 5 /*, borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{item.FormaPagamento}</Text>
                                                    </View>

                                                    <Divider />

                                                    <View /* style={{ marginBottom: '2%' }} */>
                                                        <Text style={{ marginLeft: 5, /**/ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Valor do Pagamento</Text>
                                                        <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 5 /*, borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{currencyFormat(item.ValorPagamento)}</Text>
                                                    </View>

                                                    {/* <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Plano de contas: {!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                    <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Forma de Pagamento: {item.FormaPagamento}</Text>
                                                    <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Valor do Pagamento: {currencyFormat(item.ValorPagamento)}</Text> */}
                                                </View>
                                            ))
                                    }
                                </View>
                            </View>
                        </View>
                            ) : (
                                <></>
                            )
                        }

                        {
                            lancamento.length > 0 ? (
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={{/*  marginBottom: '2%', padding: 5, borderColor: 'black', borderWidth: 1 */paddingRight: 20, paddingLeft: 20, paddingTop: 20, backgroundColor: "#D3D3D3", fontSize: 18 }}>Lançamentos</Text>
                                    <View style={{ marginHorizontal: '3%' }}>
                                    <View>
                                    {
                                            lancamento.map((item, index) => (
                                                <View key={index}>
                                                    <View style={{ /*marginLeft: '1%',  borderColor: 'black', borderWidth: 1,  marginRight: '30%'*/ marginTop: 5 }}>
                                                        <View style={{ marginBottom: '2%' }}>
                                                            <Text style={{ /* marginLeft: 5, */ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Código do Lançamento</Text>
                                                            <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 1 /*, borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{item.Codigo}</Text>
                                                        </View>
                                                    </View>
                                                    <Divider />
                                                    {/* <View>
                                                        <Text>Plano De Contas</Text>
                                                        <Text>{!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                    </View> */}
                                                    <View style={{ marginBottom: '2%' }}>
                                                        <Text style={{ /* marginLeft: 5, */ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Data de Vencimento</Text>
                                                        <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 1 /*, borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{dataFormat(item.DataVencimento)}</Text>
                                                    </View>
                                                    <Divider />
                                                    <View style={{ marginBottom: '2%' }}>
                                                        <Text style={{ /* marginLeft: 5, */ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Valor do Pagamento</Text>
                                                        <Text style={{ /* marginBottom: '2%', *//*  backgroundColor: "#eaeff6", */ padding: 1 /*, borderColor: 'black', borderWidth: 1 */, /* borderBottomColor: "#000", borderBottomWidth: 1 *//* borderRadius: 10, borderColor: "#000", borderWidth: 1 */ }}>{currencyFormat(item.Valor)}</Text>
                                                    </View>
                                                    <Divider />
                                                    {/* <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Plano de contas: {!pedido.PlanoDeConta ? "Nenhum plano de contas encontrado" : pedido.PlanoDeConta}</Text>
                                                    <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Forma de Pagamento: {item.FormaPagamento}</Text>
                                                    <Text style={{ marginBottom: '2%', backgroundColor: "#F08080", padding: 5, borderColor: 'black', borderWidth: 1 }}>Valor do Pagamento: {currencyFormat(item.ValorPagamento)}</Text> */}
                                                    <View /* style={{ marginBottom: '2%' }} */>
                                                        <Text style={{ /* marginLeft: 5, */ borderRadius: 10, fontWeight: 'bold', fontSize: 14 }}>Quitado</Text>
                                                        <Text style={{ color: `${!item.Quitado ? "red" : "green"}` }}>{!item.Quitado ? "Não" : "Sim"}</Text>
                                                    </View>
                                                </View>
                                            ))
                                    }
                                </View>
                                    </View>
                                </View>
                            ) : (
                                <></>
                            )
                        }

                        <ModalContent isVisible={menuVisible} onClose={toggleModal} existeNfe={existeNfe} />
                        {/* {
                            menuVisible ?
                            <Animatable.View
                            animation="fadeInLeft" delay={500}
                            //visible={menuVisible}
                            //transparent={true}
                            style={{
                                borderTopLeftRadius: 25, borderTopRightRadius: 25, justifyContent: 'flex-end', minHeight: 500,
                                marginLeft: 200,// Posição do modal
                                margin: 0,
                                backgroundColor: '#000'
                            }}>
                            <View style={{
                                borderColor: '#000',
                                borderWidth: 1,
                                padding: 20,
                                borderTopLeftRadius: 10,
                                minHeight: 500,
                                marginLeft: 200,
                                borderBottomLeftRadius: 10, marginTop: "15%"
                            }}>
                                <Text style={{ color: '#fff' }}>Olá</Text>
                            </View>
                        </Animatable.View>
                        : <></>
                    } */}
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
        textAlign: 'left',

    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        //textAlign: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
});

export default DataTable;
