import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from './RootStackParams';
import { useNavigation } from "@react-navigation/native";

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

interface Dish {
    dish: string;
    discrption: string;
    price: string;
}

export default function SignUpScreen() {

    const id = "Max";
    const pass = '1234';

    const [Email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<LoginScreenProp>();

    const handleLogin = () => {
        if (Email === "" && username === "" && password === "") {
            alert("Please create your username and password");
        } else {
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={{color: '#fff', fontSize: 30, textAlign: 'center', marginBottom: 15,}}>Create an Account</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.BtnContainer}>
                    <TouchableOpacity style={styles.RegisterBtn } onPress={handleLogin}>
                        <Text style={{color: "#fff", fontWeight: "900", fontSize: 18 }}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.LogInBtn} onPress={() => navigation.navigate("LogIn")}>
                        <Text style={{color: "#fff", fontSize: 18 }}>Already have an account?</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        color: '#fff',
        backgroundColor: "#0d2e09",
        padding: 16,
    },
    input: {
        height: 55,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: "#fff",
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        elevation: 5,
    },
    BtnContainer: {
        width: "100%",
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    RegisterBtn: {
        width: 150,
        height: 45,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#7BD859',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        elevation: 30,
    },
    LogInBtn: {
        width: 250,
        margin: 10,
        borderColor: '#7BD859',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 10,
        elevation: 30,
    }
});