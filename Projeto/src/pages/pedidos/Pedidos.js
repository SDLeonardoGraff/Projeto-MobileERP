import { Text, TouchableOpacity, View } from "react-native";
//import { View } from "react-native-animatable"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Pedidos = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
            {/* <TouchableOpacity>
                <Text>Pedidos</Text>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => {
                navigation.navigate('Novo Pedido');
                //alert("Pedidos");
            }} activeOpacity={0.9}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'column', width: 120, height: 120,/*padding: 10, paddingLeft: 10, paddingRight: 10, */ alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                    <MaterialIcons
                            name="add-business"
                            size={50}
                            color="#0CE029"
                        /> 
                    <Text style={{ textAlign: 'center', justifyContent: 'flex-end', /* paddingTop: '6%' ,*/ paddingBottom: '3%', fontSize: 14 }}>Novo Pedido</Text>
                </View></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Buscar Pedido');
                //alert("Pedidos");
            }} activeOpacity={0.9}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'column', width: 120, height: 120,/*paddingLeft: 10, paddingRight: 10, padding: 10,*/   alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                    <MaterialIcons
                            name="content-paste-search"
                            size={50}
                            color="#0CE029"
                        />
                    <Text style={{ textAlign: 'center', justifyContent: 'flex-end', /* paddingTop: '6%' ,*/ paddingBottom: '3%', fontSize: 14 }}>Buscar Pedido</Text>
                </View></TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Buscar NF-e');
                //alert("Pedidos");
            }} activeOpacity={0.9}>
                <View style={{ backgroundColor: '#fff', flexDirection: 'column', width: 120, height: 120, /* paddingLeft: 10, paddingRight: 10,paddingTop: '12%', */ alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                    <MaterialIcons
                            name="newspaper"
                            size={50}
                            color="#0CE029"
                        />
                    <Text style={{ textAlign: 'center', justifyContent: 'flex-end', /* paddingTop: '6%' ,*/ paddingBottom: '3%', fontSize: 14 }}>Buscar NFe</Text>
                </View></TouchableOpacity>
        </View>
    )
}

export default Pedidos;