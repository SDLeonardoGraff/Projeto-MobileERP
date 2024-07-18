import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/log/Login";
import NavBar from "./NavBar";
import Welcome from "../pages/welcome/Welcome";
import Pedidos from "../pages/pedidos/Pedidos";
import AppConfig from "../pages/config/pages/AppConfig/AppConfig";
import ContaConfig from "../pages/config/pages/contaConfig/ContaConfig";
import MinhaEmpresa from "../pages/config/pages/minhaEmpresa/MinhaEmpresa";
import NovoPedido from "../pages/pedidos/pages/novoPedido/NovoPedido";
import BuscarPedido from "../pages/pedidos/pages/buscarPedido/BuscarPedido";
import NfeEmitidas from "../pages/pedidos/pages/nfeEmitidas/NfeEmitidas";

export default function Routes() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Tabs" component={NavBar} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
                <Stack.Screen name="Pedidos" component={Pedidos}/>
                <Stack.Screen name="App" component={AppConfig} options={{ headerShown: true }}/>
                <Stack.Screen name="Conta" component={ContaConfig} options={{ headerShown: true }}/>
                <Stack.Screen name="Empresa" component={MinhaEmpresa} options={{ headerShown: true }}/>
                <Stack.Screen name="Novo Pedido" component={NovoPedido} options={{ headerShown: true }}/>
                <Stack.Screen name="Buscar Pedido" component={BuscarPedido} options={{ headerShown: true }}/>
                <Stack.Screen name="Buscar NF-e" component={NfeEmitidas} options={{ headerShown: true }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};