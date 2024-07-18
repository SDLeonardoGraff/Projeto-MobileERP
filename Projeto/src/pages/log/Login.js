import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AlertBox from "../../../components/Alert";
import { Provider } from "react-native-paper";
import useLogin from "../../hooks/useLogin";
import Loading from "../../../components/Loading";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import GlobalContext from "../../GlobalContext";
import { useContext } from "react";

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(false);
    const [title, setTitle] = useState(false);
    const { login } = useLogin();
    const { updateGlobalState } = useContext(GlobalContext);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const checkLogin = async (name, senha) => {
        if (name === '' || senha === '') {
            setMensagem('Preencha todos os campos!');
            setTitle('Erro');
            showModal();
            return;
        } else {
            try {
                tryLogin(name, senha);
            } catch (error) {
                setMensagem('Erro ao tentar fazer login!');
                setTitle('Erro');
                showModal();
            }
        };
    }

    const tryLogin = async (name, senha) => {
        try {
            setLoading(true);
            const resposta = await login(name, senha);
            if (resposta.errors) {
                setMensagem('Verifique suas credenciais e tente novamente!');
                setTitle('Erro');
                showModal();
                return;
            } else {
                updateGlobalState({tokenDirectus: resposta.data.access_token});
                console.log("(:");
                navigation.navigate('Tabs');
                reset();
            }
        } catch (error) {
            showModal();
            console.debug(error);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setMensagem('');
        setTitle('');
        setPassword('');
        setUsername('');
        //setShowPassword(true);
    };

    console.log()

    return (
        <Provider>
            <LinearGradient
                colors={['#00693E', '#50C878', '#E6FF00']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}>
                <View style={style.container}>
                    <Animatable.View animation="fadeInLeft" delay={500} style={style.containerHeader}>
                        <Text style={style.message}>Bem Vindo(a)</Text>
                    </Animatable.View>

                    <Animatable.View animation="fadeInUp" style={style.containerForm}>
                        <Text style={style.title}>Email</Text>
                        <TextInput
                            placeholder="Digite um email..."
                            style={style.input}
                            value={username}
                            onChangeText={(username) => { setUsername(username) }}
                            keyboardType="email"
                        />

                        <Text style={style.title}>Senha</Text>
                        <TextInput
                            placeholder="Sua Senha"
                            style={style.input}
                            value={password}
                            onChangeText={(password) => { setPassword(password) }}
                            keyboardType="password"
                            secureTextEntry={showPassword}
                        />

                        <TouchableOpacity style={style.button} onPress={() => checkLogin(username, password)}>
                            <Text style={style.buttonText}>Acessar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.buttonRegister}>
                            <Text style={style.registerText}>Não possui uma conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>

                <AlertBox
                    visible={visible}
                    hideModal={hideModal}
                    mensagem={mensagem}
                    title={title} />

            </LinearGradient>
        </Provider>
    )
};

export default Login;

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    containerHeader: {
        marginTop: "25%",
        marginBottom: "8%",
        paddingStart: "5%",
    },
    message: {
        fontSize: 28,
        fontWeight: "bold"
    },
    containerForm: {
        backgroundColor: "#fff",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: "#20BD57",
        width: "100%",
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: "center",
    },
    registerText: {
        color: "#a1a1a1"
    }
})
{/* <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <TextInput
                                    placeholder="Usuário"
                                    textAlign="left"
                                    value={username}
                                    onChangeText={(username) => { setUsername(username) }}
                                    keyboardType="email"
                                    style={{
                                        borderColor: '#000',
                                        paddingHorizontal: '33%',
                                        paddingVertical: '3%',
                                        borderWidth: 1,
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginVertical: '15%',
                                        borderColor: '#000',
                                        borderWidth: 1,
                                    }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <TextInput
                                            placeholder="Senha"
                                            textAlign="left"
                                            value={password}
                                            onChangeText={(password) => { setPassword(password) }}
                                            keyboardType="password"
                                            secureTextEntry={showPassword}
                                            style={{
                                                textAlign: 'left',
                                                paddingHorizontal: '28%',
                                                paddingVertical: '3%',
                                            }}
                                        />
                                        {/* <TouchableOpacity style={{
                                    marginRight: '5%',
                                }}>
                                    <Ionicons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="black"
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => checkLogin(username, password)}
                                    style={{
                                        backgroundColor: '#000',
                                        height: '5%',
                                        width: '45%',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontSize: 20
                                        }}>Logar</Text>
                                </TouchableOpacity>
                                {loading && <Loading />}
                            </View>
                            <AlertBox
                                visible={visible}
                                hideModal={hideModal}
                                mensagem={mensagem}
                                title={title} /> */}
