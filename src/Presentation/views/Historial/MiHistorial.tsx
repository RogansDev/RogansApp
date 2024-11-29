import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import axios from 'axios';
import { MyFontStyles } from "../../../Presentation/theme/AppTheme";
import FloatingMenu from '../../../Presentation/components/FloatingMenu';
import FormulasMedicasBox from '../../../Presentation/components/Historial/FormulasMedicasBox';
import ExamenesBox from '../../../Presentation/components/Historial/ExamenesBox';
import CotizacionesBox from '../../../Presentation/components/Historial/CotizacionesBox';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale/es';

const MiHistorial = () => {
    const [documentos, setDocumentos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [chatVisible, setChatVisible] = useState(false);
    const user = useSelector((state: any) => state.user);
    const telUsuario = user.phone;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://roganscare.com/documentos/get-documentos.php?phone=573123904069`
                );
                setDocumentos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [telUsuario]);

    if (loading) {
        return <Text style={MyFontStyles.title_1}>Cargando...</Text>;
    }

    const formatearFecha = (fechaIsoString: string) => {
        if (!fechaIsoString) return 'Sin fecha';
        const fecha = parseISO(fechaIsoString);
        return format(fecha, "dd 'de' MMMM 'de' yyyy", { locale: es });
    };

    const renderDocumentos = () => {
        return documentos.map((doc) => (
            <View key={doc.id} style={styles.content}>
                <Text style={MyFontStyles.title_2}>{doc.name}</Text>

                {/* Formulas Médicas */}
                {doc.formula_nombre && doc.formula_nombre !== false && (
                    <FormulasMedicasBox
                        pdfTitle={doc.formula_nombre}
                        consultationDate={formatearFecha(doc.formula_fecha_creado)}
                        issue={`Especialista: ${doc.formula_especialista}`}
                    />
                )}

                {/* Exámenes */}
                {doc.examenes_razon && doc.examenes_razon !== false && (
                    <ExamenesBox
                        pdfTitle={doc.examenes_razon}
                        consultationDate={formatearFecha(doc.examenes_fecha_creacion)}
                        issue={'Exámenes clínicos'}
                    />
                )}

                {/* Cotizaciones */}
                {doc.cotizacion_nombre && doc.cotizacion_nombre !== false && (
                    <CotizacionesBox
                        pdfTitle={doc.cotizacion_nombre}
                        consultationDate={formatearFecha(doc.cotizacion_fecha_creado)}
                        issue={`Total: ${new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                        }).format(doc.cotizacion_valor_total)}`}
                    />
                )}
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={MyFontStyles.title_1}>Mi Historial</Text>
                </View>

                {/* Renderizar documentos dinámicamente */}
                {renderDocumentos()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFCFC",
        position: "relative",
    },
    scrollContainer: {
        position: "relative",
    },
    content: {
        top: Platform.OS === 'android' ? 50 : 10,
        marginHorizontal: 16,
        marginBottom: 20,
    },
});

export default MiHistorial;
