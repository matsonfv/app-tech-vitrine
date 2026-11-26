// Arquivo: App.js (Prática Guiada - Navegação Combinada: Bottom Tabs + Stack Navigator)
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import VitrineScreen from './src/screens/VitrineScreen';
import DetalhesProdutoScreen from './src/screens/DetalhesProdutoScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CHAVE_VITRINE = '@vitrine:produtos';

// Pilha de navegação exclusiva da primeira aba (Catálogo -> Detalhes)
function ExplorarStack({ idsCarrinho, onToggleCarrinho }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Vitrine"
        options={{ title: 'Vitrine de Produtos' }}
      >
        {(props) => (
          <VitrineScreen
            {...props}
            idsCarrinho={idsCarrinho}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="DetalhesProduto"
        options={({ route }) => ({
          title: route.params?.produto?.categoria || 'Detalhes do Produto',
        })}
      >
        {(props) => (
          <DetalhesProdutoScreen
            {...props}
            idsCarrinho={idsCarrinho}
            onToggleCarrinho={onToggleCarrinho}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [idsCarrinho, setIdsCarrinho] = useState([]);
  const [dadosCarregados, setDadosCarregados] = useState(false);

    // 1. Leitura inicial ao abrir o aplicativo
  useEffect(() => {
    async function restaurarVitrine() {
      try {
        const jsonSalvo = await AsyncStorage.getItem(CHAVE_VITRINE);
        if (jsonSalvo !== null) {
          setIdsCarrinho(JSON.parse(jsonSalvo));
        }
      } catch (erro) {
        console.log('Erro ao ler produtos do AsyncStorage:', erro);
      } finally {
        setDadosCarregados(true);
      }
    }

    restaurarVitrine();
  }, []);

  // 2. Gravação automática sempre que a lista de produtos mudar
  useEffect(() => {
    if (!dadosCarregados) return;

    async function sincronizarStorage() {
      try {
        if (idsCarrinho.length === 0) {
          await AsyncStorage.removeItem(CHAVE_VITRINE);
        } else {
          await AsyncStorage.setItem(
            CHAVE_VITRINE,
            JSON.stringify(idsCarrinho)
          );
        }
      } catch (erro) {
        console.log('Erro ao sincronizar produtos no AsyncStorage:', erro);
      }
    }

    sincronizarStorage();
  }, [idsCarrinho, dadosCarregados]);

  function alternarCarrinho(produtoId) {
    setIdsCarrinho((listaAtual) => {
      const jaNoCarrinho = listaAtual.includes(produtoId);
      if (jaNoCarrinho) {
        return listaAtual.filter((id) => id !== produtoId);
      } else {
        return [...listaAtual, produtoId];
      }
    });
  }

  function limparCarrinho() {
    setIdsCarrinho([]);
  }

  if (!dadosCarregados) {
    return (
      <View style={styles.telaCarregando}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.textoCarregando}>Restaurando produtos salvos...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#2563EB',
          tabBarInactiveTintColor: '#64748B',
          tabBarStyle: {
            height: 62,
            paddingBottom: 8,
            paddingTop: 6,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let nomeIcone = 'storefront-outline';
            if (route.name === 'ExplorarTab') {
              nomeIcone = focused ? 'storefront' : 'storefront-outline';
            } else if (route.name === 'MeuCarrinhoTab') {
              nomeIcone = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={nomeIcone} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="ExplorarTab"
          options={{
            title: 'Explorar',
            headerShown: false,
          }}
        >
          {() => (
            <ExplorarStack
              idsCarrinho={idsCarrinho}
              onToggleCarrinho={alternarCarrinho}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="MeuCarrinhoTab"
          options={{
            title: 'Meu Carrinho',
            headerStyle: { backgroundColor: '#0F172A' },
            headerTintColor: '#F8FAFC',
            headerTitleStyle: { fontWeight: 'bold' },
            tabBarBadge: idsCarrinho.length > 0 ? idsCarrinho.length : undefined,
          }}
        >
          {(props) => (
            <CarrinhoScreen
              {...props}
              idsCarrinho={idsCarrinho}
              onToggleCarrinho={alternarCarrinho}
              onLimparProdutos={limparCarrinho}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  telaCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  textoCarregando: {
    marginTop: 12,
    fontSize: 15,
    color: '#475569',
  },
});