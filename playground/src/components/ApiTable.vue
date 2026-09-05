/**
 * Props / Events / Slots 表格 — 对齐 Element Plus API 表
 */
<script setup lang="ts">
import type { EmitDoc, PropDoc, SlotDoc } from '@apform-ui/core/docs'

defineProps<{
  title: string
  kind: 'props' | 'emits' | 'slots'
  rows: PropDoc[] | EmitDoc[] | SlotDoc[]
}>()
</script>

<template>
  <section v-if="rows.length" class="api-section">
    <h3 class="api-title">{{ title }}</h3>
    <div class="api-table-wrap">
      <table v-if="kind === 'props'" class="api-table">
        <thead>
          <tr>
            <th>属性名</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in (rows as PropDoc[])" :key="row.name">
            <td>
              <code>{{ row.name }}</code>
              <span v-if="row.required" class="req">必填</span>
            </td>
            <td>{{ row.description }}</td>
            <td><code>{{ row.type }}</code></td>
            <td><code v-if="row.default">{{ row.default }}</code><span v-else>—</span></td>
          </tr>
        </tbody>
      </table>

      <table v-else-if="kind === 'emits'" class="api-table">
        <thead>
          <tr>
            <th>事件名</th>
            <th>说明</th>
            <th>类型</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in (rows as EmitDoc[])" :key="row.name">
            <td><code>{{ row.name }}</code></td>
            <td>{{ row.description }}</td>
            <td><code v-if="row.payload">{{ row.payload }}</code><span v-else>—</span></td>
          </tr>
        </tbody>
      </table>

      <table v-else class="api-table">
        <thead>
          <tr>
            <th>插槽名</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in (rows as SlotDoc[])" :key="row.name">
            <td><code>{{ row.name }}</code></td>
            <td>{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.api-section {
  margin-top: 20px;
}

.api-title {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: var(--docs-text, #303133);
}

.api-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--docs-border, #e4e7ed);
  border-radius: 4px;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.api-table th,
.api-table td {
  padding: 11px 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  vertical-align: top;
}

.api-table th {
  background: #f5f7fa;
  color: #606266;
  font-weight: 600;
  white-space: nowrap;
}

.api-table tr:last-child td {
  border-bottom: none;
}

.api-table code {
  font-family: var(--docs-mono, monospace);
  font-size: 12px;
  color: var(--docs-primary, #0060a2);
  background: #f0f5ff;
  padding: 1px 6px;
  border-radius: 3px;
}

.req {
  margin-left: 6px;
  font-size: 11px;
  color: #f56c6c;
  font-weight: 600;
}
</style>
