import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FarmScreen from "./FarmScreen";
import OrderScreen from "./OrderScreen";
import MoreScreen from "./MoreScreen";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
    const [email, setEmail] = useState("");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmail = await AsyncStorage.getItem("email");
                if (userEmail) {
                    setEmail(userEmail);
                }

                // Simulated API call for stats
                const response = await fetch("http://PC_IP:3000/api/farmer/stats");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Welcome, Farmer</Text>
            {email && <Text style={styles.emailText}>{email}</Text>}

            {loading ? (
                <ActivityIndicator size="large" color="green" />
            ) : (
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statTitle}>Today's Collection</Text>
                        <Text style={styles.statValue}>{stats?.todayCollection || "0"} kg</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statTitle}>Weekly Collection</Text>
                        <Text style={styles.statValue}>{stats?.weeklyCollection || "0"} kg</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statTitle}>Total Listings</Text>
                        <Text style={styles.statValue}>{stats?.totalListings || "0"}</Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const FarmerDashboard = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Dashboard") iconName = "home-outline";
                    else if (route.name === "Farm") iconName = "leaf-outline";
                    else if (route.name === "Order") iconName = "cart-outline";
                    else if (route.name === "More") iconName = "menu-outline";
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Farm" component={FarmScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="More" component={MoreScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f7f5eb" },
    header: { fontSize: 28, fontWeight: "bold", color: "rgb(20, 68, 36)", marginBottom: 10 },
    emailText: { fontSize: 16, color: "#555", marginBottom: 20 },
    statsContainer: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
    statBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "45%",
        marginVertical: 10,
        elevation: 3,
    },
    statTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
    statValue: { fontSize: 22, fontWeight: "bold", color: "green", marginTop: 5 },
});

export default FarmerDashboard;
