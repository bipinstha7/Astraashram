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
import { signUpSchema } from '@/lib/schemas/auth.schema';
import { iSignUp, iSignupPayload } from '@/lib/interfaces/auth.interface';
import { iApiValidationError } from '@/lib/requests/api-requests.interface';

const eyeOpenIcon = require('../../assets/icons/eye-open.png');
const eyeCloseIcon = require('../../assets/icons/eye-close.png');

export default function SignUp() {
  const { signUp } = useAuth();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState('');

  const submitForm = async (data: iSignupPayload) => {
    try {
      setCustomError('');
      await signUp(data);
    } catch (error: any) {
      console.log({ signUpSubmitFormError: error });

      if (error.error === VALIDATION_EXCEPTION) {
        const err: iApiValidationError = error;
        err.message.map(e =>
          setError(e.property as keyof iSignUp, { type: 'custom', message: e.message })
        );
      } else {
        setCustomError(error.message);
      }
    }
  };

  return (
    <View style={styles.authForm}>
      <View style={styles.inputWrapper}>
        <Text style={styles.authTitle}>Sign Up</Text>
        <InputForm
          name="name"
          label="Full Name"
          control={control}
          error={errors?.name?.message as string}
        />
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

        {customError ? <InputError text={customError} customStyles={{ marginBottom: 4 }} /> : null}

        <Button
          text="Sign up"
          isSubmitting={isSubmitting}
          handlePress={handleSubmit(submitForm as SubmitHandler<FieldValues>)}
        />
      </View>

      <View style={styles.accountTextWrapper}>
        <Text>Already have an account?</Text>
        <Link href="/sign-in" style={styles.accountText}>
          Sign in
        </Link>
      </View>
    </View>
  );
}
