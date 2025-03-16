import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome } from "@expo/vector-icons";

const RegistrationScreen = ({ route, navigation }) => {
    const { role } = route.params || {};
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("Select Country");
    const [state, setState] = useState("Select State");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const stateOptions = {
        USA: ["Texas", "New York", "California"],
        India: ["Telangana", "Tamil Nadu", "Karnataka"],
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
                    onPress={() => alert(`Registering as a ${role}`)}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginLink}> Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.paginationContainer}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.activeDot]} />
                    <View style={styles.dot} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
    },
    topSection: {
        alignItems: "center",
        padding: 40,
    },
    title: {
        fontSize: 38,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        textAlign: "center",
        marginTop: 5,
        paddingHorizontal: 20,
    },
    formContainer: {
        backgroundColor: "#f7f5eb",
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
        width: "100%",
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 12,
        width: "90%",
        marginVertical: 8,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
        color: "#333",
    },
    icon: {
        marginRight: 10,
    },
    dividerText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#777",
        marginVertical: 10,
    },
    input: {
        width: "90%",
        padding: 12,
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    pickerWrapper: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        marginVertical: 8,
    },
    dropdown: {
        width: "100%",
        height: 50,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    checkboxText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#333",
    },
    registerButton: {
        backgroundColor: "rgb(20, 68, 36)",
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 12,
        marginTop: 15,
        width: "90%",
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#aaa",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        marginTop: 15,
    },
    loginText: {
        fontSize: 14,
        color: "#333",
    },
    loginLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "rgb(20, 68, 36)",
    },
    paginationContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "rgb(20, 68, 36)",
        width: 10,
        height: 10,
    },
});

export default RegistrationScreen;
