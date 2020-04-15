import styled from 'styled-components'

interface PageProps {
  readonly shouldDisplay?: boolean
  readonly position: 'bottom' | 'right'
};

export const Page = styled.div<PageProps>`
  background-color: white;
  position: ${p => (p.shouldDisplay ? 'absolute' : 'fixed')};
  top: 0;
  z-index: 10000;
  margin-top: ${p => (p.position === 'bottom'  
    ? p.shouldDisplay ? '85vh' : '105vh' : '0')};
  margin-left: ${p => (p.position === 'right'  
    ? p.shouldDisplay ? '60%' : '110%' : '0')};
  width: ${p => (p.position === 'bottom' ? '100%' : '40%')};
  padding: ${p => (p.position === 'bottom' ? '20px 15% 500px' : '20px 5% 500px')};
  transition: all 1s;
`

export const Head = styled.h1`
  font-weight: 700;
  font-size: 2.25rem;
  color: #2B2B2B;
  margin-top: 2.25rem;
`

export const Subhead = styled.h5`
  font-weight: 400;
  font-size: 1.25rem;
  color: #2B2B2B;
`

export const Content = styled.p`
  font-size: 0.875rem;
  color: #2B2B2B;
`