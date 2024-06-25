import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light.primaryBgColor,
  },
  authImage: {
    width: 300,
    height: 150,
  },
  authForm: {
    width: 337,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
  },
  authTitle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 40.8,
  },
  inputWrapper: {
    gap: 20,
  },
  forgotPassword: {
    marginLeft: 'auto',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
    marginTop: 10,
    marginBottom: 20,
    color: colors.light.primaryBgColor,
  },
  accountTextWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 2,
  },
  accountText: {
    fontWeight: '600',
    color: colors.light.primaryBgColor,
  },
});
