import axios from "axios";
import { Commits } from "./types/Commit";
import { ContentTree } from "./types/Content";

const header = {
  "Accept": "application/vnd.github+json",
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version" : "2022-11-28"
}

function b64DecodeUnicode(str:string) {
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


async function fetchGithub() {
  const Node = []
  const res = await axios.get(`https://api.github.com/repos/dennis0324/blogPost/contents/tech`,{
    headers:header
  })

  res.data.map(async (post:ContentTree, i:number) => {
    const res_content = await axios.get(post.git_url!,{
      headers:header
    })
    const data = b64DecodeUnicode(res_content.data.content)

    const [metaJson,content] = getPostJson("---\n{","}\n---",data)
   
    const res_commit = await axios.get<Commits>(`http://api.github.com/repos/dennis0324/blogPost/commits?path=${post.path}`,{
      headers:header
    }) 
    const dates = res_commit.data.map((commits) => commits.commit.author?.date)
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

    Node.push(userNode)
  });

}

fetchGithub()

export {fetchGithub};