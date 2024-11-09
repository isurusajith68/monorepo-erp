<!-- App.vue -->
<script setup>
import Button from '@/components/ui/button/Button.vue';
import { useForm } from '@tanstack/vue-form'

const form = useForm({
  defaultValues: {
    fullName: '',
  },
  onSubmit: async ({ value }) => {
    // Do something with form data
    console.log(value)
  },
})
</script>

<template>
  <div>
    <Button>hello</Button>
    <form @submit="
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }
    ">
      <div>
        <form.Field name="fullName">
          <template v-slot="{ field }">
            <input
              :name="field.name"
              :value="field.state.value"
              @blur="field.handleBlur"
              @input="(e) => field.handleChange(e.target.value)"
            />
          </template>
        </form.Field>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>