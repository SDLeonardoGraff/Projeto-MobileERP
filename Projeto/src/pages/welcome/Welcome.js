import { LinearGradient } from "expo-linear-gradient";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native"

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['#50C878', '#00693E', "#000"/* '#E6FF00' */]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}>
            <View style={style.container}>
                <View style={style.imgContainer}>
                    <Animatable.Image
                        delay={200}
                        animation="flipInY"
                        source={require("../../../assets/logo.png")}
                        style={style.image}
                        resizeMode="contain"
                    />
                </View>

                <Animatable.View delay={700} animation="fadeInUp" style={style.containerForm}>
                    <Text style={style.title}>Gerencie melhor e venda mais com Diinz ERP!</Text>
                    <Text style={style.text}>Faça login para começar</Text>

                    <TouchableOpacity style={style.button} onPress={ () => navigation.navigate("Login")}>
                        <Text style={style.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </LinearGradient>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '70%',
    },
    imgContainer: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        marginTop: 28
    },
    text: {
        color: "#a1a1a1"
    },
    button: {
        position: "absolute",
        backgroundColor: "#50C878",
        borderRadius: 50,
        paddingVertical: 10,
        width: "60%",
        alignSelf: "center",
        bottom: "15%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold"
    }
})