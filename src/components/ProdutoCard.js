// Arquivo: src/components/CursoCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProdutoCard({ produto, carrinho, onAbrirDetalhes }) {

  return (
    <TouchableOpacity
      style={[styles.card, carrinho.includes(produto.id) && styles.cardProdutoAdicionado]}
      onPress={onAbrirDetalhes}
      activeOpacity={0.85}
    >
      <View style={styles.linhaTags}>
        <Image source={{ uri: produto.image }} style={{ width: '100%', aspectRatio: 16 / 9, resizeMode: 'contain' }} />
      </View>

      <Text style={styles.titulo}>{produto.title}</Text>
      <View style={styles.tagCategoria}>
          <Text style={styles.tagCategoriaTexto}>{produto.category}</Text>
      </View>
      <Text style={styles.descricao} numberOfLines={2}>
        {produto.description}
      </Text>
      <Text style={styles.rating}>⭐ {produto.rating.rate} ({produto.rating.count})</Text>
      <Text style={styles.preco}>R$ {produto.price}</Text>

      <View style={styles.botaoDetalhes}>
        <Text style={styles.textoBotaoDetalhes}>Ver Detalhes →</Text>
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
  cardProdutoAdicionado: {
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
    paddingHorizontal: 8,
    marginBottom: 20,
    marginTop: 4,
    paddingVertical: 4,
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
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
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
  rating: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 8,
  },
});