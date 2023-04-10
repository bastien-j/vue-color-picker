import { createApp } from 'vue'
import App from './App.vue'

import { createColorPicker } from './colorPicker'

createApp(App).use(createColorPicker()).mount('#app')
