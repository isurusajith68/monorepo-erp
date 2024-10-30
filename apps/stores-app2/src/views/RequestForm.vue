<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import '../assets/style.css'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
// import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import Textarea from '@/components/ui/textarea/Textarea.vue'


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ref } from 'vue'

import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter();
type FormData = {
  id: string;
  buyer: string;
  // address: string;
  date: string;
  message: string;
};

const formSchema = toTypedSchema(z.object({
    id: z.string().min(2),
    buyer: z.string().min(2),
   // address:z.string().min(2),
    date:z.string(),
    message:z.string().min(2).max(100),
}))

const form = useForm({
  validationSchema: formSchema,
})


const { toast } = useToast()

const submittedData = ref(<FormData[]>[])

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values);
  try {
    
    const response = await axios.post('http://localhost:3000/', values);
    console.log('Response:', response.data);

   
    submittedData.value.push(values);

    
    toast({
      title: 'Success',
      description: 'The form has been submitted!',
    });

   
    router.push('/');
  } catch (error) {
    console.error('Error submitting form:', error);
    toast({
      title: 'Error',
      description: 'There was an error submitting the form.',
    });
  }
});

//resubmit the changed data in table 
// const submitRowData = (index: number) => {
//   const rowData = submittedData.value[index]
//   console.log('Row Edited:', rowData)
// }

</script>



<template>
<div>
  <form @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="id">
      <FormItem>
        <FormLabel>Id</FormLabel>
        <FormControl class="w-1/2">
          <Input
            type="text"
            placeholder="Id"
            v-bind="componentField"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="buyer">
      <FormItem>
        <FormLabel>Buyer</FormLabel>
        <FormControl class="w-1/2">
          <Input
            type="text"
            placeholder="Buyer"
            v-bind="componentField"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl class="w-1/2">
          <Input
            type="text"
            placeholder="Address"
            v-bind="componentField"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField> -->

    <FormField v-slot="{ componentField }" name="date">
      <FormItem>
        <FormLabel>Date</FormLabel><br>
        <FormControl class="w-1/2">
          <input
            type="date"
            v-bind="componentField"
            class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>


    <FormField v-slot="{ componentField }" name="message">
      <FormItem>
        <FormLabel>Remark</FormLabel><br>
        <FormControl class="w-1/2">
          <Textarea
          placeholder="Type something Here"
          v-bind="componentField"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="mt-4 bg-blue-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-700 transition duration-200"
    >
      Submit
    </Button>
  </form>

<!-- 
  <Table>
    <TableCaption>Details</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead >
         
        </TableHead>
        <TableHead >
    Id
        </TableHead>
        <TableHead>Buyer</TableHead>
        <TableHead>Date</TableHead>
        <TableHead class="center">
          remark
        </TableHead>
      
        <TableHead class="center">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(data,index)  in submittedData" :key="index">
        <TableCell>{{ index+1}}</TableCell>
       
        <TableCell>
      <Input
        v-model="submittedData[index].id"
        class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </TableCell>
 
        <TableCell>
      <Input
        v-model="submittedData[index].buyer"
        class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </TableCell>
      
        <TableCell>
      <Input type="date"
        v-model="submittedData[index].date"
        class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </TableCell>
       
        <TableCell>
      <Textarea
        v-model="submittedData[index].message"
        class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </TableCell>
        <TableCell>
          <Button
            @click="submittedData.splice(index, 1)"
            class="mt-4 bg-red-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-yellow-700 transition duration-200"
          >Delete</Button>
        </TableCell>
        <TableCell>
          <Button
          @click="submitRowData(index)"
          class="mt-4 bg-green-600 text-white font-semibold rounded-md px-4 py-2 hover:bg-green-700 transition duration-200"
        >
          Save 
        </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table> -->

</div>

</template>



<style>

</style>