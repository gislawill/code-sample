import * as React from "react"
import { render } from "@testing-library/react"
import { WrittenContent, IWrittenContentProps } from './written-content'

test("Displays the correct title", () => {
  const props: IWrittenContentProps = {
    position: 'bottom',
    head: 'Test Title'
  }
  const { getByTestId, queryByTestId } = render(<WrittenContent {...props} />)
  expect(getByTestId('head')).toHaveTextContent(props.head)
  expect(queryByTestId('subhead')).toBe(null)
})