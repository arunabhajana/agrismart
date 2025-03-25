import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FarmScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Farm Management</Text>
            <Text style={styles.subText}>Manage your farm activities here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f7f5eb" },
    text: { fontSize: 24, fontWeight: "bold", color: "rgb(20, 68, 36)" },
    subText: { fontSize: 16, color: "#555", marginTop: 10 },
});

export default FarmScreen;
