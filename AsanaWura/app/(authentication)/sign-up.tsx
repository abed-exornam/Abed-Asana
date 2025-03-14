import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useGlobalContext } from '@/context/GlobalProvider';

import FormField from '@/components/formField';
import CustomButtonT from '@/components/custom2';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const {setUser,setIsLoggedIn}= useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
  
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/home');  // Redirect to sign-in screen after successful sign-up

    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.secondaryBackgroundColor}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.container}>
          <Text style={{ color: '#0D0D0D', fontSize: 30, fontWeight: 'bold' }}>
            SignUp For Koko<Text style={{ color: '#FE8A35' }}>Wura</Text>
          </Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
          />

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            secureTextEntry
          />

          <CustomButtonT 
            title='Sign Up'
            handlePress={submit}
            isLoading={submitting}
          />

          <View style={styles.container2}>
            <Text style={{
              paddingBottom: 20,
              textAlign: 'center',
              color: '#0D0D0D',
              fontSize: 20,
              fontWeight: 'bold'
            }}>
              Already have an account? 
            </Text>
            <Link href='/sign-in'>
              <Text style={{ color: '#FE8A35', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '80%',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 50,
    padding: 20,
  },
  container2: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  secondaryBackgroundColor: {
    backgroundColor: '#F2F2F2',
  },
});
