<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useForm } from 'vee-validate';
import { Plus, Minus, Edit, SlidersHorizontalIcon } from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import { useRouter } from 'vue-router';


type FormData1 = {
  id: string;
  requester: string;
  date: string;
  department: string;
};

const fetchedData = ref<FormData1[]>([]);

const fetchData1 = async () => {
  try {
    const response = await axios.get('http://localhost:3000/fetchrequests');
    console.log('Fetched Request Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const deleteheader = async (id: string) => {
  console.log("object",id)
  try {
    const response = await axios.delete(`http://localhost:3000/deleteheader/${id}`);
    console.log('Header deleted:', response.data);
    
    
    fetchData1();
  } catch (error) {
    console.error('Error deleting unit:', error);
  }
};


onMounted(() => {
  fetchData1();
});


const dialogRef = ref<HTMLDialogElement | null>(null);
const openModal = () => dialogRef.value?.showModal();


const router=useRouter();
// const newRequest=()=>{
//   router.push('/newpequest')
// }

const editRequest=(id:string)=>{
  router.push(`/editrequest/${id}`)
}
</script>

<template>
    <div>
        <Card class="p-8 shadow-md round-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Purshase Request</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        @click="editRequest"
      >
        New Request
      </Button>
    </div>
    <Table>
      <!-- <TableCaption>Request Details</TableCaption> -->
      <TableHeader class="bg-blue-400">
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Requester</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Department</TableHead>
          
                 
          
          <TableHead class="justify-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(data, index) in fetchedData" :key="index">
          <TableCell>{{ index+1 }}</TableCell>
          <TableCell>{{ data.requester }}</TableCell>
          <TableCell>{{ data.date }}</TableCell>
          <TableCell>{{ data.department }}</TableCell>
         
         
          
          <TableCell class="flex gap-2 justify-left">
            <Button
              class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              @click="deleteheader(data.id)"
            >
              <Minus class="size-4" />
            </Button>
            <Button
              class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              @click="editRequest(data.id)"
            >
              <Edit class="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
    </div>



</template>



<style lang="scss" scoped>

</style>