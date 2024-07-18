import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate("Welcome");
    }

    const handleAppConfig = () => {
        navigation.navigate("App");
    }

    const handleContaConfig = () => {
        navigation.navigate("Conta");
    }

    const handleEmpresa = () => {
        navigation.navigate("Empresa");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Configurações</Text>
            <View style={styles.profileSection}>
                <Image
                    /* source={{ uri: 'https://via.placeholder.com/150' }} */
                    source={require("./assets/user.png")}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Leonardo Graff</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={ () => handleContaConfig() }>
                <Text style={styles.buttonText}>Configurações da Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ () => handleAppConfig() }>
                <Text style={styles.buttonText}>Configurações do Aplicativo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ () => handleEmpresa() }>
                <Text style={styles.buttonText}>Minha Empresa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout()}>
                <Text style={styles.logoutButtonText}>Sair do ERP</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Versão 1.1.18</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 18,
        color: '#7E57C2',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#FF0000',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
    versionText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
});

export default SettingsScreen;
