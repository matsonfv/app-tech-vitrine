// Arquivo: src/components/FiltroCategoria.js
import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function FiltroCategoria({ categorias, ativa, aoSelecionar }) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {categorias.map((categoria) => {
          const selecionada = categoria === ativa;
          return (
            <TouchableOpacity
              key={categoria}
              style={[styles.chip, selecionada && styles.chipAtivo]}
              onPress={() => aoSelecionar(categoria)}
              activeOpacity={0.75}
            >
              <Text style={[styles.texto, selecionada && styles.textoAtivo]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 14,
  },
  container: {
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  chipAtivo: {
    backgroundColor: '#2563EB',
  },
  texto: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 13,
  },
  textoAtivo: {
    color: '#FFFFFF',
  },
});