<script lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button';

export default {
    setup() {
        const currentDate = ref('');
        const currentDay = ref('');
        const currentTime = ref('');

        const updateTime = () => {
            const now = new Date();
            currentDate.value = now.toLocaleDateString();
            currentDay.value = now.toLocaleDateString('en-US', { weekday: 'long' });
            currentTime.value = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        };

        onMounted(() => {
            updateTime(); // initial call
            setInterval(updateTime, 1000); // update every second
        });

        return { currentDate, currentDay, currentTime };
    },
};
</script>

<template>
    <div class="container">
        <h1 class="text-2xl font-bold">Add Attendance</h1>
        <div class="container w-[80%] ml-[10%] h-20 mt-8 rounded-lg border-2 border-purple-800/30 ">
            <div class="flex justify-between mt-6 ml-5 mr-5">
                <div>
                    <h1 class="text-xl font-semibold text-purple-800">{{ currentDate }}</h1>
                </div>
                <div>
                    <h1 class="text-xl font-semibold text-purple-800">{{ currentDay }}</h1>
                </div>
                <div>
                    <h1 class="text-xl font-semibold text-purple-800">{{ currentTime }}</h1>
                </div>
            </div>
        </div>
        <div>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Button
            </button>
        </div>
    </div>
</template>