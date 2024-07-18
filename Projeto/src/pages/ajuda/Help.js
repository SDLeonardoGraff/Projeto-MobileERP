import { TouchableOpacity, Text, View, Button, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";

const Help = () => {
    const whatsNumber = '5121890989';
    const mensagem = 'Olá, gostaria de saber mais sobre a plataforma SDBR Soluções!';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsNumber}&text=${encodeURIComponent(mensagem)}`;

    const openWhatsApp = () => {
        Linking.openURL(whatsappUrl)
        .then((supported) => {
            if (supported) {
                return Linking.openURL(whatsappUrl);
            } else {
                console.log("Não é possível abrir o WhatsApp " + whatsappUrl);
            }
        })
        .catch((error) => {
            console.log("Ouve um erro", error);
        })
    }

    return (
        <LinearGradient
            colors={['#939191', '#666666', "#3B3B3B"/* '#E6FF00' */]}
            start={{ x: 1, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
            }}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}>Olá, que bom ver você por aqui! :)</Text>
                <Entypo name="chat" color="000" size={50}></Entypo>
                <Text style={{
                    fontSize: 14,
                    textAlign: 'center',
                    marginVertical: 20,
                }}>Se você está precisando de ajuda, quer deixar alguma sugestão ou crítica, basta entrar em contato com nossa equipe de suporte clicando no botão abaixo!</Text>
                <Text style={{
                    fontSize: 14,
                    marginBottom: 20,
                }}>Teremos prazer em atender você.</Text>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{
                        borderColor: '#FFFFFF',
                        borderWidth: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                    }} onPress={ () => openWhatsApp() }>
                        <Text style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                        }}>Entrar em contato</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Help;