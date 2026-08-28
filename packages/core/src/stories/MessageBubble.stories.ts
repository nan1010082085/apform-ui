import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import MessageBubble from '../components/Chat/MessageBubble/MessageBubble.vue'
import type { Message } from '../types'

const meta: Meta<typeof MessageBubble> = {
  title: '对话组件/MessageBubble 消息气泡',
  component: MessageBubble,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MessageBubble>

const userMessage: Message = {
  id: '1',
  role: 'user',
  content: '帮我创建一个表单，包含姓名、邮箱、手机号三个字段',
  status: 'COMPLETED',
  createdAt: new Date().toISOString(),
}

const assistantMessage: Message = {
  id: '2',
  role: 'assistant',
  content: '好的，我来帮你创建这个表单。\n\n## 表单字段\n\n| 字段 | 类型 | 必填 |\n|------|------|------|\n| 姓名 | 文本 | 是 |\n| 邮箱 | 邮箱 | 是 |\n| 手机号 | 手机号 | 否 |\n\n```json\n{\n  "fields": [\n    {"name": "姓名", "type": "text", "required": true},\n    {"name": "邮箱", "type": "email", "required": true},\n    {"name": "手机号", "type": "tel", "required": false}\n  ]\n}\n```',
  status: 'COMPLETED',
  createdAt: new Date().toISOString(),
}

const thinkingMessage: Message = {
  id: '3',
  role: 'assistant',
  content: '我需要分析用户的需求，确定表单字段类型和验证规则。',
  thinking: '用户需要一个包含三个字段的表单：\n1. 姓名 - 文本类型，必填\n2. 邮箱 - 邮箱类型，必填，需要邮箱格式验证\n3. 手机号 - 手机号类型，可选，需要手机号格式验证\n\n我将使用 Element Plus 的表单组件来构建这个表单。',
  status: 'COMPLETED',
  createdAt: new Date().toISOString(),
}

const failedMessage: Message = {
  id: '4',
  role: 'assistant',
  content: '',
  status: 'FAILED',
  createdAt: new Date().toISOString(),
}

const waitingMessage: Message = {
  id: '5',
  role: 'assistant',
  content: '请确认以下信息是否正确：',
  status: 'WAITING_INPUT',
  createdAt: new Date().toISOString(),
}

export const UserMessage: Story = {
  args: {
    message: userMessage,
    run: null,
    sending: false,
  },
}

export const AssistantMessage: Story = {
  args: {
    message: assistantMessage,
    run: null,
    sending: false,
  },
}

export const WithThinking: Story = {
  args: {
    message: thinkingMessage,
    run: null,
    sending: false,
  },
}

export const Failed: Story = {
  args: {
    message: failedMessage,
    run: null,
    sending: false,
  },
}

export const WaitingInput: Story = {
  args: {
    message: waitingMessage,
    run: null,
    sending: false,
  },
}
