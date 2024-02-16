import { createApp } from 'vue'
import App from './App.vue'
import { 
  provideDesignSystem, 
  alphaCard, 
  alphaButton,
  alphaTextField
} from '@genesislcap/alpha-design-system';

provideDesignSystem()
    .register(
        alphaCard(),
        alphaButton(),
        alphaTextField()
    );

createApp(App).mount('#app')
