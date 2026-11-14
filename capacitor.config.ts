import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.manaorbit.ascencia',
  appName: 'Ascencia',
  webDir: 'dist/jouer',
  android: { backgroundColor: '#0b0816' },
  plugins: {
    SplashScreen: { launchShowDuration: 800, backgroundColor: '#0b0816', showSpinner: false },
  },
};
export default config;
