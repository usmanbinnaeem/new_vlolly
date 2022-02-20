import * as React from "react"
import Lolly from "../components/Lolly"
import { navigate } from "gatsby"
import Header from "../components/header"

const IndexPage = () => {
  const topColor = "#333"
  const middleColor = "#000"
  const bottomColor = "#fff"

  return (
    <>
      <Header siteTitle="Virtual lolly" />
      <div className="container">
        <Lolly top={topColor} middle={middleColor} bottom={bottomColor} />
        <input
          style={{ margin: "35px" }}
          className="createButton"
          type="button"
          value="Make New lolly for your Friend"
          onClick={() => {
            navigate("/createNew")
          }}
        />
      </div>
    </>
  )
}

export default IndexPage
