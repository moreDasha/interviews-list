import Nora from '@primevue/themes/nora';
import { definePreset } from '@primevue/themes';

export const PrimePreset = definePreset(Nora, {
  semantic: {
    primary: {
      50: '{lime.50}',
      100: '{lime.100}',
      200: '{lime.200}',
      300: '{lime.300}',
      400: '{lime.400}',
      500: '{lime.500}',
      600: '{lime.600}',
      700: '{lime.700}',
      800: '{lime.800}',
      900: '{lime.900}',
      950: '{lime.950}'
    },
    transitionDuration: '0.3s',
    borderRadiusXs: '16px',
    borderRadiusSm: '16px'
  },
  components: {
    menubar: {
      background: '{lime.50}',
      padding: '0.7rem',
      baseItemPadding: '0.65rem 0.85rem'
    },
    button: {
      paddingX: '0.85rem',
      paddingY: '0.65rem'
    },
    card: {
      background: '{lime.50}',
      bodyGap: '18px'
    },
    inputtext: {
      paddingX: '1rem',
      paddingY: '0.8rem'
    }
  }
});