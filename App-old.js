import { usestate, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  return (
    <View style={Vanessa.container}>
      <Text style={Vanessa.texto}>Olá mundo!</Text>
    </View>
  )
}



const Vanessa = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    fontSize: 100,
    fontWeight: "bold"
  }
});
