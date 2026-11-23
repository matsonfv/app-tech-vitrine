// Arquivo: src/screens/MinhasMatriculasScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LISTA_CURSOS } from '../data/cursos';

// Tela exibida na segunda aba inferior (Bottom Tab)
export default function MinhasMatriculasScreen({ navigation, idsMatriculados, onToggleMatricula }) {
  // Filtra apenas os cursos em que o aluno está matriculado
  const cursosInscritos = LISTA_CURSOS.filter((curso) =>
    idsMatriculados.includes(curso.id)
  );

  // Soma a carga horária total dos cursos matriculados
  const totalHoras = cursosInscritos.reduce(
    (acumulador, curso) => acumulador + curso.horasNumericas,
    0
  );

  return (
    <View style={styles.tela}>
      {/* Painel de resumo acadêmico */}
      <View style={styles.resumoCard}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{cursosInscritos.length}</Text>
          <Text style={styles.resumoLabel}>Cursos Ativos</Text>
        </View>
        <View style={styles.divisorVertical} />
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{totalHoras}h</Text>
          <Text style={styles.resumoLabel}>Carga Horária Total</Text>
        </View>
      </View>

      <FlatList
        data={cursosInscritos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Ionicons name="school-outline" size={56} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Nenhuma matrícula ativa</Text>
            <Text style={styles.vazioSubtitulo}>
              Você ainda não se inscreveu em nenhum curso. Explore o catálogo para garantir sua vaga.
            </Text>
            <TouchableOpacity
              style={styles.botaoExplorar}
              onPress={() => navigation.navigate('ExplorarTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoExplorar}>Ir para o Catálogo</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardMatricula}>
            <View style={styles.cardTopo}>
              <Text style={styles.categoria}>{item.categoria}</Text>
              <Text style={styles.cargaHoraria}>{item.cargaHoraria}</Text>
            </View>

            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.instrutor}>{item.instrutor}</Text>

            <View style={styles.acoesLinha}>
              <TouchableOpacity
                style={styles.botaoEmenta}
                onPress={() =>
                  navigation.navigate('ExplorarTab', {
                    screen: 'DetalhesCurso',
                    params: { curso: item },
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoEmenta}>Ver Ementa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => onToggleMatricula(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" />
                <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  resumoCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resumoItem: {
    flex: 1,
    alignItems: 'center',
  },
  resumoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#38BDF8',
  },
  resumoLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  divisorVertical: {
    width: 1,
    height: 34,
    backgroundColor: '#334155',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    flexGrow: 1,
  },
  vazioBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  vazioTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 14,
    marginBottom: 6,
  },
  vazioSubtitulo: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  botaoExplorar: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  textoBotaoExplorar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardMatricula: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#10B981',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoria: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'uppercase',
  },
  cargaHoraria: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  instrutor: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 14,
  },
  acoesLinha: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoEmenta: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoEmenta: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    fontSize: 13,
  },
  botaoCancelar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    gap: 4,
  },
  textoBotaoCancelar: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 13,
  },
});