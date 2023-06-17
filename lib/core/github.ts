import { siteConfig } from "@lib/siteConfig";

async function getRepoFile(){
  const response = await axios.get(`https://api.github.com/repos/${siteConfig().github.username}//contents/tech`)
}


const res = await axios.get(`https://api.github.com/repos/dennis0324/blogPost/contents/tech`,{
    headers:header
  })

  res.data.map(async (post, i) => {
    const res_content = await axios.get(post.git_url,{
      headers:header
    })
    const data = b64DecodeUnicode(res_content.data.content)

    const [metaJson,content] = getPostJson("---\n{","}\n---",data)
   
    const res_commit = await axios.get(`http://api.github.com/repos/dennis0324/blogPost/commits?path=${post.path}`,{
      headers:header
    }) 
    const dates = res_commit.data.map((commit) => commit.commit.author.date)
    console.log(dates)
    
    const userNode = {
      id: `${i}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Post`, // name of the graphQL query --> allPost {}
        contentDigest:''
      },
      children: [],
      title:metaJson.title,
      content:content,
      tags:metaJson.tags,
      dates:dates
    }

    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(userNode))
      .digest(`hex`);
    userNode.internal.contentDigest = contentDigest;

    createNode(userNode);
  });
