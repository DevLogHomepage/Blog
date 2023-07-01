export interface NextQlNode {
  id: string
  parent: string
  children: Array<string>
  internal: {
    type: string
    // counter: number
    // owner: string
    contentDigest: string
    mediaType?: string
    content?: string
    description?: string
  }
  [key: string]: unknown
  // fields: Array<string>
}
