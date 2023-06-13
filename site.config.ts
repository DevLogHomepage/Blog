// 1. 블로그 사이트 이름
// 2. 블로그 도메인
// 3. router -> {
// 	id: 
// 	pageRoute
// }
// 4. 
// 5. .env
//  5-1. github token
//  5-2. github 아이디
//  5-3. github repo
import { siteConfig } from './lib/siteConfig'
import "dotenv/config"

siteConfig({
  siteName: 'foxstar Devlog',

  // siteDomain: 'https://foxstar-devlog.netlify.app',
  router: [
    {id:'HOME',pageRoute:'/'},
    {id:'POST',pageRoute:'/post'},
    {id:'PROJECT',pageRoute:"/project"},
    {id:'ABOUT',pageRoute:'/about'}
  ],
  github:{
    token: process.env.GITHUB_TOKEN ?? '',
    username: process.env.GITHUB_USERNAME ?? '',
    repo: process.env.GITHUB_REPO ?? ''
  }
})

export { siteConfig }