<script setup lang="ts">
import GrItemPopup from './GrItemPopup.vue';
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { toast, useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { Plus, Minus, Edit, SlidersHorizontalIcon } from 'lucide-vue-next';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Card from '@/components/ui/card/Card.vue';
import Popover from '@/components/ui/popover/Popover.vue';
import PopoverTrigger from '@/components/ui/popover/PopoverTrigger.vue';
import PopoverContent from '@/components/ui/popover/PopoverContent.vue';
import VueSelect from 'vue3-select-component';


// Store fetched data
type FormData = {
  hotelid?:string;
  invno?: string;
  vendor?: string;
  date?: string;
  //department?: string;
  remark?:string;
  defaultunit?:string;
};

type FormData1 = {
  id:string;
  hotelid:string;
  invoiceno: string;
  vendorname: string;
  date: string;
  //department?: string;
  remark:string;
};

type RequestDetails = {
  item: string;
  quentity: string;
  unit:string;
  description:string;
  remark:string;
};

type EditForm = {
  id:string;
  date: string;
  remark: string;
  item: string;
  quentity: string;
  unit:string;
  description:string;
  invno:string;
  vendor:string;
  
}



type UnitOptions={
  value: string;
  label:string;
}


type ItemOptions={
  value: string;
  label:string;
}


const selectedData = ref<EditForm>({
  id:'',
  date:'',
  remark: '',
  item: '',
  quentity:'',
  unit:'',
  description:'',
  invno:'',
  vendor:'',
});


const formSchema = toTypedSchema(z.object({
  invno: z.string().optional(),
  vendor: z.string().optional(),
  date: z.string().optional(),
  //department: z.string().optional(),
  remark:z.string().optional(),
  defaultunit:z.string().optional(),
}));

const form = useForm({
  validationSchema: formSchema,
});


const fetchedData = ref<FormData1[]>([]);
const submittedData = ref<FormData[]>([]);
const requestDetails = ref<RequestDetails[]>([{ item: '',description:'',unit:'', quentity: '',remark:''}]);
const dialogRef = ref<HTMLDialogElement | null>(null);




const fetchData1 = async () => {
  try {
    const response = await axios.get('http://localhost:3000/fetchgrn');
    console.log('Fetched Request Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};




onMounted(() => {
  fetchData1();
  fetchunitdata();
  fetchitemdata();
});


const onSubmit = form.handleSubmit(async (values) => {
  try {
    console.log('Selected Item:', selecteditem.value); // Log selected item
    console.log('Selected Unit:', selectedunits.value); // Log selected unit

    const requestBody = {
      ...values, // Spread form values
      details: requestDetails.value, // Include additional details
    };
    console.log('Form Submitted with values:', values);
    console.log('Request Header:', values);
    console.log('Request Details:', requestDetails.value);
    console.log("Request Body", requestBody);

    const response = await axios.post('http://localhost:3000/addgrn', requestBody);
    console.log('Request header:', response.data);

    submittedData.value.push(values);
    closeModal();
    fetchData1();
  } catch (error) {
    console.error('Error submitting form:', error);
  }
});



const editModalRef = ref<HTMLDialogElement | null>(null);






const fetchData = async (id: any) => {
  console.log("id",id)
  try {
    const response = await axios.get(`http://localhost:3000/fetchgrndetails/${id}`)

    if (response.data.success) {
      console.log('Fetched Request Header Data:', response.data.data.header);
      console.log('Fetched Request Details Data:', response.data.data.details);
      if (id) {
        const rawDate = new Date(response.data.data.header.date);
        const formattedDate = rawDate.toISOString().split('T')[0];
        selectedData.value = {
          id,
          // date: response.data.data.header.date,
          date: formattedDate,
          invno: response.data.data.header.invoiceno,
          vendor: response.data.data.header.vendorname,
          remark: response.data.data.header.remark,
          
          // item: response.data.data.details.item,
          // quentity: response.data.data.details.quentity,
        };
        console.log("vendor",selectedData.value.vendor)
        requestDetails.value = response.data.data.details.map((detail: RequestDetails) => ({
          item: detail.item,
          quentity: detail.quentity,
        }));
      }
      
    } else {
      console.error('Error in API response:', response.data.msg);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


const openEditModal = async (id: any) => {
  console.log("id ddddd",id)
  await fetchData(id); 
  editModalRef.value?.showModal(); 
};


const closeEditModal = () => editModalRef.value?.close();


const openModal = () => dialogRef.value?.showModal();
const closeModal = () => dialogRef.value?.close();


const addRow = () => {
  requestDetails.value.push({item: '',description:'',unit:'', quentity: '',remark:''});
};

const removeRow = (index: number) => {
  if (requestDetails.value.length > 1) {
    requestDetails.value.splice(index, 1);
  }
};




const deleteheader = async (id: string) => {
  console.log("object",id)
  try {
    const response = await axios.delete(`http://localhost:3000/deleteheader/${id}`);
    console.log('Header deleted:', response.data);
    
    
    //fetchData1();
  } catch (error) {
    console.error('Error deleting unit:', error);
  }
};


watch([selectedData,requestDetails], (n,m) => {
  console.log('Edited Data:', n);
  console.log('Edited Data:', m);
},{deep:true});



// const submitEditedData = async () => {
//   try {
//     const editedDataPayload = {
//       ...selectedData.value,
//       details: requestDetails.value,
//     };

//     console.log('Submitting Edited Data:', editedDataPayload);
//     console.log("Selected id",selectedData.value.id)
//     const response = await axios.put(`http://localhost:3000/editrequests/${selectedData.value.id}`, editedDataPayload);
    
//     console.log('Edited Data Submitted Successfully:', response.data);

    
//     fetchData1();
//     closeEditModal();
//   } catch (error) {
//     console.error('Error submitting edited data:', error);
//   }
// };


//submit the edits

// const submitEditedData = async () => {
//   try {
//     const editedDataPayload = {
//       ...selectedData.value,
//       details: requestDetails.value,
//     };

//     const response = await axios.put(`http://localhost:3000/editrequests/${selectedData.value.id}`, editedDataPayload);

//     //fetchData1();
//     closeEditModal();
//   } catch (error) {
//     console.error('Error submitting edited data:', error);
//   }
// };
const selectedunits=ref("");
const selecteditem=ref("");
const unitOptions=ref<UnitOptions[]>([])
const itemOptons=ref<ItemOptions[]>([])

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


const fetchitemdata=async()=>{
  try {
  const response = await axios.get('http://localhost:3000/itemoptions');
  console.log('Fetched Item Data Options:', response.data);
    fetchedData.value = response.data;
    itemOptons.value=response.data.map((item)=>({value:item.id,label:item.name}))
  }
  catch(error){
    console.error('Error fetching data:', error);
  }
}

// watch(requestDetails, (newDetails) => {
//   newDetails.forEach((detail) => {
//     console.log('Item:', detail.item);
//     console.log('Quantity:', detail.quentity);
//     console.log('Unit:', detail.unit ); 
//     console.log('Unit:', detail.description ); 
//     console.log('Unit:', detail.remark ); 
//   });
// }, { deep: true });



// delete grn

const deletegrn = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/deletegrn/${id}`);
    console.log('Unit deleted:', response.data);
    
    
    fetchData1();
  } catch (error) {
    console.error('Error deleting unit:', error);
  }
};




const itemRef=ref<HTMLDialogElement | null>(null);

const openitemModal = () => {
  itemRef.value?.showModal();
  closeModal();

 
}
const closeitemModal = () => itemRef.value?.close();
</script>

<template>
  <Card class="p-8 shadow-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Grn Details</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        @click="openModal"
      >
     New Grn
      </Button>
    </div>
    <Table>
      <!-- <TableCaption>Request Details</TableCaption> -->
      <TableHeader class="bg-blue-400">
        <TableRow>
          <TableHead>Invoice Number</TableHead>
          <TableHead>Vendor Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Remark</TableHead>
                 
          
          <TableHead class="justify-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(data, index) in fetchedData" :key="index">
          <TableCell>{{ data.invoiceno }}</TableCell>
          <TableCell>{{ data.vendorname }}</TableCell>
          <TableCell>{{ data.date }}</TableCell>
          <TableCell>{{ data.remark }}</TableCell>
          <!-- <TableCell>{{ data.id }}</TableCell> -->
          <!-- <TableCell>{{ data.remark }}</TableCell> -->
          
          <TableCell class="flex gap-2 justify-left">
            <Button
              class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              @click="deletegrn(data.id)"
            >
              <Minus class="size-4" />
            </Button>
            <Button
              class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              @click="openEditModal(data.id)" 
            >
              <Edit class="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>

  <!-- submit form -->
  <dialog ref="dialogRef" class="bg-gray-200 rounded-md p-6 w-[800px]  rounded-md">
    <form @submit="onSubmit" class="bg-white rounded-md p-6  ">
      <h3 class="text-lg font-bold mb-4">Add New Request</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FormField v-slot="{ componentField }" name="invno">
            <FormItem>
              <FormLabel>Invoice Number</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Invoice Number"
                  v-bind="componentField"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField v-slot="{ componentField }" name="vendor">
            <FormItem>
              <FormLabel>Vendor Name</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Vendor Name"
                  v-bind="componentField"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField v-slot="{ componentField }" name="date">
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="date"
                  placeholder="Date"
                  v-bind="componentField"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
       
        <div>
          <FormField v-slot="{ componentField }" name="remark">
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl class="w-full">
                <Textarea
                  placeholder="Remark"
                  v-bind="componentField"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>

      
      <div class="border-1">
  <Table class="mt-5">
    <TableHeader class="bg-gray-500">
      <TableRow>
        <TableHead class="w-[200px]">Item</TableHead>
        <TableHead class="w-[200px]">Description</TableHead>
        <TableHead class="w-[200px]">Unit</TableHead>
        <TableHead class="w-[150px]">Quantity</TableHead>
        <TableHead class="w-[150px]">Remark</TableHead>
        <TableHead class="w-[100px]"></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(detail, index) in requestDetails" :key="index">
        <!-- Item Cell -->
        <TableCell class="w-[200px]">
          <FormField name="item">
            <FormItem>
              <FormControl>
                <VueSelect
                  v-model="detail.item"
                  :options="itemOptons"
                  placeholder="Default Item"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </TableCell>

        <!-- Description Cell -->
        <TableCell class="w-[200px]">
          <FormField name="requestDetails.description">
            <FormItem>
              <FormControl>
                <Input
                  v-model="detail.description"
                  type="text"
                  placeholder="Description"
                  class="w-full"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </TableCell>

        <!-- Unit Cell -->
        <TableCell class="w-[200px]">
          <FormField name="defaultunit">
            <FormItem>
              <FormControl>
                <VueSelect
                  v-model="detail.unit"
                  :options="unitOptions"
                  placeholder="Default Unit"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </TableCell>

        <!-- Quantity Cell -->
        <TableCell class="w-[150px]">
          <FormField name="requestDetails.quantity">
            <FormItem>
              <FormControl>
                <Input
                  v-model="detail.quentity"
                  type="text"
                  placeholder="Quantity"
                  class="w-full"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </TableCell>

        <TableCell class="w-[200px]">
          <FormField name="requestDetails.remark">
            <FormItem>
              <FormControl>
                <Input
                  v-model="detail.remark"
                  type="text"
                  placeholder="Remark"
                  class="w-full"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </TableCell>

        <!-- Action Buttons Cell -->
        <TableCell class="w-[100px]">
          <div class="flex space-x-5">
            <Button
              type="button"
              class="bg-red-600 text-white p-2 rounded-full"
              @click="removeRow(index)"
              :disabled="requestDetails.length === 1"
            >
              <Minus class="size-4" />
            </Button>
            <Button
              type="button"
              class="bg-blue-600 text-white p-2 rounded-full"
              @click="openitemModal"
            >
              <Plus class="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>





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
  <dialog ref="editModalRef"  class="bg-gray-200 rounded-md p-6 w-[800px]  rounded-md">
    <form @submit.prevent="submitEditedData" class="bg-white rounded-md p-6  ">
      <h3 class="text-lg font-bold mb-4">Edit Grn</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FormField  name="requester">
            <FormItem>
               <FormLabel>Invoice Number</FormLabel>
              <FormControl class="w-full">
                <Input
                type="text"
                  v-model="selectedData.invno"
                  :options="itemOptons"
                  placeholder="Invoice Number"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField  name="date">
            <FormItem>
              <FormLabel>Vendor Name</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Vendor Name"
                  v-model="selectedData.vendor"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField  name="date">
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="date"
                  placeholder="Date"
                  v-model="selectedData.date"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField  name="remark">
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl class="w-full">
                <Textarea
                  placeholder="Remark"
                  v-model="selectedData.remark"
                  class="border border-gray-300 rounded-md px-3 py-2"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
      </div>

      <!-- Request details -->
      <div class="border-1">
        <Table class="mt-5">
          <TableHeader class="bg-gray-500">
            <TableRow>
              <TableHead class="w-[200px]">Item</TableHead>
              <TableHead class="w-[200px]">Description</TableHead>
              <TableHead class="w-[200px]">Unit</TableHead>
              <TableHead class="w-[150px]">Quantity</TableHead>
              <TableHead class="w-[150px]">Remark</TableHead>
              <TableHead class="w-[100px]"></TableHead>
              
              <TableHead class="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(detail, index) in requestDetails" :key="index">
              <TableCell>
                <FormField name="item">
                  <FormItem>
                    <FormControl class="w-full">
                      <Input
                        v-model="detail.item"
                        type="text"
                        placeholder="Item name"
                        class="w-full"                                
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </TableCell>
          


                <TableCell>
                <FormField name="description">
                  <FormItem>
                    <FormControl class="w-full">
                      <Input
                        v-model="detail.description"
                        type="text"
                        placeholder="Description"
                        class="w-full"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </TableCell>
             

              <TableCell>
                <FormField name="defaultunit">
                  <FormItem>
                    <FormControl class="w-full">
                      <Input
                        v-model="detail.quentity"
                        type="text"
                        placeholder="Quantity"
                        class="w-full"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </TableCell>
              <TableCell>
                
              </TableCell>
              <TableCell>
                <div class="flex space-x-5">
                  <Button
                    type="button"
                    class="bg-red-600 text-white p-2 rounded-full"
                    @click="removeRow(index)"
                    :disabled="requestDetails.length === 1"
                  >
                    <Minus class="size-4" />
                  </Button>
                  <Button
                    type="button"
                    class="bg-blue-600 text-white p-2 rounded-full"
                    @click="addRow"
                  >
                    <Plus class="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

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


  <dialog ref="itemRef" class="bg-gray-200 rounded-md p-6 w-[750px] rounded-md  ">
    
    <GrItemPopup  @close="closeitemModal" />
</dialog>

</template>

<style scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
dialog {
  border: none;
  border-radius: 8px;
}
.dialog-enter-active, .dialog-leave-active {
  transition: opacity 0.3s;
}
.dialog-enter, .dialog-leave-to {
  opacity: 0;
}
</style>
