// Form.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';

const NovoPedido = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        // Validação básica
        if (name === '' || email === '') {
            Alert.alert('Erro', 'Todos os campos são obrigatórios');
            return;
        }
        Alert.alert('Formulário Enviado', `Nome: ${name}\nEmail: ${email}`);
        // Limpar campos
        setName('');
        setEmail('');
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu nome"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Button title="Enviar" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
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
