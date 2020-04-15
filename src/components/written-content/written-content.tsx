import React from 'react'

import { Page, Head, Subhead, Content } from './written-content.style'

interface WrittenContentProps {
  position: 'bottom' | 'right'
  shouldDisplay?: boolean
  head?: string
  subhead?: string;
  content?: string;
}

export const WrittenContent: React.FC<WrittenContentProps> = props => {
  const { head, subhead, content, position, shouldDisplay } = props

  return (
    <Page shouldDisplay={shouldDisplay} position={position}>
      {head && <Head>{head}</Head>}
      {subhead && <Subhead>{subhead}</Subhead>}
      {content && <Content>{content}</Content>}
    </Page>
  )
}
