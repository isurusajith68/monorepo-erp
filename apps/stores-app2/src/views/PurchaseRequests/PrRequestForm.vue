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
import { Plus, Minus,  } from 'lucide-vue-next';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';



// Store fetched data
type FormData = {
  hotelid?:string;
  requester?: string;
  date?: string;
  department?: string;
  remark?:string;
};



type RequestDetails = {
  item: string;
  quentity: string;
  unit:string
};




type EditForm = {
  id:string;
  date: string;
  requester: string;
  department: string;
  remark: string;
  item: string;
  quentity: string;
}

const selectedData = ref<EditForm>({
  id:'',
  date: '',
  requester: '',
  department: '',
  remark: '',
  item: '',
  quentity: ''
});


const formSchema = toTypedSchema(z.object({
  requester: z.string().optional(),
  date: z.string().optional(),
  department: z.string().optional(),
  remark:z.string().optional(),
}));

const form = useForm({
  validationSchema: formSchema,
});


const submittedData = ref<FormData[]>([]);
const requestDetails = ref<RequestDetails[]>([{ item: '', quentity: '',unit:'' }]);







const dialogRef = ref<HTMLDialogElement | null>(null);
const selectedItem = ref<string>('');


const closeModal = () => dialogRef.value?.close();





const onSubmit = form.handleSubmit(async (values) => {
  try {

    const requestBody = {
      ...values, // Spread form values
      details: requestDetails.value, // Include additional details
    };
    console.log('Form Submitted with values:', values);
   
    console.log('Request Header:', values);
    console.log('Request Details:', requestDetails.value);

    console.log("Request Body",requestBody)
   
    const response = await axios.post('http://localhost:3000/requests',requestBody);
   
    console.log('Request header:', response.data);
   
    submittedData.value.push(values);
    // requestDetails.value.push( requestDetails.value);
   
    closeModal(); 
  } catch (error) {
    console.error('Error submitting form:', error);
  }
});


const editModalRef = ref<HTMLDialogElement | null>(null);

const itemRef=ref<HTMLDialogElement | null>(null);

const openitemModal = () => {
  console.log("itemRef value:", itemRef.value);
  itemRef.value?.showModal();
};

const closeitemModal = () => itemRef.value?.close();

const selectedRef=ref<HTMLDialogElement|null>(null)
const openselectedItem=()=>{
  selectedRef.value?.showModal()
}

const closeEditModal = () => editModalRef.value?.close();

const removeRow = (index: number) => {
  if (requestDetails.value.length > 1) {
    requestDetails.value.splice(index, 1);
  }
};




// const submitEditedData = async () => {
//   try {
//     const editedDataPayload = {
//       ...selectedData.value,
//       details: requestDetails.value,
//     };

//     const response = await axios.put(`http://localhost:3000/editrequests/${selectedData.value.id}`, editedDataPayload);

    
//     closeEditModal();
//   } catch (error) {
//     console.error('Error submitting edited data:', error);
//   }
// };



</script>

<template>
  

  <!-- submit form -->
  <div class="w-[900px] shadow-lg ml-20">
    <form @submit.prevent="onSubmit" class="bg-white rounded-md p-6  ">
      <h3 class="text-lg font-bold mb-4">Add New Request</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FormField v-slot="{ componentField }" name="requester">
            <FormItem>
              <FormLabel>Requester</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Requester"
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
          <FormField v-slot="{ componentField }" name="department">
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Department"
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

      <!-- Request details -->
      <div class="border-1">
        <Table class="mt-5">
          <TableHeader class="bg-gray-500">
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead class="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(detail, index) in requestDetails" :key="index">
              <TableCell>
                <FormField name="requestDetails.item">
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
                <FormField name="requestDetails.item">
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
                <FormField name="requestDetails.quantity">
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
  </div>


  
<!-- item popup -->
  <dialog ref="itemRef" class="bg-gray-200 rounded-md p-6 w-[750px] rounded-md  ">
    <div>
      Text
      <PrItemPopup  @close="closeitemModal" />
    </div>
      
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
