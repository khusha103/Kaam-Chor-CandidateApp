import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ekarigar.kaamchor',
  appName: 'Kaam-Chor',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,  // This disables the splash screen
    },
  }
};

export default config;
