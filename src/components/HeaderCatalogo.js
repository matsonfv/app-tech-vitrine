// Arquivo: src/components/HeaderCatalogo.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderCatalogo({ titulo, subtitulo, totalInscritos }) {
  return (
    <View style={styles.header}>
      <View style={styles.topo}>
        <View style={styles.textos}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>

        <View style={styles.contadorBox}>
          <Text style={styles.contadorNumero}>{totalInscritos}</Text>
          <Text style={styles.contadorLabel}>
            {totalInscritos === 1 ? 'Inscrito' : 'Inscritos'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0F172A',
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textos: {
    flex: 1,
    paddingRight: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  subtitulo: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  contadorBox: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 74,
  },
  contadorNumero: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  contadorLabel: {
    fontSize: 11,
    color: '#DBEAFE',
    fontWeight: '600',
  },
});