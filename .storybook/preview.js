/** @type { import('@storybook/vue3').Preview } */
import '../packages/core/src/tokens/tokens.css'
import '../packages/core/src/tokens/design-tokens.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
  },
}

export default preview
