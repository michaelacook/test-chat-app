import io from "socket.io-client"

export const socket = io("https://test-chap-app.herokuapp.com/", {
  withCredentials: true,
})
