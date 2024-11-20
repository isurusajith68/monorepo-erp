<script setup lang="ts">

import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { defineProps } from 'vue';
defineProps({
  selectedItems: {
    type: Array as () => { itemId: string; itemName: string; unit: string; quantity: string }[],
    required: true,
  },
});
</script>


<template>
   <form>
    <Table class="mt-4">
      <TableHeader class="bg-blue-500">
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Quantity</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in selectedItems" :key="index">
          <TableCell>{{ item.itemId }}</TableCell>
          <TableCell>{{ item.itemName }}</TableCell>
          <TableCell>{{ item.unit }}</TableCell>
          <TableCell>{{ item.quantity }}</TableCell>
          <TableCell>
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Button type="submit" class="w-[100px] bg-green-600 rounded-lg text-white">Save</Button>
  </form>
</template>



<style lang="scss" scoped>

</style>