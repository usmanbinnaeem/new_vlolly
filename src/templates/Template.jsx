import React from "react"
import { Link } from "gatsby"
import Lolly from "../components/Lolly"

const Template = () => {
  return (
    <div>
      {/* <Lolly
        top={getLollybyAddress.tColor}
        middle={getLollybyAddress.mColor}
        bottom={getLollybyAddress.bColor}
      /> */}
      {/* <p>{`/lolly/${getLollybyAddress.address}`}</p> */}
      <div>
        {/* <h1>to: {getLollybyAddress.reciever}</h1>
        <p>{getLollybyAddress.message}</p>
        <h3>From: {getLollybyAddress.sender}</h3> */}
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
