import { useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';

import InputError from './inputError';
import { colors } from '@/constants/colors';

interface iInputForm {
  name: string;
  label: string;
  error?: string;
  showIcon?: Boolean;
  customStyles?: object;
  secureTextEntry?: boolean;
  control: Control<FieldValues, any>;
  icon?: ImageSourcePropType | undefined;
  handleIconClick?: (event: GestureResponderEvent) => void;
}

export default function InputForm(props: iInputForm) {
  const [hasFocused, setHasFocused] = useState(false);

  const {
    name,
    icon,
    label,
    error,
    control,
    showIcon,
    handleIconClick,
    customStyles = {},
    secureTextEntry = false,
  } = props;

  return (
    <>
      <View style={[styles.floatingLabel]}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                value={value}
                style={[
                  styles.input,
                  customStyles,
                  hasFocused && styles.inputFocused,
                  showIcon && styles.iconInput,
                ]}
                onChangeText={onChange}
                secureTextEntry={secureTextEntry}
                onFocus={() => setHasFocused(true)}
                onBlur={() => setHasFocused(false)}
              />
              <Text style={[styles.label, (hasFocused || value) && styles.inputFocusedLabel]}>
                {label}
              </Text>
            </>
          )}
          name={name}
        />
        {showIcon ? (
          <Pressable style={styles.icon} onPress={handleIconClick}>
            <Image source={icon} />
          </Pressable>
        ) : null}
      </View>
      {error ? <InputError text={error} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  floatingLabel: {
    position: 'relative',
  },
  iconInput: {
    paddingRight: 40,
  },
  input: {
    height: 50,
    padding: 16,
    fontSize: 14,
    borderRadius: 8,
    paddingBottom: 0,
    backgroundColor: '#f5f5f5',
    color: colors.light.primaryFontColor,
  },
  label: {
    left: 0,
    top: 13,
    fontSize: 14,
    color: '#9d9b9f',
    position: 'absolute',
    paddingHorizontal: 16,
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: colors.light.primaryBgColor,
  },
  inputFocusedLabel: {
    fontSize: 11,
    transform: [{ translateY: -10 }],
  },
  icon: {
    top: 4,
    right: 0,
    marginLeft: 8,
    paddingRight: 16,
    paddingVertical: 8,
    position: 'absolute',
  },
});
