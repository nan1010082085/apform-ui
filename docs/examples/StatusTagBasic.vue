<script setup>
import { StatusTag } from '@schema-ui/core'
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <StatusTag status="pending" />
    <StatusTag status="approved" />
    <StatusTag status="rejected" />
    <StatusTag status="running" />
    <StatusTag status="completed" />
    <StatusTag status="failed" />
    <StatusTag status="draft" />
    <StatusTag status="published" />
  </div>
</template>
