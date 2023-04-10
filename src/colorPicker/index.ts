import { defineAsyncComponent, type App } from 'vue'
import '@material-design-icons/font/filled.css'

export function createColorPicker() {
  return (app: App) => {
    app.component(
      'ColorPicker',
      defineAsyncComponent(() => import('./ColorPicker.vue'))
    )
  }
}