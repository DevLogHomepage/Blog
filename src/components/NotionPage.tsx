'use client';
import * as React from 'react'
import Head from 'next/head'

import { ExtendedRecordMap } from 'notion-types'
import { getPageTitle } from 'notion-utils'
import { NotionRenderer } from 'react-notion-x'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { useEffect } from 'react';
import "@/app/globals_notion.css"

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


export const NotionPage = ({
  recordMap,
  baseRoute,
  rootPageId
}: {
  recordMap: ExtendedRecordMap
  baseRoute?: string
  rootPageId?: string
}) => {
  if (!recordMap) {
    return null
  }
  const mapPageUrl = (pageId: string) => {
    return `/${baseRoute}${pageId}`
  }

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)
    return (
      <>
        <Head>
          <meta name='description' content='React Notion X Minimal Demo' />

          <title>{title}</title>
        </Head>
        <NotionRenderer
        
            recordMap={recordMap}
            fullPage={true}
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
}
