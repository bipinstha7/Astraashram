/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const colors = {
  errorColor: '#eb5757',
  light: {
    text: '#11181C',
    icon: '#687076',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    secondaryFontColor: '#ffffff',
    primaryFontColor: '#2a2a2a',

    primaryBgColor: '#014745',
    secondaryBgColor: '#ac9b6d',

    inactiveBgColor: '#d4d4d4',
    backgroundColor: '#ffffff',
  },

  dark: {
    backgroundColor: '#000000',
    primaryFontColor: '#ffffff',
    secondaryFontColor: '#2a2a2a',

    text: '#ECEDEE',
    icon: '#9BA1A6',
    tint: tintColorDark,
    background: '#151718',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  // body {
  //   color: var(--primary-font-color);
  //   background: var(--background-color);
  // }
};
