import { Commit, ContentTree } from "@/types/github";
import axios from "axios";
import { jsonToSchema } from "nextql_schema";
import { IScriptParams } from "prebuild";

import { FetchingJSONSchemaStore, InputData, JSONSchemaInput, quicktype } from 'quicktype-core';
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


async function getGithub(){

  // const result = [] as any
  const res = await axios.get<ContentTree[]>(`https://api.github.com/repos/dennis0324/blogPost/contents/tech`,{
    headers:header
  })


  const result = await Promise.all(res.data.map(async (post, i) => {
    const res_content = await axios.get(post.git_url!,{
      headers:header
    })
    const data = b64DecodeUnicode(res_content.data.content)

    const [metaJson,content] = getPostJson("---\n{","}\n---",data)
   
    const res_commit = await axios.get<Commit[]>(`http://api.github.com/repos/dennis0324/blogPost/commits?path=${post.path}`,{
      headers:header
    }) 
    const dates = res_commit.data.map((commit) => commit.commit.author?.date)
    // console.log(dates)
    
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

    // result.push(userNode)
    // console.log(userNode)

    // console.log(userNode)

    // result.push(userNode)
    // const contentDigest = crypto
    //   .createHash(`md5`)
    //   .update(JSON.stringify(userNode))
    //   .digest(`hex`);
    // userNode.internal.contentDigest = contentDigest;

    // createNode(userNode);
    return userNode
  }))

  return result
}

export default async function execute(params: IScriptParams){
  const result = await getGithub()
  const json = jsonToSchema({baseType:'Post',prefix:'',jsonInput:result})
  return json;
  // console.log("testing");
}