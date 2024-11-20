<script setup lang="ts">
import PrSelectedItems from './PrSelectedItems.vue';

import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Card from '@/components/ui/card/Card.vue';
import { defineEmits } from 'vue';


const emit = defineEmits(['close']);

type fetchItems={
  id:string;
  name:string;
  defaultunit:string;
}

type itemDetails={
    itemId:string;
    itemName:string;
    unit:string;
    quantity:string;
}

const searchQuery = ref('');
const searchResults = ref<fetchItems[]>([]);

const selectedItems=ref<itemDetails[]>([]);



// Fetch filtered data based on search query
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


const quantityPopupRef = ref<HTMLDialogElement | null>(null);

const selectedItemId = ref('');
const selectedItemName = ref('');
const selectedUnit = ref('');
const quantity=ref('')


const openQuantityPopup = (name: string, id: string,defaultunit:string) => {
  selectedItemName.value = name;
  selectedItemId.value = id;
  selectedUnit.value=defaultunit
  quantityPopupRef.value?.showModal();
  console.log("itemname=",selectedItemName.value)
  console.log("item id=",selectedItemId.value)
  defineEmits(['close']);
};



const handleQuantitySubmit = (data: { itemId: string, itemName: string, quantity: string,unit:string }) => {
  console.log("selected Items", {
    itemId: data.itemId,
    itemName: data.itemName,
    quantity: data.quantity,
    unit: data.unit
});
selectedItems.value.push({
    itemId: data.itemId,
    itemName: data.itemName,
    quantity: data.quantity,
    unit: data.unit,
  });
  closeQuantityPopup()
   
}


const closeQuantityPopup = () => {
  quantityPopupRef.value?.close();
};
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







<!-- quentity popup -->
    <dialog ref="quantityPopupRef" class="bg-blue-400 rounded-md p-6 w-[600px] ">
    <button @click="closeQuantityPopup" class="absolute top-3 right-3 text-black hover:text-gray-700 w-[50px]">
    X
  </button>
    <form @submit.prevent="handleQuantitySubmit({itemId:selectedItemId,itemName:selectedItemName,quantity:quantity,unit:selectedUnit})" class="bg-gray-300 rounded-md p-6  ">
      <h3 class="text-lg font-bold mb-4">Add Quentity</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="w-full">
          <FormField v-slot="{ componentField }" name="addquentity">
            <FormItem>
              
              <FormControl class="w-full">
                <Input
                  required
                  type="text"
                  placeholder="Add Quentity"
                  v-model="quantity"
                  class="border border-blue-500 rounded-md px-3 py-2 bg-white "
                />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
       </div>
       <Button type="submit">Ok</Button>
    </form>
   
  </dialog> 
</template>



<style scoped>

</style>