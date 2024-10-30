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
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { Plus, Minus, Edit } from 'lucide-vue-next';

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

// Store fetched data
type FormData = {
  requester?: string;
  date?: string;
  department?: string;
  remark?:string;
};

type FormData1 = {
  id: string;
  requester: string;
  date: string;
  department: string;
  item:string;
  quentity:string;
  remark:string;
};

type RequestDetails = {
  item: string;
  quantity: string;
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

const fetchedData = ref<FormData1[]>([]);
const submittedData = ref<FormData[]>([]);
const requestDetails = ref<RequestDetails[]>([{ item: '', quantity: '' }]);
const dialogRef = ref<HTMLDialogElement | null>(null);


const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/fetchrequests');
    console.log('Fetched Request Data:', response.data);
    fetchedData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


onMounted(() => {
  fetchData();
});


const onSubmit = form.handleSubmit(async (values) => {
  try {
    console.log('Form Submitted with values:', values);
   
    console.log('Request Header:', values);
    console.log('Request Details:', requestDetails.value);
   
    const response = await axios.post('http://localhost:3000/requests', values);
    console.log('Response:', response.data);
    submittedData.value.push(values);
    fetchData();
    closeModal(); 
  } catch (error) {
    console.error('Error submitting form:', error);
  }
});


const openModal = () => dialogRef.value?.showModal();
const closeModal = () => dialogRef.value?.close();


const addRow = () => {
  requestDetails.value.push({ item: '', quantity: '' });
};

const removeRow = (index: number) => {
  if (requestDetails.value.length > 1) {
    requestDetails.value.splice(index, 1);
  }
};
</script>

<template>
  <Card>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Category List</h2>
      <Button 
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        @click="openModal"
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
          <!-- <TableHead>Remark</TableHead> -->
          <TableHead></TableHead>
          
          <TableHead class="justify-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(data, index) in fetchedData" :key="index">
          <TableCell>{{ index+1 }}</TableCell>
          <TableCell>{{ data.requester }}</TableCell>
          <TableCell>{{ data.date }}</TableCell>
          <TableCell>{{ data.department }}</TableCell>
          <!-- <TableCell>{{ data.remark }}</TableCell> -->
          <TableCell>

            <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        Items
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80 bg-gray-100">
      <Table>
        <TableHeader class="bg-blue-100">
          <TableHead>Item</TableHead>
          <TableHead>Quentity</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow class="border-solid">
            <TableCell>
              {{ data.item }}
            </TableCell>
            <TableCell>
              {{ data.quentity }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopoverContent>
  </Popover>
          </TableCell>
          <TableCell class="flex gap-2 justify-left">
            <Button
              class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              @click="removeRow(index)"
            >
              <Minus class="size-4" />
            </Button>
            <Button
              class="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              @click="" 
            >
              <Edit class="size-4" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>

  <dialog ref="dialogRef" class="bg-gray-200 rounded-md p-6 w-[600px] rounded-md">
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
                <FormField name="requestDetails.quantity">
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
        <Button type="button" class="bg-red-600 text-white" @click="closeModal">
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
