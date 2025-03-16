import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons

const RoleSelectionScreen = ({ navigation }) => {
    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>What Category Do You Fall Under?</Text>
                <Text style={styles.subtitle}>
                    We will optimize the app according to this preference
                </Text>
            </View>
            <View style={styles.rolesContainer}>
                <TouchableOpacity
                    style={[styles.roleBox, selectedRole === "Farmer" && styles.selectedRole]}
                    onPress={() => setSelectedRole("Farmer")}
                >
                    <Ionicons
                        name="leaf-outline"
                        size={50}
                        color={selectedRole === "Farmer" ? "rgb(20, 68, 36)" : "#7a7a7a"}
                    />
                    <Text style={styles.roleText}>Farmer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.roleBox, selectedRole === "Buyer" && styles.selectedRole]}
                    onPress={() => setSelectedRole("Buyer")}
                >
                    <Ionicons
                        name="cart-outline"
                        size={50}
                        color={selectedRole === "Buyer" ? "rgb(20, 68, 36)" : "#7a7a7a"}
                    />
                    <Text style={styles.roleText}>Buyer</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.navButton, styles.backButton]} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={20} color="black" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                {selectedRole && (
                    <TouchableOpacity
                        style={[styles.navButton, styles.continueButton]}
                        onPress={() => navigation.navigate("Registration", { role: selectedRole })}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.paginationContainer}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
            </View>
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
    headerContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#7a7a7a",
        textAlign: "center",
    },
    rolesContainer: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    roleBox: {
        width: "90%",
        paddingVertical: 25,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderWidth: 2,
        borderColor: "transparent",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    selectedRole: {
        borderColor: "rgb(20, 68, 36)",
    },
    roleText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
        marginTop: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 120,
    },
    navButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 160,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 2,
    },
    backButton: {
        backgroundColor: "#fff",
        borderColor: "#000",
    },
    backButtonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 8,
    },
    continueButton: {
        backgroundColor: "rgb(20, 68, 36)",
        borderColor: "rgb(20, 68, 36)",
        marginLeft: 10,
    },
    continueButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 8,
    },
    paginationContainer: {
        flexDirection: "row",
        marginTop: 15,
        position: "absolute",
        bottom: 50,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#d3d3d3",
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "rgb(20, 68, 36)",
    },
});

export default RoleSelectionScreen;
