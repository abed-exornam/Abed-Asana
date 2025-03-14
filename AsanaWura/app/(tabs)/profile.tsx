import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { account, getCurrentUser, logoutUser } from '../../lib/appwrite';
import { router } from 'expo-router';
import { icons } from '@/constants';
import { StatusBar } from 'expo-status-bar';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user details
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching data:', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
        Alert.alert('Error', 'Unable to fetch profile data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign-in');
  };
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {user && (
        <View style={styles.profileSection}>
          <View style={{ alignSelf: 'flex-end' }}>
            <TouchableOpacity onPress={handleLogout}>
              <Image source={icons.logout} style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileDetails}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{user.username}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      )}
      
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileDetails: {
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  logoutIcon: {
    resizeMode: 'contain',
    height: 30,
    width: 50,
    paddingTop:5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
