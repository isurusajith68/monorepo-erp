<script setup lang="ts">
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCaption from '@/components/ui/table/TableCaption.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { ref } from 'vue';
import axios from 'axios';


type FormData={
    unit:string;
    description:string;
}


const fetchedData = ref<FormData[]>([]);


const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/units');
    console.log('Fetched Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
   
  }
};
</script>




<template>
  <!-- <div>
    <Card class="relative p-6">
        <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Item List</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
         @click="openModal"
      >
        Add Item
      </Button>
    </div> -->
  <Table>
    <TableCaption>Unit Details</TableCaption>
    <TableHeader>
      <TableRow>
        <!-- <TableHead>#</TableHead> -->
        <TableHead>Unit Id</TableHead>
        <TableHead >Description</TableHead>
        <!-- <TableHead>Default Unit</TableHead>
        <TableHead>Description</TableHead> -->
        <!-- <TableHead class="center">Action</TableHead> -->
      </TableRow>
    </TableHeader>
    <TableBody>
     <TableRow>
        <TableCell></TableCell>
     </TableRow>
    </TableBody>
  </Table>
    

</template>
