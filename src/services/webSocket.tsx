import { useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Client, IMessage } from '@stomp/stompjs'

type UseWebSocketProps = {
  token: string
  onMessage: (data: string) => void
}

const useWebSocket = ({ token, onMessage }: UseWebSocketProps) => {
  const stompClient = useRef<Client | null>(null)

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      reconnectDelay: 5000,
      debug: (str: string) => console.log('[WebSocket] ' + str),
      onConnect: () => {
        console.log('[WebSocket] Conectado')

        client.subscribe('/topic/new-order', (message: IMessage) => {
          try {
            const payload = message.body
            onMessage(payload)
          } catch (error) {
            console.error('Erro ao processar mensagem:', error)
          }
        })
      },
      onStompError: (frame) => {
        console.error('[WebSocket] STOMP Erro:', frame)
      }
    })

    client.activate()
    stompClient.current = client

    return () => {
      console.log('[WebSocket] Desconectando...')
      client.deactivate()
    }
  }, [token])
}

export default useWebSocket
