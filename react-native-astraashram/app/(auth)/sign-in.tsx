import { useState } from 'react';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useAuth from '@/hooks/useAuth';
import { styles } from './auth.styles';
import Button from '@/components/button';
import { VALIDATION_EXCEPTION } from '@/constants';
import InputForm from '@/components/form/inputForm';
import InputError from '@/components/form/inputError';
import { signInSchema } from '@/lib/schemas/auth.schema';
import { iSignIn, iSigninPayload } from '@/lib/interfaces/auth.interface';
import { iApiValidationError } from '@/lib/requests/api-requests.interface';

const eyeOpenIcon = require('../../assets/icons/eye-open.png');
const eyeCloseIcon = require('../../assets/icons/eye-close.png');

export default function SignIn() {
  const { signIn } = useAuth();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const [customError, setCustomError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const submitForm = async (data: iSigninPayload) => {
    try {
      setCustomError('');
      await signIn(data);
    } catch (error: any) {
      console.log({ signInSubmitFormError: error });

      if (error.error === VALIDATION_EXCEPTION) {
        const err: iApiValidationError = error;
        err.message.map(e =>
          setError(e.property as keyof iSignIn, { type: 'custom', message: e.message })
        );
      } else {
        setCustomError(error.message);
      }
    }
  };

  return (
    <View style={styles.authForm}>
      <View style={styles.inputWrapper}>
        <Text style={styles.authTitle}>Sign In</Text>
        <InputForm
          name="email"
          label="E-mail"
          control={control}
          error={errors?.email?.message as string}
        />
        <InputForm
          showIcon
          name="password"
          label="Password"
          control={control}
          secureTextEntry={!showPassword}
          error={errors?.password?.message as string}
          icon={showPassword ? eyeCloseIcon : eyeOpenIcon}
          handleIconClick={() => setShowPassword(!showPassword)}
        />
      </View>
      <Link href="/forgot-password" style={styles.forgotPassword}>
        Forgot Password?
      </Link>

      {customError ? <InputError text={customError} customStyles={{ marginBottom: 4 }} /> : null}

      <Button
        text="Sign in"
        isSubmitting={isSubmitting}
        handlePress={handleSubmit(submitForm as SubmitHandler<FieldValues>)}
      />
      <View style={styles.accountTextWrapper}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up" style={styles.accountText}>
          Sign up
        </Link>
      </View>
    </View>
  );
}
