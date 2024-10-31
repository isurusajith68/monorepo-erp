<script setup lang="ts">
import { RouterView } from 'vue-router';

import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from 'lucide-vue-next';



import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { FaUser } from 'react-icons/fa'
</script>

<template>
  <header class="sticky top-0 z-50 flex h-14 items-center gap-4 border-b backdrop-blur-md px-4 lg:h-[60px] lg:px-6 bg-blue-400">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" ></Menu>
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <nav class="grid gap-2 text-lg font-medium">
          <RouterLink 
            to="#" 
            class="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </RouterLink>
          <RouterLink 
            to="/" 
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <HomeIcon class="h-5 w-5" />
            Dashboard
          </RouterLink>
          <RouterLink 
            to="/orders" 
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          >
            <ShoppingCart class="h-5 w-5" />
            Orders
            <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
          </RouterLink>
          <RouterLink 
            to="/products" 
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package class="h-5 w-5" />
            Products
          </RouterLink>
          <RouterLink 
            to="/customers" 
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Users class="h-5 w-5" />
            Customers
          </RouterLink>
          <RouterLink 
            to="/analytics" 
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <LineChart class="h-5 w-5" />
            Analytics
          </RouterLink>
        </nav>
      </SheetContent>
    </Sheet>

    <div class="w-full flex-1"></div>
    
    <div class="flex space-x-4 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button class="focus:outline-none bg-white p-2 rounded-full mr-2">
            <CircleUser class="text-black w-6 h-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent class="p-4 w-28">
          <div class="flex flex-col gap-2">
            <Button variant="ghost" class="w-full text-left">Profile</Button>
            <Button variant="ghost" class="w-full text-left">Settings</Button>
            <Button variant="ghost" class="w-full text-left">Logout</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </header>
  
  <RouterView />
</template>