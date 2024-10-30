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
import VueSelect from 'vue3-select-component';

type FormData={
    // unit:string;
    id:string;
    category:string;
    description:string;
    itemtype:string;
  
}

// type editForm={
//     // unit:string;
//     id:string;
//     category:string;
//     description:string;
//     itemtype:string;
  
// }

type FormData1={
     //unit:string;
    // id:string;
    category?:string;
    description?:string;
    itemtype?:string;
  
}
const formSchema = toTypedSchema(z.object({
     //unit: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    itemtype: z.string().optional(),
   
}))

const form = useForm({
  validationSchema: formSchema,
})

const fetchedData = ref<FormData[]>([]);

const submittedData=ref<FormData1[]>([]);





//fetch data
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/allcategories');
    console.log('Category Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
   
  }
};



//delete funtion 
// const deleteUnit = async (unit: string) => {
//   try {
//     const response = await axios.delete(`http://localhost:3000/deleteunit/${unit}`);
//     console.log('Unit deleted:', response.data);
    
    
//     fetchData();
//   } catch (error) {
//     console.error('Error deleting unit:', error);
//   }
// };




onMounted(() => {
  fetchData();
  
});


//insert function
// const onSubmit=form.handleSubmit(async(values)=>{
//     console.log("Unit Data",values);

//     const response = await axios.post('http://localhost:3000/addunit', values);
//     console.log('Response:', response.data);

   
//     submittedData.value.push(values);

//     fetchData();
//     closeModal();
// })


//open and close submit form
const dialogRef = ref<HTMLDialogElement | null>(null);
const openModal = () => dialogRef.value?.showModal();
const closeModal = () => dialogRef.value?.close();




// const selectedData = ref<FormData>({ unit: '', description: '' });



// const openEditModal = (data: FormData) => {
//   selectedData.value = { ...data };
//   console.log("Selected data",data)
//   form.setValues({
//     unit: data.unit,
//     description: data.description
//   });
//   editModalRef.value?.showModal();
// };

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

// const onEditSubmit = async () => {
//   try {
//     console.log('Submitting edited data:', selectedData.value);

//     const response = await axios.put(
//       `http://localhost:3000/editunit/${selectedData.value.unit}`,
//       { description: selectedData.value.description }
//     );

//     console.log('Update response:', response.data);
//     fetchData();
//     closeEditModal();
//   } catch (error) {
//     console.error('Error updating unit:', error);
//   }
// };


const onSubmit = form.handleSubmit(async(values) => {
   
  

  try {
    console.log('Form Submitted with values:', values);

    
     const response = await axios.post('http://localhost:3000/addcategory', values);
    console.log('Response:', response.data);

    submittedData.value.push(values);
     fetchData(); 
    closeModal(); 
  } catch (error) {
   
    console.error('Error submitting form:', error);
  }
});




const selected=ref("");


watch(submittedData,(n)=>{
    console.log("submitted data",n);
})



//delete funtion 
const deleteCategory = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/deletecategory/${id}`);
    console.log('Unit deleted:', response.data);
    
    
    fetchData();
  } catch (error) {
    console.error('Error deleting unit:', error);
  }
};


const selectedData = ref<FormData>({ id:'',category: '', description: '',itemtype:'' });

const editModalRef = ref<HTMLDialogElement | null>(null);

const openEditModal = (data: FormData) => {
  selectedData.value = { ...data };
  console.log("Selected data",data)
  form.setValues({
    // id: data.id,
    category: data.category,
    description:data.description,
    itemtype:data.itemtype
  });
  editModalRef.value?.showModal();
};


const closeEditModal = () => editModalRef.value?.close();




const onEditSubmit = async () => {
  try {
    console.log('Submitting edited data:', selectedData.value);

    const response = await axios.put(
      `http://localhost:3000/editcategory/${selectedData.value.id}`,
      { category: selectedData.value.category, description:selectedData.value.description,itemtype:selectedData.value.itemtype}
    );

    console.log('Update response:', response.data);
    fetchData();
    closeEditModal();
  } catch (error) {
    console.error('Error updating unit:', error);
  }
};

</script>




<template>

        
<Card class="w-[1000px]  p-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Category List</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
           @click="openModal"
      > 
      <!-- <plus class="bg-black round-full"/> -->
       Add Category
      </Button>
    </div>
  <Table class="w-[1000px]">
    <TableCaption>Category Details</TableCaption>
    <TableHeader class="bg-blue-400">
      <TableRow >
        <TableHead>Category ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead >Description</TableHead>
        <TableHead >Item Type</TableHead>
       
        <TableHead class="justify-center" >Action</TableHead>
        <!-- <TableHead>Default Unit</TableHead>
        <TableHead>Description</TableHead> -->
        <!-- <TableHead class="center">Action</TableHead> -->
      </TableRow>
    </TableHeader>
    <TableBody>
     <TableRow v-for="(data,index) in fetchedData" :key="index">
        <TableCell>{{ data.id}}</TableCell>
        <TableCell>{{ data.category }}</TableCell>
        <TableCell>{{ data.description }}</TableCell>
        <TableCell>{{ data.itemtype }}</TableCell>
        <TableCell class="flex gap-2 justify-left">
            
           
            <Button
              class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
             @click="deleteCategory(data.id)"
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
  <dialog ref="dialogRef" class=" bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onSubmit">
      <h3 class="text-lg font-bold mb-4">Add New Category</h3>

      <FormField v-slot="{ componentField }" name="category">
        <FormItem>
          <FormLabel>Category
        </FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="Category"
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


      
      <FormField v-slot="{ componentField }" name="itemtype">
        <FormItem>
          <FormLabel>Itemtype
        </FormLabel>
          <FormControl class="w-full">
            <VueSelect
            v-bind="componentField"
            v-model="selected"
            :options="[
            { label: 'Inventory', value: 'inventory' },
            { label: 'Consumable', value: 'consumable' },
            
            ]"
                placeholder="Select Type"
            />
          </FormControl>
        </FormItem>
      </FormField>

      
     


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



  <!-- edit form  -->
  <dialog ref="editModalRef" class=" bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onEditSubmit">
      <h3 class="text-lg font-bold mb-4">Add New Category</h3>

      <FormField  name="category">
        <FormItem>
          <FormLabel>Category
        </FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="Category"
              v-model="selectedData.category"
              
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField>


      <FormField  name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl class="w-full">
            <Input
              type="text"
              placeholder="Description"
              v-model="selectedData.description"
              class="border border-gray-300 rounded-md px-3 py-2"
            />
          </FormControl>
        </FormItem>
      </FormField>


      
      <FormField name="itemtype">
        <FormItem>
          <FormLabel>Itemtype
        </FormLabel>
          <FormControl class="w-full">
            <VueSelect
             
            v-model="selectedData.itemtype"
            :options="[
            { label: 'Inventory', value: 'inventory' },
            { label: 'Consumable', value: 'consumable' },
            
            ]"
                placeholder="Select Type"
            />
          </FormControl>
        </FormItem>
      </FormField>

      
     


      <div class="flex justify-end gap-4 mt-6">
        <Button  type="button" class="bg-red-600 text-white" @click="closeEditModal">
          Cancel
        </Button>
        <Button type="submit" class="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </form>
  </dialog>

  <!-- edit form -->
  <!-- <dialog ref="editModalRef" class="modal bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onEditSubmit">
      <h3 class="text-lg font-bold mb-4">Edit Unit</h3>
  
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
  </dialog> -->
  




</template>
