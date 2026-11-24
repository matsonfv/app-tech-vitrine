// Arquivo: src/screens/CatalogoScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { LISTA_PRODUTOS } from '../data/produtosFallback';
import ProdutoCard from '../components/ProdutoCard';

export default function CatalogoScreen({ navigation, idsCarrinho }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const categorias = ['Todos', ...new Set(LISTA_PRODUTOS.map((produto) => produto.category))];

  const produtosFiltrados =
    categoriaAtiva === 'Todos'
      ? LISTA_PRODUTOS
      : LISTA_PRODUTOS.filter((produto) => produto.category === categoriaAtiva);

  return (
    <View style={styles.tela}>
      

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Text style={styles.vazioTexto}>
              Nenhum produto encontrado nesta categoria.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProdutoCard
            produto={item}
            carrinho={idsCarrinho}
            onAbrirDetalhes={() =>
              navigation.navigate('DetalhesProduto', { produto: item })
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