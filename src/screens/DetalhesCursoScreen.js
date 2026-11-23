// Arquivo: src/screens/DetalhesCursoScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DetalhesCursoScreen({ route, navigation, idsMatriculados, onToggleMatricula }) {
  const { curso } = route.params;
  const matriculado = idsMatriculados.includes(curso.id);
  const vagasRestantes = matriculado ? curso.vagas - 1 : curso.vagas;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.topoTags}>
        <View style={styles.badgeCategoria}>
          <Text style={styles.badgeCategoriaTexto}>{curso.categoria}</Text>
        </View>
        <Text style={styles.nivelTexto}>Nível: {curso.nivel}</Text>
      </View>

      <Text style={styles.titulo}>{curso.titulo}</Text>
      <Text style={styles.descricao}>{curso.descricao}</Text>

      <View style={styles.infoBox}>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Instrutor(a):</Text>
          <Text style={styles.infoValor}>{curso.instrutor}</Text>
        </View>
        <View style={styles.infoLinha}>
          <Text style={styles.infoLabel}>Carga Horária:</Text>
          <Text style={styles.infoValor}>{curso.cargaHoraria}</Text>
        </View>
        <View style={[styles.infoLinha, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Vagas Disponíveis:</Text>
          <Text style={[styles.infoValor, { color: '#059669' }]}>
            {vagasRestantes} {vagasRestantes === 1 ? 'vaga' : 'vagas'}
          </Text>
        </View>
      </View>

      <Text style={styles.secaoTitulo}>O que você vai aprender</Text>
      <View style={styles.ementaBox}>
        {curso.ementa.map((topico, index) => (
          <View key={index} style={styles.topicoLinha}>
            <Text style={styles.topicoNumero}>{index + 1}.</Text>
            <Text style={styles.topicoTexto}>{topico}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.botaoPrincipal, matriculado ? styles.botaoCancelar : styles.botaoConfirmar]}
        onPress={() => onToggleMatricula(curso.id)}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBotaoPrincipal}>
          {matriculado ? '✓ Matriculado (Cancelar Inscrição)' : 'Confirmar Matrícula no Curso'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoVoltar}>← Voltar para o Catálogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 36,
  },
  topoTags: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeCategoria: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeCategoriaTexto: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  nivelTexto: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 22,
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  secaoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 10,
  },
  ementaBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  topicoLinha: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  topicoNumero: {
    fontWeight: 'bold',
    color: '#2563EB',
    marginRight: 8,
    fontSize: 14,
  },
  topicoTexto: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  botaoPrincipal: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoConfirmar: {
    backgroundColor: '#2563EB',
  },
  botaoCancelar: {
    backgroundColor: '#059669',
  },
  textoBotaoPrincipal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  botaoVoltar: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  textoBotaoVoltar: {
    color: '#334155',
    fontWeight: 'bold',
    fontSize: 14,
  },
});