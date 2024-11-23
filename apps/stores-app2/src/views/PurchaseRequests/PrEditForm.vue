<script setup lang="ts">
import PrItemPopup from './PrItemPopup.vue';
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { Plus, Minus, ChevronsLeftRightEllipsis,  } from 'lucide-vue-next';
import { pritemDetails } from './PrItemPopup.vue';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useRoute, useRouter } from 'vue-router';
import Card from '@/components/ui/card/Card.vue';

type FormData = {
  hotelid?:string;
  requester?: string;
  date?: string;
  department?: string;
  remark?:string;
};

const formSchema = toTypedSchema(z.object({
  requester: z.string().optional(),
  date: z.string().optional(),
  department: z.string().optional(),
  remark:z.string().optional(),
}));

const form = useForm({
  validationSchema: formSchema,
});

type EditForm = {
  id:string;
  date: string;
  requester: string;
  department: string;
  remark: string;
  itemName: string;
  quantity: string;
  unit:string
}

const selectedData = ref<EditForm>({
  id:'',
  date: '',
  requester: '',
  department: '',
  remark: '',
  itemName: '',
  quantity: '',
  unit:'',
});


type RequestDetails = {
  item: string;
  quentity: string;
  unit:string
};

const route = useRoute();
const id = route.params.id as string

const selectedItems=ref<pritemDetails[]>([])
const requestDetails = ref([]);
const submittedData = ref<FormData[]>([]);
const dialogRef = ref<HTMLDialogElement | null>(null);
const itemRef=ref<HTMLDialogElement | null>(null);


const fetchData = async (id:string) => {
     console.log("idr",id)
  if(id){
    try {
    const response = await axios.get(`http://localhost:3000/fetchreqdetails/${id}`)

    if (response.data.success) {
      //console.log('Fetched Request Header Data:', response.data.data.header);
      //console.log('Fetched Request Details Data:', response.data.data.details);

      const { header, details } = response.data.data;

    
      selectedData.value = {
          id,
          date: header.date,
          requester: header.requester,
          department: header.department,
          remark: header.remark,
          itemName: details.item,
          quantity: details.quentity,
          unit:details.unit
      };
      selectedItems.value = response.data.data.details.map((detail: RequestDetails) => ({
        itemName: detail.item,
        unit: detail.unit,
        quantity: detail.quentity,
      }));
      //console.log("details value 0000", requestDetails.value);
          
      
    } else {
      console.error('Error in API response:', response.data.msg);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  }
  else{
    console.log("id is empty")
  }
 
};

onMounted(() => {
  if (id) {
    fetchData(id);
   
  } else {
    console.warn('ID is undefined; opening empty form.');
      
  }
});



const openitemModal = () => {
  console.log("itemRef value:", itemRef.value);
  itemRef.value?.showModal();
};

const closeitemModal = () => itemRef.value?.close();



const removeRow = (index: number) => {
  if (selectedItems.value.length > 1) {
    selectedItems.value.splice(index, 1);
  }
};
const router=useRouter()
const closeModal = () =>{
  router.push('/request')
}



const onSubmit = form.handleSubmit(async (values) => {
  console.log("values",values)

    try{
    // console.log("Header",values)
    // console.log("Details",selectedItems.value)

    const requestBody={...values,...selectedData.value,details:selectedItems.value}
    console.log("Request body",requestBody)
    if(id)
    {
      console.log("id",id)
      const response = await axios.put(`http://localhost:3000/editrequests/${id}`, requestBody);
      console.log("response data",response.data)
    }
    else{
      const response = await axios.post('http://localhost:3000/requests', requestBody);
        console.log("Response from server:", response.data);
        submittedData.value.push(values)
        alert("Data Inserted Successfully");
        fetchData(id)

    }
    
  }
  catch(error){
   console.log("Something Went wrong",error)
  }
  }
)



</script>


<template>
  <div class="flex items-center justify-center min-h-[500px]">
    <Card class="w-[1000px]  ">
 <!-- edit form -->
 <div class="w-full min-h-20 bg-sky-900">
        <h3 class=" flex text-lg text-white  text-2xl pl-10 pt-5">Request Item</h3>
  </div>
    <form @submit.prevent="onSubmit" class=" pl-10 pr-10 pt-6 pb-7 bg-slate-200 border-black ">
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FormField v-slot="{ componentField }" name="requester">
            <FormItem>
              <FormLabel>Requester</FormLabel>
              <FormControl class="w-full">
                <Input
                 v-bind="componentField"
                  type="text"
                  placeholder="Requester"
                  v-model="selectedData.requester"
                  class="border border-white bg-whitw rounded-md px-3 py-2 shadow-2xl hover:bg-cyan-50"
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
                 v-bind="componentField"
                  type="date"
                  placeholder="Date"
                  v-model="selectedData.date"
                   class="border border-white bg-whitw rounded-md px-3 py-2 shadow-2xl hover:bg-cyan-50"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField v-slot="{ componentField }" name="department">
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl class="w-full">
                <Input
                 v-bind="componentField"
                  type="text"
                  placeholder="Department"
                  v-model="selectedData.department"
                    class="border border-white bg-whitw rounded-md px-3 py-2 shadow-2xl hover:bg-cyan-50"
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div>
          <FormField v-slot="{ componentField }"  name="remark" class="">
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl class="border border-white bg-whitw rounded-md px-3 py-2 shadow-2xl hover:bg-cyan-50 w-full">
                <Textarea
                 v-bind="componentField"
                  placeholder="Remark"
                  v-model="selectedData.remark"
                    
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
              <TableHead>Item</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead></TableHead>
              
              <TableHead class="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="selectedItems.length > 0"  v-for="(detail, index) in selectedItems" :key="index">
              <TableCell>
                <FormField v-slot="{ componentField } "name="itemName">
                  <FormItem>
                    <FormControl class="w-full">
                      <Input
                        v-model="detail.itemName"
                        type="text"
                        placeholder="Item name"
                        class="w-full"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </TableCell>
              <TableCell>
                <FormField v-slot="{ componentField }" name="unit">
                  <FormItem>
                    <FormControl class="w-full">
                      <Input
                        v-model="detail.unit"
                        type="text"
                        placeholder="Item name"
                        class="w-full"
                      />
                    </FormControl>
                  </FormItem>
                </FormField>
              </TableCell>
              <TableCell>
                <FormField v-slot="{ componentField }" name="quantity">
                  <FormItem>
                    <FormControl class="w-full">
                      <Input
                        v-model="detail.quantity"
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
                    @click="openitemModal"
                  >
                    <Plus class="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="selectedItems.length === 0">
    <TableCell><Input type="text" placeholder="Item name" class="w-full" /></TableCell>
    <TableCell><Input type="text" placeholder="Unit" class="w-full" /></TableCell>
    <TableCell><Input type="text" placeholder="Quantity" class="w-full" /></TableCell>
    <TableCell>
      <div class="flex space-x-5">
                 
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
      <dialog ref="itemRef" class="bg-gray-200 rounded-md p-6 w-[750px] rounded-md  ">
       
        
    <PrItemPopup :parentselecteditems="selectedItems"  @close="closeitemModal" />
  
    
</dialog>

      <div class="flex justify-end gap-4 mt-6">
        <Button type="button" class="bg-red-600 text-white" @click="closeModal">
          Cancel
        </Button>
        <Button type="submit" class="bg-blue-600 text-white">
          Submit
        </Button>
      </div>
    </form>



    </Card>
  </div>
</template>



<style lang="scss" scoped>

</style>