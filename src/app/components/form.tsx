'use client'

import { actionFunction, fixedActionFunction } from "../action"

export function ButtonSubmit() {
  const options = [
    {
      name: 'Blue',
      price: `USD 49.50`
    }
  ]

  return (
    <>
      <form action={() => actionFunction({ options })}>
        <button style={{ maxWidth: 'fit-content', paddingInline: 4 }}>Submit Button</button>
      </form>
      <br />
      <span>this works as expected so look the problem is in <code>./src/create-server-action.ts</code></span>
      <form action={() => fixedActionFunction({ options })}>
        <button style={{ maxWidth: 'fit-content', paddingInline: 4 }}>With Fixed Action</button>
      </form>
    </>
  )
}