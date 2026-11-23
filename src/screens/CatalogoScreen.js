// Arquivo: src/screens/CatalogoScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { CATEGORIAS, LISTA_CURSOS } from '../data/cursos';
import HeaderCatalogo from '../components/HeaderCatalogo';
import FiltroCategoria from '../components/FiltroCategoria';
import CursoCard from '../components/CursoCard';

export default function CatalogoScreen({ navigation, idsMatriculados }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const cursosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_CURSOS
      : LISTA_CURSOS.filter((curso) => curso.categoria === categoriaAtiva);

  return (
    <View style={styles.tela}>
      <HeaderCatalogo
        titulo="Formação Técnica"
        subtitulo="Explore os cursos ou veja suas inscrições na aba ao lado"
        totalInscritos={idsMatriculados.length}
      />

      <FiltroCategoria
        categorias={CATEGORIAS}
        ativa={categoriaAtiva}
        aoSelecionar={setCategoriaAtiva}
      />

      <FlatList
        data={cursosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Text style={styles.vazioTexto}>
              Nenhum curso encontrado nesta categoria.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <CursoCard
            curso={item}
            matriculado={idsMatriculados.includes(item.id)}
            onAbrirDetalhes={() =>
              navigation.navigate('DetalhesCurso', { curso: item })
            }
          />
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
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  vazioBox: {
    padding: 32,
    alignItems: 'center',
  },
  vazioTexto: {
    color: '#64748B',
    fontSize: 15,
  },
});