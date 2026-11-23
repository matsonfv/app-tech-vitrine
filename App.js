// Arquivo: App.js (Prática Guiada - Navegação Combinada: Bottom Tabs + Stack Navigator)
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialDesignIcons } from '@expo/vector-icons';

import CatalogoScreen from './src/screens/CatalogoScreen';
import DetalhesCursoScreen from './src/screens/DetalhesCursoScreen';
import MinhasMatriculasScreen from './src/screens/MinhasMatriculasScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pilha de navegação exclusiva da primeira aba (Catálogo -> Detalhes)
function ExplorarStack({ idsMatriculados, onToggleMatricula }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Catalogo"
        options={{ title: 'Catálogo de Cursos' }}
      >
        {(props) => (
          <CatalogoScreen
            {...props}
            idsMatriculados={idsMatriculados}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="DetalhesCurso"
        options={({ route }) => ({
          title: route.params?.curso?.categoria || 'Detalhes do Curso',
        })}
      >
        {(props) => (
          <DetalhesCursoScreen
            {...props}
            idsMatriculados={idsMatriculados}
            onToggleMatricula={onToggleMatricula}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [idsMatriculados, setIdsMatriculados] = useState([]);

  function alternarMatricula(cursoId) {
    setIdsMatriculados((listaAtual) => {
      const jaMatriculado = listaAtual.includes(cursoId);
      if (jaMatriculado) {
        return listaAtual.filter((id) => id !== cursoId);
      } else {
        return [...listaAtual, cursoId];
      }
    });
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
              idsMatriculados={idsMatriculados}
              onToggleMatricula={alternarMatricula}
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
            tabBarBadge: idsMatriculados.length > 0 ? idsMatriculados.length : undefined,
          }}
        >
          {(props) => (
            <MinhasMatriculasScreen
              {...props}
              idsMatriculados={idsMatriculados}
              onToggleMatricula={alternarMatricula}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}