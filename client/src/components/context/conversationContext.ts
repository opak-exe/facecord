import {Conversation, Message} from '@/components/interfaces'
import { create } from 'zustand'
import {devtools} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'

interface ConversationContext {
  activeConversationId: string | null
  conversation: Conversation | null
  setActiveConversationId: (id: string) => void
  setConversation: (conversation: Conversation) => void
  resetConversationState: () => void
  addMessage: (message: Message) => void
}

const useConversationContext = create<ConversationContext>()(
  devtools(
    immer((set) => ({
      activeConversationId: null,
      conversation: null,
      setActiveConversationId: (id: string) => {
        set(
          (state) => {
            state.activeConversationId = id
          },
          false,
          {type: 'conversation/setActive'}
        )
      },
      setConversation: (conversation: Conversation) => {
        set(
          (state) => {
            state.conversation = conversation
          },
          false,
          {type: 'conversation/setConversation'}
        )
      },
      resetConversationState: () => {
        set((state) => {
          state.conversation = null
          state.activeConversationId = null
        })
      },
      addMessage: (message) => {
        set((state) => {
          state.conversation?.messages.push(message)
        })
      },
    })),
    {name: 'conversationContext'}
  )
)

export default useConversationContext