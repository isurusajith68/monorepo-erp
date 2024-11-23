<script setup>
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
</script>


<template>
    <div>
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
    </div>
</template>



<style lang="scss" scoped>

</style>