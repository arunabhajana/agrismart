import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MoreScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>More Options</Text>
            <Text style={styles.subText}>Access additional settings and features here.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f7f5eb" },
    text: { fontSize: 24, fontWeight: "bold", color: "rgb(20, 68, 36)" },
    subText: { fontSize: 16, color: "#555", marginTop: 10 },
});

export default MoreScreen;
