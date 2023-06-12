import { useRouter } from "next/navigation"
import notion from '../../../../lib/notion'
import { NotionPage } from "@/components/NotionPage"
import "react-notion-x/src/styles.css"
import Modal from "react-modal"
import router from "next/router"

export default async function page({params}: {params: {id: string}}){
  // const router = useRouter()
  // const router = useRouter()
  // const { postId } = router.query
  const pageId = (params.id as string)
  const recordMap = await notion.getPage(pageId)
  return (
      <NotionPage recordMap={recordMap} isRoot={true} />

  )
}