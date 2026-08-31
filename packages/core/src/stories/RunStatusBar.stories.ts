import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunStatusBar from '../components/Chat/RunStatusBar/RunStatusBar.vue'
import type { RunStatusView } from '../types'

const meta: Meta<typeof RunStatusBar> = {
  title: '对话组件/RunStatusBar 运行状态',
  component: RunStatusBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RunStatusBar>

const runningRun: RunStatusView = {
  runId: 'run-1',
  sessionId: 'session-1',
  agentId: 'agent-1',
  runtimeExecutionId: 'exec-1',
  status: 'RUNNING',
  errorMessage: null,
  waiting: null,
  startedAt: new Date(Date.now() - 30000).toISOString(),
  finishedAt: null,
}

const completedRun: RunStatusView = {
  ...runningRun,
  status: 'COMPLETED',
  finishedAt: new Date().toISOString(),
}

const failedRun: RunStatusView = {
  ...runningRun,
  status: 'FAILED',
  errorMessage: '处理超时，请重试',
  finishedAt: new Date().toISOString(),
}

export const Running: Story = {
  args: {
    run: runningRun,
    sending: false,
  },
}

export const Completed: Story = {
  args: {
    run: completedRun,
    sending: false,
  },
}

export const Failed: Story = {
  args: {
    run: failedRun,
    sending: false,
  },
}