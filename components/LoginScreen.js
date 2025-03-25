import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
    ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Import AsyncStorage
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
    
        setLoading(true);
    
        try {
            console.log("🔵 Sending login request to server...");
            const response = await fetch("http://PC_IP:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            console.log("🔵 Awaiting response...");
            const data = await response.json();
            console.log("🔵 Server Response:", data);
    
            if (response.ok) {
                console.log("✅ Login Successful! Saving token...");
                await AsyncStorage.setItem("token", data.token);  // Save token
                await AsyncStorage.setItem("role", data.role);  // Save role
    
                Alert.alert("Success", "Login Successful!");
    
                // Navigate based on role
                if (data.role === "farmer") {
                    navigation.replace("FarmerDashboard");
                } else if (data.role === "buyer") {
                    navigation.replace("BuyerDashboard");
                } else {
                    Alert.alert("Error", "Invalid user role.");
                }
            } else {
                console.error("❌ Login Failed:", data);
                Alert.alert("Error", data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("❌ Network/Server Error:", error);
            Alert.alert("Error", "Server error. Please check your internet and try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <ImageBackground
            source={require("../assets/registration-back.jpg")}
            style={styles.background}
        >
            <View style={styles.overlay} />
            <View style={styles.topSection}>
                <Text style={styles.title}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Login to continue your journey.</Text>
            </View>

            <View style={styles.formContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="google" size={24} color="#DB4437" style={styles.icon} />
                    <Text style={styles.socialButtonText}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <FontAwesome name="apple" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.socialButtonText}>Login with Apple</Text>
                </TouchableOpacity>
                <Text style={styles.dividerText}>or</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#7a7a7a"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#7a7a7a"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                        <Text style={styles.registerLink}> Register</Text>
                    </TouchableOpacity>
                </View>

                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: "cover", justifyContent: "flex-end", width: "100%", height: "100%" },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0, 0, 255, 0.4)" },
    topSection: { alignItems: "center", padding: 40 },
    title: { fontSize: 38, fontWeight: "bold", color: "#000", textAlign: "center" },
    subtitle: { fontSize: 18, fontWeight: "600", color: "#000", textAlign: "center", marginTop: 5, paddingHorizontal: 20 },
    formContainer: { backgroundColor: "#f7f5eb", padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: "center", width: "100%" },
    socialButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, padding: 12, width: "90%", marginVertical: 8, justifyContent: "center", borderWidth: 1, borderColor: "#ddd" },
    socialButtonText: { fontSize: 16, fontWeight: "bold", marginLeft: 10, color: "#333" },
    icon: { marginRight: 10 },
    dividerText: { fontSize: 16, fontWeight: "bold", color: "#777", marginVertical: 10 },
    input: { width: "90%", padding: 12, marginVertical: 8, backgroundColor: "#fff", borderRadius: 8, borderColor: "#ddd", borderWidth: 1 },
    loginButton: { backgroundColor: "rgb(20, 68, 36)", paddingVertical: 14, paddingHorizontal: 60, borderRadius: 12, marginTop: 15, width: "90%", alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    registerContainer: { flexDirection: "row", marginTop: 15 },
    registerText: { fontSize: 14, color: "#333" },
    registerLink: { fontSize: 14, fontWeight: "bold", color: "rgb(20, 68, 36)" },
    pagination: { flexDirection: "row", marginTop: 20 },
    dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#bbb", marginHorizontal: 5 },
    activeDot: { backgroundColor: "rgb(20, 68, 36)" },
});

export default LoginScreen;
