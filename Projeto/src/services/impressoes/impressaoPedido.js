import HtmlPedido from "../htmlPedido";
import * as Print from 'expo-print';

const ImpressaoPedido = async () => {
    const print = async () => {
        // On iOS/android prints the given html. On web prints the HTML from the current page.
        await Print.printAsync({
            HtmlPedido,
            //printerUrl: selectedPrinter?.url, // iOS only
        });
    };

}

export default ImpressaoPedido;