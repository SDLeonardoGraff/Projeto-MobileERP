// Form.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';

const NovoPedido = () => {
    const [name, setName] = useState("");
    const [cliente, setCliente] = useState("Leonardo");
    const [statusSistema, setStatusSistema] = useState("Pedido");
    const [vendedor, setVendedor] = useState("Leonardo");
    const [tabelaPreco, setTabelaPreco] = useState("Tabela 2024");
    const [categoria, setCategoria] = useState("Venda CNPJ Fora Estabelecimento");

    const handleSubmit = () => {
        // Validação básica
        /* if (cliente === '' || /* statusSistema === '' ||  vendedor === '' || tabelaPreco === '' || categoria === '') {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        } */
        Alert.alert('Formulário Enviado', `Nome: ${cliente}\nStatus: ${statusSistema}\nVendedor: ${vendedor}\nTabela: ${tabelaPreco}\nCategoria: ${categoria}`);
        // Limpar campos
        setCliente('');
        setStatusSistema('');
        setVendedor('');
        setVendedor('');
        setTabelaPreco('');
        setCategoria('');
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.label}>Cliente</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={cliente}
                    onChangeText={setCliente}
                    keyboardType='default'
                />
                {/* <Text style={styles.label}>Status do Sistema</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={statusSistema}
                    onChangeText={setStatusSistema}
                    keyboardType="default"
                />
                <Text style={styles.label}>Vendedor</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={vendedor}
                    onChangeText={setVendedor}
                    keyboardType="default"
                />
                <Text style={styles.label}>Tabela de Preço</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={tabelaPreco}
                    onChangeText={setTabelaPreco}
                    keyboardType="default"
                />
                <Text style={styles.label}>Categoria</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={categoria}
                    onChangeText={setCategoria}
                    keyboardType="default"
                />
                <Button title="Salvar" onPress={handleSubmit} /> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    label: {
        fontSize: 18,
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default NovoPedido;
