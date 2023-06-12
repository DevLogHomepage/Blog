import { useRouter } from "next/navigation"
import notion from '../../../lib/notion'
import { NotionPage } from "@/components/NotionPage"
import "react-notion-x/src/styles.css"
import Modal from "react-modal"
import router from "next/router"

export default async function page(){
  const recordMap = await notion.getPage("25a989bf-7c76-4fbf-876c-8885f5f4ce34")
  return (
    <NotionPage recordMap={recordMap} isRoot={true} />
  )
}