import { siteConfig } from './lib/site-config'

export default siteConfig({
  siteName: 'foxstar Devlog',

  // siteDomain: 'https://foxstar-devlog.netlify.app',
  router: [
    {id:'HOME',pageRoute:'/'},
    {id:'POST',pageRoute:'/post'},
    {id:'PROJECT',pageRoute:"/project"},
    {id:'ABOUT',pageRoute:'/about'}
  ],
  githubRepo: 'blogPost',
  githubUsername: 'dennis0324'
})