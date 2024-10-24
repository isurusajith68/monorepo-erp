<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { toast, useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// Store fetched data


type FormData = {
  id: number;
  name: string;
  categoryid: Date;
  defaultunit: string;
  description: string;
};

const fetchedData = ref<FormData[]>([]);
// const useToastInstance = useToast();


const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/items');
    console.log('Fetched Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
   
  }
};


onMounted(() => {
  fetchData();
});
</script>

<template>
  <Table>
    <TableCaption>Details</TableCaption>
    <TableHeader>
      <TableRow>
        <!-- <TableHead>#</TableHead> -->
        <TableHead>Name</TableHead>
        <TableHead>CategoryId</TableHead>
        <TableHead>Default Unit</TableHead>
        <TableHead>Description</TableHead>
        <TableHead class="center">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(data, index) in fetchedData" :key="index">
        <TableCell>{{ index + 1 }}</TableCell>

        <!-- <TableCell>
          <Input
            v-model="data.reqid"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TableCell> -->

        <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ data.id }}
        </TableCell>

        <!-- <TableCell>
          <Input
            v-model="data.buyer"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TableCell> -->

        <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ data.name }}
        </TableCell>

        <!-- <TableCell>
          <Input
            type="text"
            v-model="data.date"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TableCell> -->

        <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
         {{ data.categoryid }}
        </TableCell>

        <!-- <TableCell>
          <Textarea
            v-model="data.remark"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TableCell> -->

        <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
         {{ data.defaultunit }}
        </TableCell>

        <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
         {{ data.description }}
        </TableCell>

        <TableCell>
          <Button
            @click="fetchedData.splice(index, 1)"
            class="mt-4 bg-red-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-yellow-700 transition duration-200"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

<style scoped>
/* Optional: Add your styles here */
</style>
