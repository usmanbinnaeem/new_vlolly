import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Lolly from "../components/Lolly"

export const query = graphql`
  query MyQuery($lollypath: String!) {
    mylollypath {
      LollyByPath(lollyPath: $lollypath) {
        sender
        message
        reciever
        top
        middle
        bottom
        lollyPath
      }
    }
  }
`

const Template = ({data}) => {
  const {LollyByPath} = data.mylollypath
  return (
    <div>
      <Lolly
        top={LollyByPath.top}
        middle={LollyByPath.middle}
        bottom={LollyByPath.bottom}
      />
      <p>{`https://myvlolly.netlify.app/lolly/${LollyByPath.lollyPath}`}</p>
      <div>
        <h1>to: {LollyByPath.reciever}</h1>
        <p>{LollyByPath.message}</p>
        <h3>From: {LollyByPath.sender}</h3>
        <p>
          made this virtual lollipop for you. You can{" "}
          <Link to="/createNew"> make your own</Link> to send to a friend who
          deserve some sugary treat which won't rot their teeth...
        </p>
      </div>
    </div>
  )
}

export default Template
