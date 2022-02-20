import React, { useRef, useState } from "react"
import Header from "../components/header"
import Lolly from "../components/Lolly"
import { useQuery, useMutation, gql } from "@apollo/client"

const lollyData = gql`
  {
    hello
  }
`

const CREATE_LOLLY_MUTATION = gql`
  mutation createLolly(
    $sender: String!
    $message: String!
    $reciever: String!
    $top: String!
    $middle: String!
    $bottom: String!
  ) {
    createLolly(
      sender: $sender
      message: $message
      reciever: $reciever
      top: $top
      middle: $middle
      bottom: $bottom
    ) {
      lollyPath
    }
  }
`

const CreateNew = () => {
  const [topColor, setTopColor] = useState("#E5E3C9")
  const [middleColor, setMiddleColor] = useState("#B4CFB0")
  const [bottomColor, setBottomColor] = useState("#94B49F")
  const reciever = useRef()
  const message = useRef()
  const sender = useRef()

  // const { error, loading, data } = useQuery(lollyData)
  const [createLolly] = useMutation(CREATE_LOLLY_MUTATION)

  const handleSubmit = async () => {
    console.log("Clicked")
    console.log("rec", reciever.current.value)
    console.log("top", topColor)
    const result = await createLolly({
      variables: {
        sender: sender.current.value,
        message: message.current.value,
        reciever: reciever.current.value,
        top: topColor,
        middle: middleColor,
        bottom: bottomColor,
      },
    })

    console.log("result from server = ", result)
  }
  return (
    <>
      <Header siteTitle="Virtual lolly" />
      {/* {data && data.hello && (
        <div style={{ color: "#000000" }}>{data.hello}</div>
      )} */}
      <div className="container">
        <div className="lolliesForm">
          <div>
            <Lolly top={topColor} middle={middleColor} bottom={bottomColor} />
          </div>
          <div className="lollyFlavour">
            <label className="colorPickerLabel" htmlFor="flavourTop">
              <input
                type="color"
                value={topColor}
                className="colorPicker"
                name="flavourTop"
                id="flavourTop"
                onChange={e => setTopColor(e.target.value)}
              />
            </label>
            <label className="colorPickerLabel" htmlFor="flavourMiddle">
              <input
                type="color"
                value={middleColor}
                className="colorPicker"
                name="flavourMiddle"
                id="flavourMiddle"
                onChange={e => setMiddleColor(e.target.value)}
              />
            </label>
            <label className="colorPickerLabel" htmlFor="flavourBottom">
              <input
                type="color"
                value={bottomColor}
                className="colorPicker"
                name="flavourBottom"
                id="flavourBottom"
                onChange={e => setBottomColor(e.target.value)}
              />
            </label>
          </div>
          <div className="lollyForm">
            <label htmlFor="reciepent">To:</label>
            <input
              type="text"
              name="reciepent"
              ref={reciever}
              id="recpieoent"
            />

            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              ref={message}
              rows="15"
              cols="42"
              id="message"
            />

            <label htmlFor="sender">From:</label>
            <input type="text" name="sender" ref={sender} id="sender" />

            <br />
            <input type="button" value="Create" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateNew
