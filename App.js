import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [leitura, setLeitura] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Define quantos milissegundos entre cada leitura (100ms = 10 leituras por segundo)
    Accelerometer.setUpdateInterval(100);

    // Inscreve o sensor para atualizar o estado
    const inscricao = Accelerometer.addListener(setLeitura);

    // Cleanup: cancela a inscrição quando o componente sai da tela
    return () => inscricao.remove();
  }, []);

  // --- INTELIGÊNCIA ANALÍTICA (CÁLCULO DO MAIOR EIXO) ---
  const absX = Math.abs(leitura.x);
  const absY = Math.abs(leitura.y);
  const absZ = Math.abs(leitura.z);

  const maiorValor = Math.max(absX, absY, absZ);

  let eixoMaior = "";
  if (maiorValor === absX) {
    eixoMaior = "X";
  } else if (maiorValor === absY) {
    eixoMaior = "Y";
  } else {
    eixoMaior = "Z";
  }

  // --- FUNÇÃO QUE FAZ O BOTÃO FUNCIONAR ---
  const lidarComClique = () => {
    Alert.alert("Sensor", `O maior eixo detectado agora é o ${eixoMaior}!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensor Ativo</Text>

      {/* Eixo X */}
      <Text style={[styles.eixoX, eixoMaior === "X" && styles.destaque]}>
        Eixo X: {leitura.x.toFixed(2)} {eixoMaior === "X" && " ◀ MAIOR FORÇA"}
      </Text>

      {/* Eixo Y */}
      <Text style={[styles.eixoY, eixoMaior === "Y" && styles.destaque]}>
        Eixo Y: {leitura.y.toFixed(2)} {eixoMaior === "Y" && " ◀ MAIOR FORÇA"}
      </Text>

      {/* Eixo Z */}
      <Text style={[styles.eixoZ, eixoMaior === "Z" && styles.destaque]}>
        Eixo Z: {leitura.z.toFixed(2)} {eixoMaior === "Z" && " ◀ MAIOR FORÇA"}
      </Text>

      {/* NOVO BOTÃO CUSTOMIZADO */}
      <TouchableOpacity style={styles.botao} onPress={lidarComClique}>
        <Text style={styles.textoBotao}>Verificar Maior Força</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "flex-start", 
    paddingLeft: 40,          
    backgroundColor: "#121212" 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 30,
    color: "#FFFFFF",
    alignSelf: "center",      
    right: 20                 
  },
  eixoX: { 
    fontSize: 20, 
    color: "#00F0FF",
    marginVertical: 12
  },
  eixoY: { 
    fontSize: 20, 
    color: "#FF003C",
    marginVertical: 12
  },
  eixoZ: { 
    fontSize: 20, 
    color: "#FFF000",
    marginVertical: 12
  },
  destaque: {
    fontSize: 32,          
    fontWeight: "bold",    
  },
  // Corrigido o nome e adicionada a vírgula que faltava acima
  botao: {
    backgroundColor: "#007BFF", 
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,             
    alignSelf: "center",       
    right: 20                  
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  }
});