// Arquivo: src/components/CursoCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CursoCard({ curso, matriculado, onAbrirDetalhes }) {
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  return (
    <TouchableOpacity
      style={[styles.card, matriculado && styles.cardMatriculado]}
      onPress={onAbrirDetalhes}
      activeOpacity={0.85}
    >
      <View style={styles.linhaTags}>
        <View style={styles.tagCategoria}>
          <Text style={styles.tagCategoriaTexto}>{curso.categoria}</Text>
        </View>
        <Text style={styles.cargaHoraria}>{curso.cargaHoraria} • {curso.nivel}</Text>
      </View>

      <Text style={styles.titulo}>{curso.titulo}</Text>
      <Text style={styles.descricao} numberOfLines={2}>
        {curso.descricao}
      </Text>

      <View style={styles.infoRodape}>
        <Text style={styles.instrutor}>{curso.instrutor}</Text>
        <Text style={styles.vagas}>
          {matriculado ? '✓ Matriculado' : `${vagasRestantes} vagas`}
        </Text>
      </View>

      <View style={styles.botaoDetalhes}>
        <Text style={styles.textoBotaoDetalhes}>Ver Detalhes e Ementa →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardMatriculado: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  linhaTags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagCategoria: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagCategoriaTexto: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cargaHoraria: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 12,
  },
  infoRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginBottom: 12,
  },
  instrutor: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  vagas: {
    fontSize: 12,
    color: '#059669',
    fontWeight: 'bold',
  },
  botaoDetalhes: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoDetalhes: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 13,
  },
});