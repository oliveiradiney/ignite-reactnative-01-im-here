
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'

import { Participant } from '../../components/Participant';
import { styles } from './styles';

export default function Home() {

    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        const regex = /^[a-zA-Z\s]+$/;

        if (!participantName) {
            Alert.alert("Nome do participante vazio", "Por favor insira um nome para o participante");
        } else if (!regex.test(participantName)) {
            Alert.alert("Nome do participante inválido", "O nome do participante deve conter apenas letras e espaços");
        }
        else if(participants.includes(participantName)){
            Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
        }else{
            setParticipants(prevState => [...prevState, participantName]);
            setParticipantName(''); 
        }

     
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                Sexta, 17 de Março de 2023.
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant
                    key={item}
                    onRemove={() => handleParticipantRemove(item)}
                    name={item}
                />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

            

        </View>
    )
}