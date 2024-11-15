<script setup lang="ts">
import Header from '@/components/Header.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { defineProps, toRefs } from 'vue';

// Access props inside setup
const props = defineProps({
  itemId: String,
  itemName: String,
  quantity: String,
  unit:String
});


const { itemId, itemName, quantity,unit } = toRefs(props);



</script>

<template>
 <Table class="mt-4">
        <TableHeader class="bg-blue-500">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Quentity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
             <TableCell>{{ itemId }}</TableCell>
             <TableCell>{{ itemName }}</TableCell>
             <TableCell>{{ unit }}</TableCell>
             <TableCell>{{ quantity }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
</template>