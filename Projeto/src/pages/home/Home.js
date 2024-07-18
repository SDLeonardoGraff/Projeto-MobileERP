import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react';
import GlobalContext from '../../GlobalContext';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native"

const Home = () => {
    const { globalState } = useContext(GlobalContext);
    const options = ['Hoje', '7D', '1M', '6M', '1A'];
    const [selected, setSelected] = useState('Hoje');
    const navigation = useNavigation();

    console.debug("Home", globalState.tokenDirectus);

    return (
        <View style={{ flex: 1, padding: '5%' }}>
            {/* <View style={{backgroundColor: '#fff', borderRadius: 25, elevation: 5, padding: '2%'}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
                        Vendas
                    </Text>
                        <View style={{flexDirection: 'row', padding: '3%', justifyContent: 'space-around'}}>
                                {options.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[styles.optionButton, selected === option && styles.selectedOption]}
                                        onPress={() => setSelected(option)}>
                                        <Text style={[styles.optionText, selected === option && styles.selectedOptionText]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                        </View>
                        <View style={{marginTop: '5%'}}>
                            <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>R$ 400,00</Text>
                            <Text style={{textAlign:'center', marginTop: '5%'}}>3 vendas realizadas</Text>
                        </View>
                </View> */}

            <View style={{ marginTop: '10%', flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Pedidos');
                    //alert("Pedidos");
                }} activeOpacity={0.9}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'column', width: 100, height: 100,/*  paddingLeft: 10, paddingRight: 10,paddingTop: '12%', */ alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                        <MaterialCommunityIcons
                            name="finance"
                            size={50}
                            color="#0CE029"
                        />
                        <Text style={{ textAlign: 'center', justifyContent: 'flex-end', /* paddingTop: '6%' ,*/ paddingBottom: '3%', fontSize: 14 }}>Pedidos</Text>
                    </View></TouchableOpacity>
                {/* <TouchableOpacity onPress={() => {
                    navigation.navigate('Produtos');
                }} activeOpacity={0.9}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'column', paddingLeft: '12%', paddingRight: '12%', paddingTop: '12%', alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                        <MaterialIcons
                            name="inventory"
                            size={70}
                            color="#0CE029"
                        />
                        <Text style={{ textAlign: 'center', justifyContent: 'flex-end', paddingTop: '6%', paddingBottom: '5%', fontSize: 20 }}>Produtos</Text>
                    </View></TouchableOpacity> */}
            </View>
            {/* <View style={{ marginTop: '5%', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Nfe Emitidas');
                }} activeOpacity={0.9}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'column', paddingLeft: '12%', paddingRight: '12%', paddingTop: '12%', alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5, marginRight: 3 }}>
                        <MaterialCommunityIcons
                            name="newspaper"
                            size={66}
                            color="#0CE029"
                        />
                        <Text style={{ textAlign: 'center', justifyContent: 'flex-end', paddingTop: '6%', paddingBottom: '5%' }}>Nfe Emitidas</Text>
                    </View></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Boletos');
                }} activeOpacity={1}>
                    <View style={{ backgroundColor: '#fff', flexDirection: 'column', paddingLeft: '12%', paddingRight: '12%', paddingTop: '12%', alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                        <Ionicons
                            name="document-text-outline"
                            size={66}
                            color="#0CE029"
                        />
                        <Text style={{ textAlign: 'center', justifyContent: 'flex-end', paddingTop: '6%', paddingBottom: '5%' }}>Boletos Gera.</Text>
                    </View></TouchableOpacity>
            </View> */}
            {/*<View style={{flex: 1, position: 'absolute', bottom: 25, right: 140, elevation: 10}}>
        <TouchableOpacity onPress={()=> navigation.navigate('ConsultaClientes')} activeOpacity={0.9}>
            <Ionicons
                name="search-circle"
                color="#0CE029"
                size={57}
            />
        </TouchableOpacity>
    </View>
            <View style={{flex: 1, position: 'absolute', bottom: 30, right: 30, elevation: 10}}>
        <TouchableOpacity onPress={()=> navigation.navigate('Verificar Cliente', {dados : dados})}>
            <Entypo
                name="circle-with-plus"
                color="#0CE029"
                size={50}
            />
        </TouchableOpacity>
    </View> */}
        </View>
        //</View>
    )
};

export default Home;

const styles = StyleSheet.create({
    optionButton: {
        padding: '2%',
        borderRadius: 10,
        backgroundColor: '#f0f0f0', // Não selecionado
        paddingHorizontal: '4%',
        paddingVertical: '2%',
    },
    selectedOption: {
        backgroundColor: "#0CE029", // Selecionado
    },
    optionText: {
        color: '#000', // Texto não selecionado
    },
    selectedOptionText: {
        color: '#fff', // Texto do selecionado
    },
});
{/* <View>
    <View style={{ marginTop: '5%', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
        <TouchableOpacity onPress={() => {
            //navigation.navigate('Nfe Emitidas');
        }} activeOpacity={0.9}>
            <View style={{ backgroundColor: '#fff', flexDirection: 'column', paddingLeft: '12%', paddingRight: '12%', paddingTop: '12%', alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5, marginRight: 3 }}>
                <Icons
                    name="request-page"
                    size={66}
                    color="#0CE029"
                />
                <Text style={{ textAlign: 'center', justifyContent: 'flex-end', paddingTop: '6%', paddingBottom: '5%' }}>Nfe Emitidas</Text>
            </View></TouchableOpacity>

        <TouchableOpacity onPress={() => {
            //navigation.navigate('Boletos');
        }} activeOpacity={1}>
            <View style={{ backgroundColor: '#fff', flexDirection: 'column', paddingLeft: '12%', paddingRight: '12%', paddingTop: '12%', alignItems: 'center', borderRadius: 15, justifyContent: 'center', elevation: 5 }}>
                <Icons
                    name="request-page"
                    size={66}
                    color="#0CE029"
                />
                <Text style={{ textAlign: 'center', justifyContent: 'flex-end', paddingTop: '6%', paddingBottom: '5%' }}>Boletos Gera.</Text>
            </View></TouchableOpacity>
    </View>
    <TouchableOpacity style={{ backgroundColor: "#000" }}>
        <Text>Pedidos</Text>
    </TouchableOpacity>
    <TouchableOpacity>
        <Text>NFe</Text>
    </TouchableOpacity>
    <TouchableOpacity>
        <Text>Boletos</Text>
    </TouchableOpacity>
</View> */}