import React, { useState } from "react"
import {
  Button,
  Container,
  Grid,
  Input,
  Segment,
  Message,
} from "semantic-ui-react"
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
      <Segment
        style={{
          marginTop: "10px",
          height: "98vh",
        }}
      >
        <Grid style={{ height: "100%" }} columns={1}>
          <Grid.Column style={{ overflow: "auto" }}>
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
                <Button color="blue" onClick={sendMessage}>
                  Send
                </Button>
              }
            ></Input>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  )
}

export default App
