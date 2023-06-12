'use client';
import * as React from 'react'
import Head from 'next/head'

import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic';
import "react-notion-x/src/styles.css"
import Link from 'next/link';
import ModalNotionPage from './ModalNotionPage';


const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
)
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)
const mapPageUrl = (pageId: string) => {
  return `/notion/${pageId}`
}

export const NotionPage = ({
  recordMap,
  isRoot = false,
  rootPageId
}: {
  recordMap: ExtendedRecordMap
  isRoot?: boolean
  rootPageId?: string
}) => {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)
  // if(isRoot)
    return (
      <>
        <Head>
          <meta name='description' content='React Notion X Minimal Demo' />

          <title>{title}</title>
        </Head>
        <NotionRenderer
        
            recordMap={recordMap}
            fullPage={true}
            darkMode={false}
            mapPageUrl= {mapPageUrl}
            components={{
              nextLink: Link,
              Collection,
              Equation,
              Pdf,
              Modal,
            }}
          />

        {/* </NotionRenderer> */}
      </>
    )
  // else 
  //   return(
  //     <>
  //       <Head>
  //         <meta name='description' content='React Notion X Minimal Demo' />

  //         <title>{title}</title>
  //       </Head>
  //       <ModalNotionPage recordMap={recordMap} />
  //     </>
  //   )
}
