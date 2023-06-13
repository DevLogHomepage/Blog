export type SiteConfig = {
  siteName: String
  siteDomain?: String
  router?: {id:String,pageRoute:String}[]
  github:{
    token:String
    username:String
    repo:String
  }
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  if(!config.siteName) throw new Error('siteName is required')
  if(config.github.repo === '') throw new Error('github.repo is required')
  if(config.github.token === '') throw new Error('github.token is required')
  if(config.github.username === '') throw new Error('github.username is required')
  return config
}