// Arquivo: src/screens/MinhasMatriculasScreen.js
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LISTA_PRODUTOS } from '../data/produtosFallback';

// Tela exibida na segunda aba inferior (Bottom Tab)
export default function CarrinhoScreen({ navigation, idsCarrinho, onToggleCarrinho }) {
  // Filtra apenas os produtos em que o aluno está matriculado
  const produtosAdicionados = LISTA_PRODUTOS.filter((produto) =>
    idsCarrinho.includes(produto.id)
  );
  const esvaziarCarrinho = () => {
    produtosAdicionados.forEach((produto) => {
      onToggleCarrinho(produto.id);
    });
  };

  return (
    <View style={styles.tela}>
      {/* Painel de resumo acadêmico */}
      

      <FlatList
        data={produtosAdicionados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <View style={styles.vazioBox}>
            <Ionicons name="cart-outline" size={56} color="#94A3B8" />
            <Text style={styles.vazioTitulo}>Nenhum produto adicionado</Text>
            <Text style={styles.vazioSubtitulo}>
              Você ainda não adicionou nenhum produto ao seu carrinho. Explore a vitrine e adicione produtos.
            </Text>
            <TouchableOpacity
              style={styles.botaoExplorar}
              onPress={() => navigation.navigate('ExplorarTab')}
              activeOpacity={0.85}
            >
              <Text style={styles.textoBotaoExplorar}>Ir para a Vitrine</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardProduto}>
            
            <View style={styles.cardTopo}>
              <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 4, marginRight: 8, resizeMode: 'contain' }} />
              <Text style={styles.titulo}>{item.title}</Text>
            </View>

            <View style={styles.acoesLinha}>
              <TouchableOpacity
                style={styles.botaoDetalhes}
                onPress={() =>
                  navigation.navigate('ExplorarTab', {
                    screen: 'DetalhesProduto',
                    params: { produto: item },
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.textoBotaoDetalhes}>Ver Detalhes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoCancelar}
                onPress={() => onToggleCarrinho(item.id)}
                activeOpacity={0.8}
              >
                <Ionicons name="trash-outline" size={16} color="#DC2626" />
                <Text style={styles.textoBotaoCancelar}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.resumoCard}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>{produtosAdicionados.length}</Text>
          <Text style={styles.resumoLabel}>Produtos adicionados</Text>
        </View>
        <View style={styles.divisorVertical} />
        <View style={styles.resumoItem}>
          <Text style={styles.resumoValor}>
            R$ {produtosAdicionados.reduce((total, produto) => total + produto.price, 0).toFixed(2)}
          </Text>
          <Text style={styles.resumoLabel}>Valor Total</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmarCompra}
        onPress={() => {
          if (produtosAdicionados.length > 0) {
            alert('Compra confirmada! Obrigado por comprar conosco.');
          }
          esvaziarCarrinho();
        }}
      >
        <Text style={styles.textoBotaoConfirmar}>Confirmar Compra</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.esvaziarCarrinho}
        onPress={() => {
          if (produtosAdicionados.length > 0) {
            alert('Carrinho limpo!');
          }
          esvaziarCarrinho();
        }}
      >
        <Text style={styles.textoBotaoConfirmar}>Limpar Carrinho</Text>
      </TouchableOpacity>
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
  cardProduto: {
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
    marginTop: 8,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',

  },
  categoria: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'uppercase',
  },
  titulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'left',
  },
  acoesLinha: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoDetalhes: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoDetalhes: {
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
  confirmarCompra: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  esvaziarCarrinho: {
    backgroundColor: '#F87171',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 32,
  },
  textoBotaoConfirmar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});