<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-3 focus:outline-none focus:ring-theme focus:border-theme text-sm transition-all duration-300"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    id: String,
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
};
</script>
