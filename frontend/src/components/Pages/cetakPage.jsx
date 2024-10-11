import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// Gaya untuk PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: '#bfbfbf',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: "#f2f2f2",
    padding: 5,
  },
  tableCol: {
    width: "10%",
    borderStyle: "solid",
    borderColor: '#bfbfbf',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 8,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 8,
  },
  header: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    marginBottom: 10,
    fontSize: 10,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  headerRow: {
    flexDirection: "row",
  },
  footerCellKey2: {
    width: '10%',          // Lebar kolom key
    fontSize: 14,
    padding: 0,
  },
  footerCellValue2: {
    width: '60%',          // Lebar kolom value
    fontSize: 12,
    padding: 0,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',  // Menyusun key dan value dalam satu baris
    marginBottom: 5,       // Jarak antar baris
  },
  footerCellKey: {
    width: '10%',          // Lebar kolom key
    fontSize: 8,
    padding: 0,
  },
  footerCellValue: {
    width: '60%',          // Lebar kolom value
    fontSize: 8,
    padding: 0,
  },
 
});

// Komponen untuk membuat dokumen PDF
const MyDocument = ({ data, header, footer }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape" wrap={true}>
      {/* Judul Laporan */}
      <Text style={styles.title}>Rekap Data {header.title} </Text>

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.footerCellKey2}>Kabupaten </Text>
          <Text style={styles.footerCellValue2}>: {header.kabupaten}</Text>
        </View>
        <View style={styles.headerRow}>
        <Text style={styles.footerCellKey2}>Kecamatan </Text>
        <Text style={styles.footerCellValue2}>: {header.kecamatan}</Text>
        </View>
      </View>
      
      {/* Tabel Data */}
      <View style={styles.table}>
        {/* Header Table */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Gampong</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ADK</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AY_AP_AYP</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AT</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ABH</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AJ</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>ABT</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>AKTK</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>PRSE</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>KTK</Text>
          </View>
          {/* Tambahkan header untuk kolom lainnya sesuai data */}
        </View>

        {/* Isi Tabel */}
        {data.map((item) => (
          <View style={styles.tableRow} key={item._id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.gampong}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ADK}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AY_AP_AYP}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AT}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ABH}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AJ}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.ABT}</Text>
            </View> 
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.AKTK}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.PRSE}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.KTK}</Text>
            </View>
            {/* Tambahkan kolom lainnya sesuai data */}
          </View>
        ))}
      </View>


      <View style={styles.footerSection}>
      <Text style={[styles.title, {fontSize:10, fontStyle:'bold', textAlign: 'left', marginTop:10, marginBottom:4, paddingBottom: 0}]}>Keterangan:</Text>
    
      {/* Flex container untuk menyusun key dan value */}
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: 5 }}>
        {/* Item-item normal ditampilkan seperti tabel */}
        <View style={{ flexDirection: 'column', flex: 1 }}>
          {Object.entries(footer).slice(0, -5).map(([key, value], index) => (
            <View key={index} style={styles.footerRow}>
              <Text style={styles.footerCellKey}>{key}</Text>
              <Text style={styles.footerCellValue}>: {value}</Text>
            </View>
          ))}
        </View>
    
        {/* 5 item terakhir di sisi kiri */}
        <View style={{ flexDirection: 'column', flex: 0.5 }}>
          {Object.entries(footer).slice(-5).map(([key, value], index) => (
            <View key={index} style={styles.footerRow}>
              <Text style={styles.footerCellKey}>{key}</Text>
              <Text style={styles.footerCellValue}>: {value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    

    </Page>
  </Document>
);

export default MyDocument;
