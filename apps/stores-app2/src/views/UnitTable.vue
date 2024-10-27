<script setup lang="ts">
import Table from '@/components/ui/table/Table.vue';
import TableBody from '@/components/ui/table/TableBody.vue';
import TableCaption from '@/components/ui/table/TableCaption.vue';
import TableCell from '@/components/ui/table/TableCell.vue';
import TableHeader from '@/components/ui/table/TableHeader.vue';
import TableRow from '@/components/ui/table/TableRow.vue';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import TableHead from '@/components/ui/table/TableHead.vue';
import Card from '@/components/ui/card/Card.vue';
 
 import { Plus,Minus,Edit } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'
import { useForm } from 'vee-validate';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue';

type FormData={
    unit:string;
    description:string;
}

const formSchema = toTypedSchema(z.object({
    unit: z.string(),
    description: z.string().min(2),
   
}))

const form = useForm({
  validationSchema: formSchema,
})

const fetchedData = ref<FormData[]>([]);

const submittedData=ref<FormData[]>([]);





//fetch data
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/units');
    console.log('Unit Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
   
  }
};



//delete funtion 
const deleteUnit = async (unit: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/deleteunit/${unit}`);
    console.log('Unit deleted:', response.data);
    
    
    fetchData();
  } catch (error) {
    console.error('Error deleting unit:', error);
  }
};




onMounted(() => {
  fetchData();
  
});


//insert function
const onSubmit=form.handleSubmit(async(values)=>{
    console.log("Unit Data",values);

    const response = await axios.post('http://localhost:3000/addunit', values);
    console.log('Response:', response.data);

   
    submittedData.value.push(values);

    fetchData();
    closeModal();
})


//open and close submit form
const dialogRef = ref<HTMLDialogElement | null>(null);
const openModal = () => dialogRef.value?.showModal();
const closeModal = () => dialogRef.value?.close();




const selectedData = ref<FormData>({ unit: '', description: '' });

const editModalRef = ref<HTMLDialogElement | null>(null);

const openEditModal = (data: FormData) => {
  selectedData.value = { ...data };
  console.log("Selected data",data)
  form.setValues({
    unit: data.unit,
    description: data.description
  });
  editModalRef.value?.showModal();
};

// Add watcher for selectedData
// watch(selectedData, (newValue) => {
//   console.log('selectedData changed:', newValue);
// }, { deep: true });



// const onEditSubmit = async () => {
//   try {
//     console.log('Submitting edited data:', selectedData.value);
//     const response = await axios.put(
//       `http://localhost:3000/editunit/${selectedData}`, 
//       selectedData.value
//     );
//     console.log('Update response:', response.data);
//     fetchData();
//     closeEditModal();
//   } catch (error) {
//     console.error('Error updating unit:', error);
//   }
// };

const onEditSubmit = async () => {
  try {
    console.log('Submitting edited data:', selectedData.value);

    const response = await axios.put(
      `http://localhost:3000/editunit/${selectedData.value.unit}`,
      { description: selectedData.value.description }
    );

    console.log('Update response:', response.data);
    fetchData();
    closeEditModal();
  } catch (error) {
    console.error('Error updating unit:', error);
  }
};


const closeEditModal = () => editModalRef.value?.close();

</script>




<template>

        
<Card class="w-[1000px]  p-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Item List</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
           @click="openModal"
      > 
      <!-- <plus class="bg-black round-full"/> -->
        Add Unit
      </Button>
    </div>
  <Table class="w-[1000px]">
    <TableCaption>Unit Details</TableCaption>
    <TableHeader class="bg-blue-400">
      <TableRow >
        <TableHead>Unit Id</TableHead>
        <TableHead>Name</TableHead>
        <TableHead >Description</TableHead>
        <TableHead class="justify-center" >Action</TableHead>
        <!-- <TableHead>Default Unit</TableHead>
        <TableHead>Description</TableHead> -->
        <!-- <TableHead class="center">Action</TableHead> -->
      </TableRow>
    </TableHeader>
    <TableBody>
     <TableRow v-for="(data,index) in fetchedData" :key="index">
        <TableCell>{{ index+1}}</TableCell>
        <TableCell>{{ data.unit }}</TableCell>
        <TableCell>{{ data.description }}</TableCell>
        <TableCell class="flex gap-2 justify-left">
            
           
            <Button
              class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              @click="deleteUnit(data.unit)"
            >
              <Minus class="size-4" />
            </button>
            <Button
              class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            @click="openEditModal(data)"
            >
              <Edit class="size-4" />
            </button>
          </TableCell>
        
     </TableRow>
    </TableBody>
  </Table>
  </Card>
    
  <!-- submit form -->
  <dialog ref="dialogRef" class="modal bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onSubmit">
      <h3 class="text-lg font-bold mb-4">Add New Unit</h3>

      <FormField v-slot="{ componentField }" name="unit">
        <FormItem>
          <FormLabel>Unit</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="Unit"
              v-bind="componentField"
              
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="Description"
              v-bind="componentField"
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField>

      
      <!-- <FormField v-slot="{ componentField }" name="type">
  <FormItem>
    <FormLabel>Type</FormLabel>
    <FormControl>
      <Select v-bind="componentField"   @update:modelValue="(value) => form.setFieldValue('type', value)">
        <SelectTrigger>
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Type</SelectLabel>
            <option value="inventory">Inventory</option>
           <option value="consumable">Consumable</option>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormControl>
  </FormItem>
</FormField> -->

<!-- <FormField v-slot="{ componentField }" name="categoryid">
  <FormItem>
    <FormLabel>Category</FormLabel>
    <FormControl class="w-full">
      <Select
        v-bind="componentField"
        @update:modelValue="(value) => form.setFieldValue('categoryid', value)"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem
              v-for="cat in category"
              :key="cat.id"
              :value="cat.id" 
            >
              {{ cat.category }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormControl>
  </FormItem>
</FormField> -->



<!-- <FormField  name="categoryname">
  <FormItem>
    <FormLabel>Category</FormLabel>
    <FormControl class="w-full">
      <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Categories</SelectLabel>
        <SelectItem value="a">
          Grocery
        </SelectItem>
        <SelectItem value="b">
          Furniture
        </SelectItem>
        <SelectItem value="c">
          Electronics
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
      
    </FormControl>
  </FormItem>
</FormField> -->

  

      <!-- <FormField v-slot="{ componentField }" name="categoryid">
        <FormItem>
          <FormLabel>CategoryId</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="CategoryId"
              v-bind="componentField"
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField> -->

<!-- 
      <FormField name="categoryid" v-slot="{ field }">
  <FormItem>
    <FormLabel>Category</FormLabel>
    <FormControl class="w-full">
      <Select
        v-model="form.values.categoryid"
        :value="form.values.categoryid"
        @update:modelValue="(value) => field.onChange(value)"
      >
        <SelectTrigger>
          <SelectValue :placeholder="'Select a category'" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem
              v-for="cat in category"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.category }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormControl>
  </FormItem>
</FormField> -->



      <!-- <FormField v-slot="{ componentField }" name="defaultunit">
        <FormItem>
          <FormLabel>Default Unit</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="Default Unit"
              v-bind="componentField"
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField> -->

      <!-- <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl class="w-full">
            <Textarea
              placeholder="Description"
              v-bind="componentField"
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField> -->

      <div class="flex justify-end gap-4 mt-6">
        <Button  type="button" class="bg-red-600 text-white" @click="closeModal">
          Cancel
        </Button>
        <Button type="submit" class="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </form>
  </dialog>


  <!-- edit form -->
  <dialog ref="editModalRef" class="modal bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onEditSubmit">
      <h3 class="text-lg font-bold mb-4">Edit Unit</h3>
  <h3>{{ selectedData.unit }}</h3>
      <FormField name="unit">
        <FormItem>
          <FormLabel>Unit</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              v-model="selectedData.unit"
              class="border border-gray-300 rounded-md px-3 py-2"
              :disabled="true"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <FormField name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              v-model="selectedData.description"
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex justify-end gap-4 mt-6">
        <Button type="button" class="bg-red-600 text-white" @click="closeEditModal">
          Cancel
        </Button>
        <Button type="submit" class="bg-blue-600 text-white">
          Save
        </Button>
      </div>
    </form>
  </dialog>
  




</template>
