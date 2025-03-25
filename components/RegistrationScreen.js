import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert
} from "react-native";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";

const RegistrationScreen = ({ navigation, route }) => {
    const { role } = route.params || {}; // Get role from navigation params

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("Select Country");
    const [state, setState] = useState("Select State");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const stateOptions = {
        USA: ["Texas", "New York", "California"],
        India: ["Telangana", "Tamil Nadu", "Karnataka"],
    };

    const handleRegister = async () => {
        if (!email || !password || country === "Select Country" || state === "Select State") {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (!role) {
            Alert.alert("Error", "Invalid role. Please select 'farmer' or 'buyer'.");
            return;
        }

        try {
            const formattedRole = role.toLowerCase(); // Ensure lowercase role

            const response = await fetch("http://PC_IP:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, country, state, role }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Success", "Registration Successful");
                navigation.navigate("Login");
            } else {
                Alert.alert("Error", data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Error", "Server error. Try again later.");
        }
    };

    return (
        <ImageBackground
            source={require("../assets/registration-back.jpg")}
            style={styles.background}
        >
            <View style={styles.topSection}>
                <Text style={styles.title}>Register A New Account</Text>
                <Text style={styles.subtitle}>
                    Effortlessly create an account and unlock the future of smart agriculture!
                </Text>
            </View>

            <View style={styles.formContainer}>
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
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={country}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => {
                            setCountry(itemValue);
                            setState("Select State");
                        }}
                    >
                        <Picker.Item label="Select Country" value="Select Country" />
                        <Picker.Item label="USA" value="USA" />
                        <Picker.Item label="India" value="India" />
                    </Picker>
                </View>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={state}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setState(itemValue)}
                        enabled={country !== "Select Country"}
                    >
                        <Picker.Item label="Select State" value="Select State" />
                        {country !== "Select Country" &&
                            stateOptions[country].map((stateName, index) => (
                                <Picker.Item key={index} label={stateName} value={stateName} />
                            ))}
                    </Picker>
                </View>
                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={acceptedTerms}
                        onValueChange={setAcceptedTerms}
                        color={acceptedTerms ? "rgb(20, 68, 36)" : undefined}
                    />
                    <Text style={styles.checkboxText}>I accept the Terms and Conditions</Text>
                </View>
                <TouchableOpacity
                    style={[styles.registerButton, !acceptedTerms && styles.disabledButton]}
                    disabled={!acceptedTerms}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginLink}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: "cover", justifyContent: "flex-end", width: "100%", height: "100%" },
    topSection: { alignItems: "center", padding: 40 },
    title: { fontSize: 38, fontWeight: "bold", color: "#000", textAlign: "center" },
    subtitle: { fontSize: 18, fontWeight: "600", color: "#000", textAlign: "center", marginTop: 5, paddingHorizontal: 20 },
    formContainer: { backgroundColor: "#f7f5eb", padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, alignItems: "center", width: "100%" },
    input: { width: "90%", padding: 12, marginVertical: 8, backgroundColor: "#fff", borderRadius: 8, borderColor: "#ddd", borderWidth: 1 },
    pickerWrapper: { width: "90%", backgroundColor: "#fff", borderRadius: 8, overflow: "hidden", marginVertical: 8 },
    dropdown: { width: "100%", height: 50 },
    checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
    checkboxText: { marginLeft: 8, fontSize: 14, color: "#333" },
    registerButton: { backgroundColor: "rgb(20, 68, 36)", paddingVertical: 14, paddingHorizontal: 60, borderRadius: 12, marginTop: 15, width: "90%", alignItems: "center" },
    disabledButton: { backgroundColor: "#aaa" },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
    loginContainer: { flexDirection: "row", marginTop: 15 },
    loginText: { fontSize: 14, color: "#333" },
    loginLink: { fontSize: 14, fontWeight: "bold", color: "rgb(20, 68, 36)" },
});

export default RegistrationScreen;
