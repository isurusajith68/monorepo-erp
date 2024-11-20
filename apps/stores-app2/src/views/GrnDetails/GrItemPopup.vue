<script setup lang="ts">

import { computed, HtmlHTMLAttributes, onMounted, ref, watch } from 'vue';
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




const searchQuery=ref('')

type fetchItems={
    itemId:string;
    itemName:string;
    guentity:string;
    unit:string;
}

const searchResults=ref<fetchItems[]>([])


const fetchSearchResults = async () => {
  try {
    console.log("Search query being sent:", searchQuery.value);
    const response = await axios.get(`http://localhost:3000/searchItems`, {
      params: { query: searchQuery.value }
    });
    console.log("Response data:", response.data);
    searchResults.value = response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

// Watch searchQuery to fetch data as user types
watch(searchQuery, (newQuery) => {
  if (newQuery){
    fetchSearchResults();
  } else{

  }

});



</script>



<template>
      <div>
        <div class="w-1/2 pr-2 pl">
    <button @click="$emit('close')" class="absolute top-3 right-3 text-black hover:text-gray-700 w-[50px]">
    X
  </button>
  
  <!-- Search Form -->
  <form @submit.prevent="" class="bg-gray-400 rounded-md p-4 flex-1 w-[300px] shadow-sm">
    <h3 class="text-lg font-bold mb-4">Search Items</h3>
    <div class="grid grid-cols-1 gap-4">
      <FormField v-slot="{ componentField }" name="searchitems">
        <FormItem>
          <FormControl class="w-full">
            <Input
            
              type="search"
              placeholder="Search Items"
              v-model="searchQuery"
              class="border border-gray-300 rounded-md px-3 py-2 w-full bg-white"
            />
          </FormControl>
        </FormItem>
      </FormField>
    </div>
  </form>
  <div class="flex gap-12 w-full">
  <!-- Table Section -->
  <div class="flex-1 w-full">
    <Table class="mt-4 border border-gray-200 rounded-md shadow-sm w-full">
      <TableHeader class="bg-green-400">
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Item Name</TableHead>
          <TableHead>Unit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      

        <TableRow
          v-for="(item, index) in searchResults"
          :key="index"
          class="cursor-pointer hover:bg-gray-50"
          @click="openQuantityPopup(item.name, item.id, item.defaultunit)"
        > 

          <TableCell>{{ item.id }}</TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.defaultunit }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>

  <!-- Selected Items Card -->
  <div class="w-[400px] ml-24 -mt-28">
    <Card class="shadow-md bg-blue-200 p-6">
      <h4 class="font-bold text-lg mb-4">Selected Items</h4>
      <PrSelectedItems
        ref="openselectedItem"
        :selectedItems="selectedItems"
        v-model="selectedItems"
       
        />
    </Card>
  </div>
</div>
   </div>
    </div>
</template>



<style lang="scss" scoped>

</style>