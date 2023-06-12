'use client';

import React from "react"
import Modal from 'react-modal'
import router, { useRouter } from 'next/router'
import { NotionPage } from "./NotionPage"
import { ExtendedRecordMap } from "notion-types"

export default function page({
  recordMap,
  rootPageId
}: {
  recordMap: ExtendedRecordMap
  rootPageId?: string
}){
  return (
    // <Modal
    // isOpen={!!router.query.postId}
    // onRequestClose={() => router.push('/')}
    // contentLabel="Post modal"
    // >
    // </Modal>
    <NotionPage recordMap={recordMap} isRoot={false}/>

  )
}