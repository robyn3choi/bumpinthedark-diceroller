import { io } from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, { autoConnect: false })

export default socket
