import notion from '../../../../lib/notion'
import { NotionPage } from "@/components/NotionPage"

export default async function page({params}: {params: {id: string}}){
  const pageId = (params.id as string)
  const recordMap = await notion.getPage(pageId)
  return (
      <NotionPage recordMap={recordMap} baseRoute='project/'/>
  )
}