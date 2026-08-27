<script setup lang="ts">
/**
 * ApiTable — API 文档表格
 *
 * 用法：
 *   <ApiTable :data="props" />
 */
defineProps<{
  /** 表格数据 */
  data: Array<Record<string, string>>
  /** 表格标题 */
  title?: string
}>()
</script>

<template>
  <div class="api-table">
    <h4 v-if="title" class="api-table-title">{{ title }}</h4>
    <table>
      <thead>
        <tr>
          <th>属性</th>
          <th>类型</th>
          <th>默认值</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td><code>{{ row.name }}</code></td>
          <td><code>{{ row.type }}</code></td>
          <td>{{ row.default || '—' }}</td>
          <td>{{ row.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.api-table {
  margin: 16px 0;
}

.api-table-title {
  margin: 0 0 12px;
  font-size: 15px;
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
  text-align: left;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
}

td {
  padding: 10px 16px;
  border: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

code {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.9em;
}
</style>
