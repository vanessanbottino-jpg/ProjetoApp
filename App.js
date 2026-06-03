import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  // 1. Convertemos todos os valores para positivo usando Math.abs()
  const absX = Math.abs(leitura.x);
  const absY = Math.abs(leitura.y);
  const absZ = Math.abs(leitura.z);

  // 2. Descobrimos qual é a maior magnitude bruta
  const maiorValor = Math.max(absX, absY, absZ);

  // 3. Descobrimos qual eixo venceu para aplicar o indicador correto
  let eixoMaior = "";
  if (maiorValor === absX) {
    eixoMaior = "X";
  } else if (maiorValor === absY) {
    eixoMaior = "Y";
  } else {
    eixoMaior = "Z";
  }
  // -----------------------------------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensor Ativo</Text>

      {/* Eixo X: Se for o maior, aplica o estilo 'destaque' e mostra o texto do indicador */}
      <Text style={[styles.eixoX, eixoMaior === "X" && styles.destaque]}>
        Eixo X: {leitura.x.toFixed(2)} {eixoMaior === "X" && " ◀ MAIOR FORÇA"}
      </Text>

      {/* Eixo Y: Se for o maior, aplica o estilo 'destaque' e mostra o texto do indicador */}
      <Text style={[styles.eixoY, eixoMaior === "Y" && styles.destaque]}>
        Eixo Y: {leitura.y.toFixed(2)} {eixoMaior === "Y" && " ◀ MAIOR FORÇA"}
      </Text>

      {/* Eixo Z: Se for o maior, aplica o estilo 'destaque' e mostra o texto do indicador */}
      <Text style={[styles.eixoZ, eixoMaior === "Z" && styles.destaque]}>
        Eixo Z: {leitura.z.toFixed(2)} {eixoMaior === "Z" && " ◀ MAIOR FORÇA"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "flex-start", // Alinha à esquerda para o texto maior ter espaço para crescer
    paddingLeft: 40,          // Dá um espaçamento da borda esquerda da tela
    backgroundColor: "#121212" // Fundo escuro para destacar as cores neon dos eixos
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 30,
    color: "#FFFFFF",
    alignSelf: "center",      // Mantém apenas o título centralizado na tela
    right: 20                 // Ajusta o centro por conta do paddingLeft do container
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
  
  // --- INDICADOR VISUAL DE DESTAQUE ---
  destaque: {
    fontSize: 32,          // Aumenta o tamanho da fonte significativamente
    fontWeight: "bold",    // Deixa o texto em negrito
  }
});