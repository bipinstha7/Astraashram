import React from 'react';
import { Slot } from 'expo-router';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './auth.styles';
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
const whiteLogo = require('../../assets/images/logo-white.png');

export default function AuthLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.authPage}>
      <Image source={whiteLogo} style={styles.authImage} resizeMode="contain" />
      <Slot />
      <StatusBar backgroundColor={colors[colorScheme ?? 'light'].background} />
    </SafeAreaView>
  );
}
