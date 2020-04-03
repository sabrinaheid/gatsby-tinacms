import React from "react"
import { Link } from "gatsby"

export default function Layout(props) {
  return (
    <div>
      <Link 
        to="/"
        style={{
          textDecoration: 'none'
        }}>
        <h1>Gatsby &amp; TinaCMS Demo</h1>
      </Link>
      <div
        style={{
          width: '80%',
          margin: '0 auto',
        }}>
        {props.children}
      </div>
    </div>
  )
}