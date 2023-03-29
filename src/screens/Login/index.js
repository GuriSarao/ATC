import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GRAY_TEXT, MAIN_BLUE, MAIN_RED } from '../../theme';
import { Input } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import imagePaths from '../../theme/imagePaths';
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { showMessage } from 'react-native-flash-message';
import { Login_user } from '../../redux/actions/users.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.users.isRequesting)

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required"),
    password: Yup.string().required("Password is Required"),
  })

  const showFlashMessage = (message, type) => {
    showMessage({
      message: message || "Something went wrong",
      type: 'default',
      // icon: type || "warning",

    });
  }

  const Submit = (values) => {
    dispatch(Login_user(values)).then(async (res) => {
      if (res?.data?.length) {
        showFlashMessage(res.message),
          navigation.reset({
            index: 0,
            routes: [{ name: 'Bottomtabs' }],
          })
        await AsyncStorage.setItem('user_detail', JSON.stringify(res?.data))
      }
      else {
        showFlashMessage(res.message)
      }
    })
  }

  return (
    <>
      <SafeAreaView style={styles.safearea} >
        <StatusBar backgroundColor={MAIN_BLUE} barStyle={'light-content'} />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          extraScrollHeight={30}
          extraHeight={30}
          showsVerticalScrollIndicator={false}
        >
          <Loader isLoading={isLoading} />
          <View style={styles.top}>
            <Image source={imagePaths.logo} style={styles.img} />
          </View>
          <View style={styles.container}>
            <Text style={styles.logintext}>Login</Text>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={(values) => Submit(values)}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, values, errors, touched, handleChange }) => (
                <>
                  <Input
                    placeholder='Username'
                    leftIcon={
                      <Ionicons
                        name='mail-outline'
                        size={20}
                        color={GRAY_TEXT}
                      />
                    }
                    inputContainerStyle={[styles.inputStyle,
                    errors.username && { borderColor: MAIN_RED }]}
                    inputStyle={{ fontSize: 17, letterSpacing: 0.2 }}
                    placeholderTextColor={GRAY_TEXT}
                    onChangeText={handleChange('username')}
                    value={values.username}
                    errorMessage={errors.username}
                    errorStyle={{ color: MAIN_RED }}

                  />
                  <Input
                    placeholder='Password'
                    leftIcon={
                      <Ionicons
                        name='lock-closed-outline'
                        size={20}
                        color={GRAY_TEXT}
                      />
                    }
                    placeholderTextColor={GRAY_TEXT}
                    inputContainerStyle={[styles.inputStyle,
                    errors.password && { borderColor: MAIN_RED }]}
                    inputStyle={{ fontSize: 17, letterSpacing: 0.2 }}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    errorMessage={errors.password}
                    errorStyle={{ color: MAIN_RED }}
                    secureTextEntry={true}
                  />
                  <Button
                    title={'Login'}
                    style={styles.btn}
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
export default Login;
