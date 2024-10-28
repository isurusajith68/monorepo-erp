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
import Card from '@/components/ui/card/Card.vue';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import '../assets/style.css'
import { Form,  } from 'vee-validate';


import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
//import { Input } from '@/components/ui/input'
//import { useToast } from '@/components/ui/toast'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
// import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
//import Textarea from '@/components/ui/textarea/Textarea.vue'

import { useRouter } from 'vue-router'
import Select from '@/components/ui/select/Select.vue';
import SelectTrigger from '@/components/ui/select/SelectTrigger.vue';
import SelectValue from '@/components/ui/select/SelectValue.vue';
import SelectContent from '@/components/ui/select/SelectContent.vue';
import SelectGroup from '@/components/ui/select/SelectGroup.vue';
import SelectLabel from '@/components/ui/select/SelectLabel.vue';
import SelectItem from '@/components/ui/select/SelectItem.vue';
import DialogContent from '@/components/ui/dialog/Dialog.vue';
import DialogDescription from '@/components/ui/dialog/Dialog.vue';
import DialogFooter from '@/components/ui/dialog/Dialog.vue';
import DialogTitle from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/Dialog.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';


import VueSelect from "vue3-select-component";

// Ensure you have this or relevant CSS import
// DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,

//import axios from 'axios'

const router = useRouter();
// type FormData1 = {
//   id: number;
//   name: string;
//   categoryid: string;
//   defaultunit: string;
//   description: string;
// };

type FormData = {
  id: string;
  name: string;
  // type:string;
  categoryid: string;
  defaultunit: string;
  description: string;
  selected: string;
};

type Category={
  id: string;
  category:string;
}

const formSchema = toTypedSchema(z.object({
   id: z.string(),
   name: z.string().min(2),
   //type:z.string(),
   categoryid:z.string(),
   defaultunit:z.string(),
   description:z.string(),
   selected:z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})



// Store fetched data




const fetchedData = ref<FormData[]>([]);
// const useToastInstance = useToast();

// const submittedData = ref(<FormData[]>[])

const category = ref<Category[]>([])

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/items');
    console.log('Fetched Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
   
  }
};


//fetch category data 
const categorydata=async()=>{
  try {
  const response = await axios.get('http://localhost:3000/categoryid');
  console.log('Fetched Category Data:', response.data);
    fetchedData.value = response.data;
  }
  catch(error){
    console.error('Error fetching data:', error);
  }
}

onMounted(() => {
  fetchData();
  categorydata()
});



// const onSubmit = form.handleSubmit((values) => {
 
//     console.log('Form submitted!', values);

//     submittedData.value.push(values)
   

// })



//submit the form data
const onSubmit = form.handleSubmit(async(values) => {
  console.log("Form submitted!", values);

  // const response = await axios.post('http://localhost:3000/additem', values);
  //   console.log('Response:', response.data);

   
  //   submittedData.value.push(values);
    closeModal();
    fetchData();
//   submittedData.value.push(values);
}, (errors) => {
  console.error("Validation errors:", errors);
});



const dialogRef = ref<HTMLDialogElement | null>(null);
const openModal = () => dialogRef.value?.showModal();
const closeModal = () => dialogRef.value?.close();




// const itemName = ref('');
// const itemType = ref('');
// const itemCategory = ref('');
// const unit = ref('');
// const description = ref('');
const selected = ref("");
</script>

<template class="bg-gray-600">
      <Card class="relative p-6">
        <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Item List</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
         @click="openModal"
      >
        Add Item
      </Button>
    </div>
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
        <!-- <TableCell>{{ index + 1 }}</TableCell> -->

        <!-- <TableCell>
          <Input
            v-model="data.reqid"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </TableCell> -->

        <!-- <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {{ data.id }}
        </TableCell> -->

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
            <div class="flex gap-5 mt-4">
                <Button
            @click="fetchedData.splice(index, 1)"
            class="mt-4 bg-red-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-yellow-700 transition duration-200"
          >
            Delete
          </Button>
          
          <Button
        
            class="mt-4 bg-green-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-yellow-700 transition duration-200 "
          >
            Edit
          </Button>
            </div>
          
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
      </Card>


<!-- submit form -->
<dialog ref="dialogRef" class="modal bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onSubmit">
     

      <FormField v-slot="{ componentField }" name="id">
        <FormItem>
          <FormLabel>Id</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" placeholder="Id" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" placeholder="Name" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="categoryid">
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl class="w-full">
            <VueSelect
            v-bind="componentField"
             v-model="selected"
              :options="category.map(cat => ({ label: cat.category, value: cat.id }))"
              placeholder="Select a category"
           />
          </FormControl>
        </FormItem>
      </FormField>
    
      <FormField v-slot="{ componentField }" name="defaultunit">
        <FormItem>
          <FormLabel>Default Unit</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" placeholder="Default Unit" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl class="w-full">
            <Textarea v-bind="componentField" placeholder="Description" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex justify-end gap-4 mt-6">
        <Button type="button" class="bg-red-600 text-white" @click="closeModal">
          Cancel
        </Button>
        <Button type="submit" class="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </form>
  </dialog>



<!-- edit form -->
 
</template>

<style scoped>
   /* .button-gapt{
     
   } */
</style>
