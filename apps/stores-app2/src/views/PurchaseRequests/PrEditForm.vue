<script setup lang="ts">

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
} from '@/components/ui/form';
import { useRoute } from 'vue-router';


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

const route = useRoute();
const id = route.params.id as string
const fetchData = async (id:string) => {
   
  console.log("id",id)
  try {
    const response = await axios.get(`http://localhost:3000/fetchreqdetails/${id}`)

    if (response.data.success) {
      console.log('Fetched Request Header Data:', response.data.data.header);
      console.log('Fetched Request Details Data:', response.data.data.details);
      if (id) {
        selectedData.value = {
          id,
          date: response.data.data.header.date,
          requester: response.data.data.header.requester,
          department: response.data.data.header.department,
          remark: response.data.data.header.remark,
          item: response.data.data.details.item,
          quentity: response.data.data.details.quentity,
        };
        // requestDetails.value = response.data.data.details.map((detail: RequestDetails) => ({
        //   item: detail.item,
        //   quentity: detail.quentity,
        // }));
      }
      
    } else {
      console.error('Error in API response:', response.data.msg);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData(id);
});
</script>


<template>
    <div>
 <!-- edit form -->
 
    <form @submit.prevent="" class="bg-white rounded-md p-6  ">
      <h3 class="text-lg font-bold mb-4">Edit Request</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FormField  name="requester">
            <FormItem>
              <FormLabel>Requester</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Requester"
                  v-model="selectedData.requester"
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
          <FormField  name="department">
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl class="w-full">
                <Input
                  type="text"
                  placeholder="Department"
                  v-model="selectedData.department"
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
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              
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
                <FormField name="quantity">
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



    </div>
</template>



<style lang="scss" scoped>

</style>