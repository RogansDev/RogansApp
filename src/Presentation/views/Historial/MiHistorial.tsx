import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, Alert, Linking, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { MyFontStyles, MyColors, MyFont } from "../../../Presentation/theme/AppTheme";
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import FormulasMedicasBox from '../../../Presentation/components/Historial/FormulasMedicasBox';
import ExamenesBox from '../../../Presentation/components/Historial/ExamenesBox';
import CotizacionesBox from '../../../Presentation/components/Historial/CotizacionesBox';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { WebView } from 'react-native-webview';
import Icons from '../../../Presentation/theme/Icons';


const MiHistorial = () => {
    const { CalendarAddIcon, ArrowDownIcon, ArrowWhiteIcon, CloseIcon, TickCircleIcon } = Icons;
    
    const [documentos, setDocumentos] = useState<any[]>([]);
    const [loadingFormulas, setLoadingFormulas] = useState(true);
    const [loadingOrdenes, setLoadingOrdenes] = useState(true);
    const [loadingCotizaciones, setLoadingCotizaciones] = useState(true);
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [chatVisible, setChatVisible] = useState(false);
    const [pagoVisible, setPagoVisible] = useState(false);
    const [aceptado, setAceptado] = useState(false);
    const [rechazado, setRechazado] = useState(false);
    const [cancelado, setCancelado] = useState(false);
    const [urlFinal, setUrlFinal] = useState('');
    const [idOdoo, setIdOdoo] = useState('');
    const [paymentStatuses, setPaymentStatuses] = useState<{ [key: string]: boolean }>({});

    const user = useSelector((state: any) => state.user);
    const telUsuario = user.phone;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://roganscare.com/documentos/get-documentos.php?phone=573123904069`
                );
                if (Array.isArray(response.data)) {
                    setDocumentos(response.data);
                } else {
                    console.warn('Respuesta inesperada:', response.data);
                    setDocumentos([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setDocumentos([]);
            } finally {
                setLoadingFormulas(false);
                setLoadingOrdenes(false);
                setLoadingCotizaciones(false);
            }
        };

        fetchData();
    }, [telUsuario]);

    const formatearFecha = (fechaIsoString: string) => {
        if (!fechaIsoString) return 'Sin fecha';
        const fecha = parseISO(fechaIsoString);
        return format(fecha, "dd 'de' MMMM 'de' yyyy", { locale: es });
    };

    const formatearNombreDoctor = (nombre: string): string => {
        if (!nombre) return ''; 
        return nombre
            .split('_')
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
            .join(' ');
    };

    const handleOpenPDF = async (phone: string, id: number, documentType: string) => {
        try {
            setLoadingPDF(true);
            const url = `https://roganscare.com/documentos/public/index.php?phone=${phone}&id=${id}&document_type=${documentType}`;
            const response = await axios.get(url);

            if (response.data.url) {
                await Linking.openURL(response.data.url);
            } else {
                Alert.alert('Documento no disponible', 'No se pudo encontrar el documento solicitado.');
            }
        } catch (error) {
            console.error('Error al abrir el PDF:', error);
            Alert.alert('Error', 'Hubo un problema al intentar abrir el documento.');
        } finally {
            setLoadingPDF(false);
        }
    };

    const verificarPago = async (phone: string, id: string) => {
        try {
            const url = `https://roganscare.com/documentos/public/pago.php?action=verificar&phone=${phone}&id=${id}`;
            const response = await axios.get(url);
    
            if (response.data.status === "success" && response.data.paid) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error al verificar pago:', error);
            return false;
        }
    };    

    const registrarPago = async (phone: string, id: string,) => {
        try {
            setLoadingPDF(true);
            const url = `https://roganscare.com/documentos/public/pago.php?action=pagar&phone=${phone}&id=${id}`;
            const response = await axios.get(url);

            console.log('Pago registrado');
            
        } catch (error) {
            console.error('Error al registrar pago:', error);
        }
    };

    let estadoCupon = false;

    const iniciarProcesoDePago = (datosPago: any) => {
        setIdOdoo(datosPago.id);

        const generarReferenceCode = () => {
            const ahora = new Date();
            // Generar un número aleatorio y convertirlo a string en base 36
            const randomId = Math.random().toString(36).substr(2, 9);

            // Formatear la fecha y hora en un string y combinarlo con el identificador único
            const referenceCode = `rogans_${ahora.toISOString()}_${randomId}`;

            return referenceCode;
        };

        const uniqueReferenceCode = generarReferenceCode();

        interface DatosTransaccion {
            description: string;
            referenceCode: string
            amount: any;
            tax: string;
            taxReturnBase: string;
            currency: string;
            buyerEmail: string;
            fecha: string;
            especialista: string;
            cupon: string,
            valor_descuento: string,
            estado_cupon: string,
            nombre: string,
            cedula: string,
        }

        const datosTransaccion: DatosTransaccion = {
            description: `Fómula médica: ${datosPago.formula_nombre}`,
            referenceCode: uniqueReferenceCode,
            amount: datosPago.formula_valor_total,
            tax: "0",
            taxReturnBase: "0",
            currency: "COP",
            buyerEmail: user.email,
            fecha: formatearFecha(datosPago.formula_fecha_creado),
            especialista: formatearNombreDoctor(datosPago.formula_especialista),
            cupon: '',
            valor_descuento: '',
            estado_cupon: '',
            nombre: user.name,
            cedula: user.document,
        };

        const queryString = Object.entries(datosTransaccion)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        setUrlFinal(`https://rogansya.com/pagos/?${queryString}`);
        console.log(`https://rogansya.com/pagos/?${queryString}`);
        
        setPagoVisible(true);
    };

    const pagoCancelado = () => {
        setPagoVisible(false);
        setCancelado(true);
        estadoCupon = false;
        setInterval(() => {
            setCancelado(false);
        }, 5000);
    }

    const pagoAceptado = () => {
        setPagoVisible(false);
        setAceptado(true);
        registrarPago(telUsuario, idOdoo);
        estadoCupon = false;
        setInterval(() => {
            setAceptado(false);
            fetchPaymentStatuses();
        }, 5000);
    }

    const pagoRechazado = () => {
        setPagoVisible(false);
        setRechazado(true);
        estadoCupon = false;
        setInterval(() => {
            setRechazado(false);
        }, 5000);
    }

    const handleMessage = (event: any) => {
        const receivedMessage = event.nativeEvent.data;

        if (receivedMessage === 'cupon_true') {
            estadoCupon = true;
            console.log(estadoCupon);
        } else if (receivedMessage === 'cupon_false') {
            estadoCupon = false;
            console.log(estadoCupon);
        }

        if (receivedMessage === 'exitoso') {
            if (estadoCupon) {
                setPagoVisible(false);
                pagoAceptado();
                console.log(estadoCupon);
            } else {
                setPagoVisible(false);
                pagoAceptado();
                console.log(estadoCupon);
            }
        } else if (receivedMessage === 'rechazado') {
            setPagoVisible(false);
            pagoRechazado();
            estadoCupon = false;
            console.log(estadoCupon);
        } else if (receivedMessage === 'pendiente') {
            setPagoVisible(false);
            pagoRechazado();
            estadoCupon = false;
            console.log(estadoCupon);
        }
    };

    const fetchPaymentStatuses = async () => {
        const statuses: { [key: string]: boolean } = {};
        for (const doc of documentos.filter((doc) => doc.formula_nombre)) {
            const isPaid = await verificarPago('573123904069', doc.id);
            statuses[doc.id] = isPaid;
        }
        setPaymentStatuses(statuses);
    };
    
    useEffect(() => {
        if (documentos.length > 0) {
            fetchPaymentStatuses();
        }
    }, [documentos]);

    const renderFormulasMedicas = () => {
        if (loadingFormulas) {
            return <ActivityIndicator size="small" color="#00d0b1" style={styles.loadingIndicator} />;
        }

        const formulas = documentos.filter((doc) => doc.formula_nombre && doc.formula_nombre !== false);
        if (formulas.length === 0) {
            return <Text style={styles.noDataText}>No hay fórmulas médicas disponibles</Text>;
        }
        return formulas.map((doc) => (
            <FormulasMedicasBox
                key={doc.id}
                pdfTitle={doc.formula_nombre}
                consultationDate={formatearFecha(doc.formula_fecha_creado)}
                issue={`${formatearNombreDoctor(doc.formula_especialista)}`}
                price={`Total: ${new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                }).format(doc.formula_valor_total)}`}
                pressAction={() => handleOpenPDF(telUsuario, doc.id, 'medical_formula')}
                pressComprar={() => iniciarProcesoDePago(doc)}
                pago={paymentStatuses[doc.id] || false}
            />
        ));
    };

    const renderOrdenesExamenes = () => {
        if (loadingOrdenes) {
            return <ActivityIndicator size="small" color="#00d0b1" style={styles.loadingIndicator} />;
        }

        const examenes = documentos.filter((doc) => doc.examenes_razon && doc.examenes_razon !== false);
        if (examenes.length === 0) {
            return <Text style={styles.noDataText}>No hay órdenes de exámenes disponibles</Text>;
        }
        return examenes.map((doc) => (
            <ExamenesBox
                key={doc.id}
                pdfTitle={doc.examenes_razon}
                consultationDate={formatearFecha(doc.examenes_fecha_creacion)}
                issue={'Exámenes clínicos'}
                pressAction={() => handleOpenPDF('573123904069', doc.id, 'exam_order')}
            />
        ));
    };

    const renderCotizaciones = () => {
        if (loadingCotizaciones) {
            return <ActivityIndicator size="small" color="#00d0b1" style={styles.loadingIndicator} />;
        }

        const cotizaciones = documentos.filter((doc) => doc.cotizacion_nombre && doc.cotizacion_nombre !== false);
        if (cotizaciones.length === 0) {
            return <Text style={styles.noDataText}>No hay cotizaciones disponibles</Text>;
        }
        return cotizaciones.map((doc) => (
            <CotizacionesBox
                key={doc.id}
                pdfTitle={doc.cotizacion_nombre}
                consultationDate={formatearFecha(doc.cotizacion_fecha_creado)}
                issue={`Total: ${new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                }).format(doc.cotizacion_valor_total)}`}
                pressAction={() => handleOpenPDF(telUsuario, doc.id, 'quotation')}
            />
        ));
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={pagoVisible}
                onRequestClose={() => setPagoVisible(!pagoVisible)}
            >
                <View style={styles.pagoContainer}>
                    <TouchableOpacity onPress={pagoCancelado} style={{ position: 'absolute', top: 12, left: 15, }}>
                        <CloseIcon width={16} height={16} />
                    </TouchableOpacity>
                    <WebView style={{ width: '100%', height: '100%', }}
                        source={{ uri: urlFinal }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onMessage={handleMessage}
                    />
                </View>
                <TouchableOpacity onPress={pagoCancelado} style={styles.pagoOverlay} />
            </Modal>
            <View style={styles.container}>
                {aceptado && (
                    <Modal transparent={true} animationType="fade" visible={aceptado}> 
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TickCircleIcon width={60} height={60} />
                                <Text style={styles.modalText2}>¡Pago existoso!</Text>
                                <Text style={styles.modalText}>Gracias por tu compra</Text>
                            </View>
                        </View>
                    </Modal>
                )}
                {rechazado && (
                    <Modal transparent={true} animationType="fade" visible={rechazado}>
                        <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                                <CloseIcon width={60} height={60} />
                                <Text style={styles.modalText3}>Pago rechazado</Text>
                                <Text style={styles.modalText}>Lo sentimos, tu pago {"\n"}no se pudo realizar</Text>
                            </View>
                        </View>
                    </Modal>
                )}
                {cancelado && (
                    <Modal transparent={true} animationType="fade" visible={cancelado}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <CloseIcon width={60} height={60} />
                                <Text style={styles.modalText}>El pago fue cancelado</Text>
                            </View>
                        </View>
                    </Modal>
                )}
                {loadingPDF && (
                    <Modal transparent={true} animationType="fade" visible={loadingPDF}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ActivityIndicator size="large" color="#00d0b1" />
                                <Text style={styles.modalText}>Generando PDF...</Text>
                            </View>
                        </View>
                    </Modal>
                )}

                <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
                <ScrollView style={styles.scrollContainer}>
                    <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
                        <Text style={MyFontStyles.title_1}>Mis documentos</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={MyFontStyles.title_h2}>Fórmulas Médicas</Text>
                        {renderFormulasMedicas()}
                    </View>

                    <View style={styles.section}>
                        <Text style={MyFontStyles.title_h2}>Órdenes de Exámenes</Text>
                        {renderOrdenesExamenes()}
                    </View>

                    <View style={styles.lastSection}>
                        <Text style={MyFontStyles.title_h2}>Cotizaciones</Text>
                        {renderCotizaciones()}
                    </View>
                </ScrollView>
            </View>
        </>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCFC",
    },
    scrollContainer: {
        flex: 1,
    },
    section: {
        marginHorizontal: 16,
        marginVertical: 15,
    },
    lastSection: {
        marginHorizontal: 16,
        marginTop: 15,
        marginBottom: 140,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#999',
        marginVertical: 10,
    },
    loadingIndicator: {
        marginVertical: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        color: MyColors.neutro[2],
        fontFamily: MyFont.regular,
        textAlign: 'center',
    },
    modalText2: {
        marginTop: 10,
        fontSize: 22,
        color: MyColors.verde[2],
        fontFamily: MyFont.bold,
    },
    modalText3: {
        marginTop: 10,
        fontSize: 22,
        color: MyColors.error[3],
        fontFamily: MyFont.bold,
    },
    pagoContainer: {
        position: 'absolute',
        width: '100%',
        height: '92%',
        bottom: 0,
        zIndex: 20,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 40,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // Sombras para Android
        elevation: 10,
        // Sombras para iOS
        shadowColor: "black",
        shadowOffset: { width: 4, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
    },
    pagoOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});

export default MiHistorial;
