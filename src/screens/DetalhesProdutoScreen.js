// Arquivo: src/screens/DetalhesProdutoScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function DetalhesProdutoScreen({ route, navigation, idsCarrinho, onToggleCarrinho }) {
  const { produto } = route.params;
  const noCarrinho = idsCarrinho.includes(produto.id);

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <View style={styles.topoTags}>
        <View style={styles.badgeCategoria}>
          <Text style={styles.badgeCategoriaTexto}>{produto.category}</Text>
        </View>
      </View>
      <View>
        <Image 
          source={{ uri: produto.image }} 
          style={{ width: '100%', height: 180, borderRadius: 12, marginBottom: 16 , resizeMode: 'contain'}} />
      </View>
      <Text style={styles.titulo}>{produto.title}</Text>
      <Text style={styles.descricao}>{produto.description}</Text>


      <Text style={styles.preco}>R$ {produto.price}</Text>


      <TouchableOpacity
        style={[styles.botaoPrincipal, noCarrinho ? styles.botaoCancelar : styles.botaoConfirmar]}
        onPress={() => onToggleCarrinho(produto.id)}
        activeOpacity={0.85}
      >
        <Text style={styles.textoBotaoPrincipal}>
          {noCarrinho ? '✓ Adicionado ao Carrinho (Remover)' : 'Adicionar ao Carrinho'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBotaoVoltar}>← Voltar para a Vitrine</Text>
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
  preco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
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