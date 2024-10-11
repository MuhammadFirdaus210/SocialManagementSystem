import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Style untuk halaman PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 8,
    },
    table: {
        display: 'table',
        width: 'auto',
        margin: '10px 0',
        borderCollapse: 'collapse',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #ccc',
    },
    tableCell: {
        padding: 5,
        borderRight: '1px solid #ccc',
        flex: 1,
    },
    tableHeaderCell: {
        padding: 5,
        borderRight: '1px solid #ccc',
        flex: 1,

    },
    headerCell: {
        backgroundColor: '#f0f0f0',
        fontWeight: 700,
    },
    header: {
        marginBottom: 10,
        fontSize: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headerRow: {
        flexDirection: "row",
    },
    footerCellKey2: {
        textAlign: 'left',
        width: '10%',          // Lebar kolom key
        fontSize: 12,
        padding: 0,
    },
    footerCellValue2: {
        textAlign: 'left',
        width: '60%',          // Lebar kolom value
        fontSize: 10,
        padding: 0,
    },
    footer: {
        marginTop: 20,
        fontSize: 10,
        textAlign: 'center',
        color: '#777',
    },
});

// Komponen PDF untuk menampilkan data dalam bentuk tabel
const MyCetakData = ({ data, header = {}, tipe = "PPKS" }) => {
    return (
        <Document>
            <Page style={styles.page} size="A4" orientation="landscape">
                {/* Header Halaman */}
                <View >
                    <Text style={styles.header}>Data {tipe.toUpperCase()}</Text>
                </View>

                <View style={styles.header}>

                    <View style={styles.headerRow}>
                        <Text style={styles.footerCellKey2}>Kabupaten </Text>
                        <Text style={styles.footerCellValue2}>: {header.kabupaten}</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <Text style={styles.footerCellKey2}>Kecamatan </Text>
                        <Text style={styles.footerCellValue2}>: {header.kecamatan}</Text>
                    </View>
                    <View style={styles.headerRow}>
                        <Text style={styles.footerCellKey2}>Gampong </Text>
                        <Text style={styles.footerCellValue2}>: {header.gampong}</Text>
                    </View>
                </View>

                {/* Tabel Header */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Jenis PPKS</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Kabupaten</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Kecamatan</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Gampong</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Nama</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>NIK</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>JK</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Tanggal Lahir</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Alamat</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Pernah Mendapat Bantuan</Text>
                        <Text style={[styles.tableHeaderCell, styles.headerCell]}>Jenis Bantuan</Text>
                    </View>

                    {/* Looping untuk menampilkan setiap item dalam array */}
                    {data.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCell}>{item.Jenis_PPKS}</Text>
                            <Text style={styles.tableCell}>{item.Kabupaten}</Text>
                            <Text style={styles.tableCell}>{item.Kecamatan}</Text>
                            <Text style={styles.tableCell}>{item.Gampong}</Text>
                            <Text style={styles.tableCell}>{item.Nama}</Text>
                            <Text style={styles.tableCell}>{item.NIK}</Text>
                            <Text style={styles.tableCell}>{item.JK}</Text>
                            <Text style={styles.tableCell}>{item.Tanggal_Lahir}</Text>
                            <Text style={styles.tableCell}>{item.Alamat}</Text>
                            <Text style={styles.tableCell}>{item.Pernah_Mendapat_Bantuan}</Text>
                            <Text style={styles.tableCell}>{item.Jenis_Bantuan}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer Halaman */}
                <View style={styles.footer}>
                    <Text>Data PPKS - Dicetak oleh Sistem</Text>
                </View>
            </Page>
        </Document>
    );
};

// Contoh Data PPKS yang digunakan

export default MyCetakData;

