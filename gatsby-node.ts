// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage } = actions
//   if (page.path === `/`) {
//     page.matchPath = `/*`
//     createPage(page)
//   }
// }

import axios from 'axios'
import crypto from 'crypto'
import "dotenv/config"
const header = {
  "Accept": "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version" : "2022-11-28"
}

function b64DecodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getPostJson(prefix:string,surfix:string,content:string){
  const startingPoint:number = content.indexOf(prefix) as number;
  const endingPoint:number = content.indexOf(surfix) as number;

  const title = content?.slice(startingPoint ,endingPoint + "---\n{".length + 1)
  const postData:string = title.slice(prefix.length - 1,title.length - surfix.length).replace(/\n/g,"")
  content = content?.replace(title as string,"")
  return [JSON.parse(postData),content]
}



exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // await for results
  const res = await axios.get(`https://api.github.com/repos/dennis0324/blogPost/contents/tech`,{
    headers:header
  })

  // map into these results and create nodes
  res.data.map(async (post, i) => {
    const res_content = await axios.get(post.git_url,{
      headers:header
    })
    const data = b64DecodeUnicode(res_content.data.content)

    const [metaJson,content] = getPostJson("---\n{","}\n---",data)
   
    const res_commit = await axios.get(`http://api.github.com/repos/dennis0324/blogPost/commits?path=${post.path}`,{
      headers:header
    }) 
    // console.log(res_commit)
    const dates = res_commit.data.map((commit) => commit.commit.author.date)
    console.log(dates)
    
    // Create your node object
    const userNode = {
      // Required fields
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Post`, // name of the graphQL query --> allPost {}
        contentDigest:''
        // contentDigest will be added just after
        // but it is required
      },
      children: [],
      title:metaJson.title,
      content:content,
      tags:metaJson.tags,
      dates:dates
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode))
      .digest(`hex`);
    // add it to userNode
    userNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(userNode);
  });

  return;
}