import React from 'react'

import { Page, Head, Subhead, Content } from './written-content.style'

export interface IWrittenContentProps {
  position: 'bottom' | 'right'
  shouldDisplay?: boolean
  head?: string
  subhead?: string;
  content?: string;
}

export const WrittenContent: React.FC<IWrittenContentProps> = props => {
  const { head, subhead, content, position, shouldDisplay } = props

  return (
    <Page shouldDisplay={shouldDisplay} position={position}>
      {head && <Head data-testid="head">{head}</Head>}
      {subhead && <Subhead data-testid="subhead">{subhead}</Subhead>}
      {content && <Content data-testid="content">{content}</Content>}
    </Page>
  )
}
