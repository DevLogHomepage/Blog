import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      // We prefix path aliases with '#', see https://vite-plugin-ssr.com/path-aliases#vite
      '#root': __dirname
    }
  },
}

export default config
