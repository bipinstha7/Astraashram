import { colors } from '@/constants/colors';
import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';

interface iButton {
  text: string;
  isSubmitting?: boolean;
  handlePress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export default function Button(props: iButton) {
  return (
    <Pressable disabled={props.isSubmitting} style={styles.button} onPress={props.handlePress}>
      <Text style={styles.buttonText}>{props.text}</Text>
      {props.isSubmitting ? (
        <ActivityIndicator size="small" color={colors.light.backgroundColor} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    gap: 4,
    height: 40,
    borderRadius: 8,
    fontWeight: '500',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.light.primaryBgColor,
  },
  buttonText: {
    color: colors.light.secondaryFontColor,
  },
});
