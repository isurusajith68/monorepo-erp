<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
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

 import { Plus,Minus,Edit } from 'lucide-vue-next'

// Ensure you have this or relevant CSS import
// DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,

//import axios from 'axios'

const router = useRouter();
type FormData1 = {
  id: string;
  name: string;
  // type:string;
  categoryid: string;
  defaultunit: string;
  description: string;
  selected: string;
  itemtype:string;
};

type FormData = {
   id: string;
  name?: string;
  // type:string;
  categoryid?: string;
  defaultunit?: string;
  description?: string;
  selected?: string;
  itemtype?:string;
};

type CategoryOption={
  value: string;
  label:string;
}

type UnitOptions={
  value: string;
  label:string;
}

const formSchema = toTypedSchema(z.object({
  //  id: z.string(),
   name: z.string().min(2).optional(),
   //type:z.string(),
   categoryid:z.number().optional(),
   defaultunit:z.string().optional(),
   description:z.string().optional(),
   itemtype:z.string().optional(),
   //  selected:z.string(),
}))

const form = useForm({
  validationSchema: formSchema,
})



// Store fetched data




const fetchedData = ref<FormData1[]>([]);
// const useToastInstance = useToast();

const submittedData = ref(<FormData1[]>[])

const categoryOptions = ref<CategoryOption[]>([])

const unitOptions=ref<UnitOptions[]>([])

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
const fetchCategorydata=async()=>{
  try {
  const response = await axios.get('http://localhost:3000/categoryid');
  console.log('Fetched Category Data:', response.data);
    fetchedData.value = response.data;
    categoryOptions.value=response.data.map((item)=>({value:item.id,label:item.category}))
  }
  catch(error){
    console.error('Error fetching data:', error);
  }
}

watch(categoryOptions ,( newq ) => {
 console.log('Category Options:', newq)
})

const fetchunitdata=async()=>{
  try {
  const response = await axios.get('http://localhost:3000/unitoptions');
  console.log('Fetched Unit Data Options:', response.data);
    fetchedData.value = response.data;
   unitOptions.value=response.data.map((item)=>({value:item.unit,label:item.unit}))
  }
  catch(error){
    console.error('Error fetching data:', error);
  }
}




onMounted(() => {
  fetchData();
  fetchCategorydata();
  fetchunitdata();
});



// const onSubmit = form.handleSubmit((values) => {
 
//     console.log('Form submitted!', values);

//     submittedData.value.push(values)
   

// })



//submit the form data
const onSubmit = form.handleSubmit(async(values) => {
  console.log("Form submitted!", values);

  const response = await axios.post('http://localhost:3000/additem', values);
    console.log('Response:', response.data);

   
    submittedData.value.push(values);
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
const selectedunits=ref("");


//delete Item
const deleteUnit = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/deleteitem/${id}`);
    console.log('Unit deleted:', response.data);
    
    
    fetchData();
  } catch (error) {
    console.error('Error deleting unit:', error);
  }
};




const selectedData = ref<FormData>({id:'', name: '', categoryid:'' ,defaultunit:'',description:'',itemtype:''});

const editModalRef = ref<HTMLDialogElement | null>(null);

const openEditModal = (data: FormData1) => {
  selectedData.value = { ...data };
  console.log("Selected data",data)
  form.setValues({
    id: data.id,
    name: data.name,
    categoryid: data.categoryid,
    defaultunit: data.defaultunit,
    description: data.description,
    itemtype:data.itemtype
  });
  editModalRef.value?.showModal();
};


const onEditSubmit = async () => {
  try {
    console.log('Submitting edited data:', selectedData.value);

    const response = await axios.put(
      `http://localhost:3000/edititem/${selectedData.value.id}`,
      { name: selectedData.value.name,
        categoryid: selectedData.value.categoryid,
        defaultunit: selectedData.value.defaultunit,
        description: selectedData.value.description,
        itemtype: selectedData.value.itemtype,
      
      }
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

<template class="bg-gray-600">
      <Card class="p-8 shadow-lg">
        <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Items</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
         @click="openModal"
      >
        Add Item
      </Button>
    </div>
  <Table>
    <!-- <TableCaption>Details</TableCaption> -->
    <TableHeader class="bg-blue-400">
      <TableRow>
        <!-- <TableHead>#</TableHead> -->
        <TableHead>Name</TableHead>
        <TableHead>CategoryId</TableHead>
        <TableHead>Default Unit</TableHead>
        <TableHead>Item Type</TableHead>
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
         {{ data.itemtype }}
        </TableCell>

        <TableCell  class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
         {{ data.description }}
        </TableCell>

        <TableCell>
            <div class="flex gap-5 mt-4">
                <Button
            @click="deleteUnit(data.id)"
            class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            <Minus class="size-4"/>
          </Button>
          
          <Button
            @click="openEditModal(data)"
            class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            <Edit class="size-4"/>
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
      
     <h1>Add New Item</h1>
<!-- 
      <FormField v-slot="{ componentField }" name="id">
        <FormItem>
          <FormLabel>Id</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" placeholder="Id" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField> -->

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" type="text" placeholder="Name" class="border px-3 py-2 rounded-md" />
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
              :options="categoryOptions"
              placeholder="Select a category"
           />
          </FormControl>
        </FormItem>
      </FormField>


      <FormField v-slot="{ componentField }" name="defaultunit">
        <FormItem>
          <FormLabel>Default Unit</FormLabel>
          <FormControl class="w-full">
            <VueSelect
            v-bind="componentField"
             v-model="selectedunits"
              :options="unitOptions"
              placeholder="Default Unit"
           />
          </FormControl>
        </FormItem>
      </FormField>


      <FormField v-slot="{ componentField }"  name="itemtype">
        <FormItem>
          <FormLabel>Item Type
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
<dialog ref="editModalRef" class="modal bg-white rounded-md p-6 w-[450px]">
    <form @submit.prevent="onEditSubmit">
      
     <h1>Add New Item</h1>
<!-- 
      <FormField v-slot="{ componentField }" name="id">
        <FormItem>
          <FormLabel>Id</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" placeholder="Id" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField> -->

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl class="w-full">
            <Input v-bind="componentField" type="text" placeholder="Name" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField>


      <FormField  name="categoryid">
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl class="w-full">
            <VueSelect
           
             v-model="selectedData.categoryid"
              :options="categoryOptions"
              placeholder="Select a category"
           />
          </FormControl>
        </FormItem>
      </FormField>


      <FormField  name="defaultunit">
        <FormItem>
          <FormLabel>Default Unit</FormLabel>
          <FormControl class="w-full">
            <VueSelect
           
             v-model="selectedData.defaultunit"
              :options="unitOptions"
              placeholder="Default Unit"
           />
          </FormControl>
        </FormItem>
      </FormField>


      <FormField  name="itemtype">
        <FormItem>
          <FormLabel>Item Type
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
    
      

      <FormField  name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl class="w-full">
            <Textarea v-model="selectedData.description" placeholder="Description" class="border px-3 py-2 rounded-md" />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex justify-end gap-4 mt-6">
        <Button type="button" class="bg-red-600 text-white" @click="closeEditModal">
          Cancel
        </Button>
        <Button type="submit" class="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </form>
  </dialog>


  
</template>

<style scoped>


   /* .button-gapt{
     
   } */
</style>
