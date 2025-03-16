import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image source={require("../assets/agriculture-icon.png")} style={styles.icon} />
            <Text style={styles.title}>AgriSmart</Text>
            <Text style={styles.subtitle}>A smart way to connect farmers and buyers</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RoleSelection")}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffceb",
        paddingHorizontal: 20,
    },
    icon: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "rgb(20, 68, 36)",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: "rgb(20, 68, 36)",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default OnboardingScreen;
