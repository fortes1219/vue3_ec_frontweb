import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { elComponents, elPlugins } from '@/plugins/element-plus'
import 'element-plus/theme-chalk/index.css'
import '/styles/style.scss'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(createPinia())
elComponents.forEach((component: any) => {
  app.component(component.name, component)
})
elPlugins.forEach((plugin) => {
  app.use(plugin)
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as any)
}

app.mount('#app')
