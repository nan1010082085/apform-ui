<script setup lang="ts">
import { PageShell, PageHeader, ContentPanel, CardTable } from '@apform-ui/core'
</script>

<template>
  <PageShell>
    <PageHeader title="apform-ui minimal" subtitle="StackBlitz / 本地试玩模板" />
    <ContentPanel title="Hello">
      <CardTable padding="16px">
        <p style="margin: 0">装上 `@apform-ui/core` + `element-plus@2.14.2` 即可跑通布局三件套。</p>
      </CardTable>
    </ContentPanel>
  </PageShell>
</template>
