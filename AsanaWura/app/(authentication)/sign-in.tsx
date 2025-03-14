import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import FormField from '@/components/formField';
import CustomButtonT from '@/components/custom2';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { account } from '../../lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn = () => {
  const {setUser,setIsLoggedIn}= useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setSubmitting(true);
      try {
        await signIn  (form.email, form.password);
        const result = await getCurrentUser();

        setUser(result);
        setIsLoggedIn(true)

        router.replace("/home");

      } catch (error) {
        Alert.alert('Error',error.message)
      }finally{
        setSubmitting(false)
      }

    }     

  return (
    <SafeAreaView style={styles.secondaryBackgroundColor}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Login To Koko<Text style={styles.titleHighlight}>Wura</Text>
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            secureTextEntry
          />
          <CustomButtonT
            title="Sign In"
            handlePress={submit}
            isLoading={submitting}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?
            </Text>
            <Link href="/sign-up">
              <Text style={styles.signUpLink}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '80%',
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 50,
    padding: 20,
  },
  title: {
    color: '#0D0D0D',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titleHighlight: {
    color: '#FE8A35',
  },
  signUpContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  signUpText: {
    paddingBottom: 20,
    color: '#0D0D0D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signUpLink: {
    color: '#FE8A35',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondaryBackgroundColor: {
    backgroundColor: '#F2F2F2',
  },
});
