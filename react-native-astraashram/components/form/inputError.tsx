import { colors } from '@/constants/colors';
import { StyleSheet, Text } from 'react-native';

interface iInputError {
  text: string;

  /**
   * margin: top right bottom left
   */
  margin?: string;

  customStyles?: object;
}

export default function InputError({ text, customStyles = {} }: iInputError) {
  return <Text style={[styles.inputError, customStyles]}>{text}</Text>;
}

const styles = StyleSheet.create({
  inputError: {
    fontSize: 10,
    marginTop: -16,
    marginBottom: -8,
    color: colors.errorColor,
  },
});
