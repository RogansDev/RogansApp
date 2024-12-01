import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
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
        // Simulación de datos del servidor
        const data = [
            {
                id: 4,
                name: "test",
                formula_nombre: "formula test",
                formula_fecha_creado: "2024-11-26",
                formula_especialista: "martin_castillo",
                cotizacion_nombre: false,
                examenes_razon: false,
            },
            {
                id: 5,
                name: "sebastian otra formuna test",
                formula_nombre: "preuba formula dos",
                formula_fecha_creado: "2024-11-28",
                formula_especialista: "camilo_mateus",
                cotizacion_nombre: "preuba dos",
                cotizacion_fecha_creado: "2024-11-28",
                cotizacion_valor_total: 50000000,
                cotizacion_moneda: "cop",
                examenes_razon: "prueba de examenes",
                examenes_fecha_creacion: "2024-11-28",
            },
        ];

        setDocumentos(data);
        setLoading(false);
    }, []);

    const formatearFecha = (fechaIsoString: string) => {
        if (!fechaIsoString) return 'Sin fecha';
        const fecha = parseISO(fechaIsoString);
        return format(fecha, "dd 'de' MMMM 'de' yyyy", { locale: es });
    };

    const formatearNombreDoctor = (nombre: string): string => {
        if (!nombre) return ''; // Manejar el caso de un nombre vacío
        return nombre
            .split('_') // Dividir por "_"
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()) // Capitalizar cada palabra
            .join(' '); // Unir con espacio
    };
    

    const renderFormulasMedicas = () => {
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
            />
        ));
    };

    const renderOrdenesExamenes = () => {
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
            />
        ));
    };

    const renderCotizaciones = () => {
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
            />
        ));
    };

    return (
        <View style={styles.container}>
            <FloatingMenu chatVisible={chatVisible} setChatVisible={setChatVisible} />
            <ScrollView style={styles.scrollContainer}>
                <View style={{marginTop: 20, paddingHorizontal: 16,}}>
                    <Text style={MyFontStyles.title_1}>Mis documentos</Text>
                </View>
                <View style={styles.section}>
                    <Text style={MyFontStyles.title_h2}>Fórmulas Médicas</Text>
                    {loading ? <ActivityIndicator size="large" color="#00d0b1" /> : renderFormulasMedicas()}
                </View>

                <View style={styles.section}>
                    <Text style={MyFontStyles.title_h2}>Órdenes de Exámenes</Text>
                    {loading ? <ActivityIndicator size="large" color="#00d0b1" /> : renderOrdenesExamenes()}
                </View>

                <View style={styles.lastSection}>
                    <Text style={MyFontStyles.title_h2}>Cotizaciones</Text>
                    {loading ? <ActivityIndicator size="large" color="#00d0b1" /> : renderCotizaciones()}
                </View>
            </ScrollView>
        </View>
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
});

export default MiHistorial;
