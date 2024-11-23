<script setup lang="ts">
import PrEditForm from './PrEditForm.vue';
import Button from '@/components/ui/button/Button.vue';
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHead from '@/components/ui/table/TableHead.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { defineProps, ref } from 'vue';




const props = defineProps({
  selectedItems: {
    type: Array as () => { itemId: string; itemName: string; unit: string; quantity: string }[],
    required: true,
  },
});

const Items=ref([...props.selectedItems])
const removeRow = (index: number) => {
  console.log("Items",Items)
  console.log("Index",index)
  if (Items.value.length > 1) {
    Items.value.splice(index, 1);
  }
};


</script>


<template>
  
    <Table class="mt-4">
      <TableHeader class="bg-blue-500">
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Action</TableHead>
          
          
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in selectedItems" :key="index">
          <TableCell>{{ index+1 }}</TableCell>
          <TableCell>{{ item.itemName }}</TableCell>
          <TableCell>{{ item.unit }}</TableCell>
          <TableCell>{{ item.quantity }}</TableCell>
          <TableCell><Button type="button" class="text-red-600 text-[20px]" @click="removeRow(index)">x</Button></TableCell>
          <TableCell>
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
   
    
 
    
</template>



<style lang="scss" scoped>

</style>