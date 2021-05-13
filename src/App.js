import React, { useState, useEffect, useRef } from "react"
import { Button, Container, Grid, Input, Message } from "semantic-ui-react"
import { socket } from "./connection"

function App() {
  const [message, setMessage] = useState("")
  const [received, setReceived] = useState([])

  socket.on("message", receiveMessage)

  function sendMessage() {
    if (message) {
      socket.emit("message", message)
      setMessage("")
    }
  }

  function receiveMessage(msg) {
    setReceived([...received, msg])
  }

  return (
    <Container>
      <Grid style={{ height: "100vh" }} columns={1}>
        <Grid.Column
          style={{ overflow: "auto", height: "80%", marginTop: "10px" }}
        >
          {received.length
            ? received.map((msg) => {
                return (
                  <React.Fragment>
                    <Message size="large" compact>
                      {msg}
                    </Message>
                    <br></br>
                  </React.Fragment>
                )
              })
            : null}
        </Grid.Column>
        <Grid.Column verticalAlign="bottom">
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            fluid
            size="big"
            placeholder="Send Message..."
            action={
              <Button
                color="blue"
                onClick={(e) => {
                  sendMessage(e.target.value)
                }}
              >
                Send
              </Button>
            }
          ></Input>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default App
