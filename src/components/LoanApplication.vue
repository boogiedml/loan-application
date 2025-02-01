<template>
  <div class="min-h-screen bg-gray-100">
    <BaseNavbar />
    <div class="px-4 flex items-center justify-center min-h-screen pt-16 pb-20">
      <div
        class="max-w-md w-full space-y-5 sm:space-y-8 max-sm:px-4 max-sm:py-10 sm:p-8 bg-white shadow-lg rounded-3xl"
      >
        <h2
          class="mt-6 text-center text-2xl md:text-3xl font-extrabold text-black"
        >
          Loan Application
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <BaseInput
            v-model="amount"
            id="amount"
            label="Loan Amount"
            type="number"
            required
          />

          <BaseSelect
            v-model="purpose"
            id="purpose"
            label="Loan Purpose"
            :options="loanPurposes"
            required
          />

          <BaseInput
            v-model="term"
            id="term"
            label="Loan Term (months)"
            type="number"
            required
          />

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-theme hover:bg-theme transition-all duration-300"
          >
            {{ isLoading ? "Submitting..." : "Apply for Loan" }}
          </button>
        </form>

        <p
          v-if="message"
          :class="[
            'mt-2 text-sm',
            message.type === 'error' ? 'text-red-600' : 'text-green-600',
          ]"
        >
          {{ message.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/services/firebase";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseNavbar from "./ui/BaseNavbar.vue";

export default {
  components: { BaseInput, BaseSelect, BaseNavbar },
  setup() {
    const amount = ref("");
    const purpose = ref("");
    const term = ref("");
    const isLoading = ref(false);
    const message = ref(null);

    const loanPurposes = ref([
      { value: "home", label: "Home" },
      { value: "car", label: "Car" },
      { value: "business", label: "Business" },
      { value: "education", label: "Education" },
      { value: "medical", label: "Medical Expenses" },
      { value: "debt", label: "Debt Consolidation" },
      { value: "vacation", label: "Vacation" },
      { value: "wedding", label: "Wedding" },
      { value: "renovation", label: "Renovation" },
      { value: "personal", label: "Personal Expenses" },
    ]);

    const handleSubmit = async () => {
      isLoading.value = true;
      message.value = null;

      try {
        const token = await auth.currentUser.getIdToken();
        const currentUserId = auth.currentUser.uid;
        const response = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/loans`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: parseFloat(amount.value),
              purpose: purpose.value,
              termInMonths: parseInt(term.value),
              userId: currentUserId,
            }),
          }
        );

        if (response.ok) {
          message.value = {
            type: "success",
            text: "Loan application submitted successfully!",
          };
          amount.value = "";
          purpose.value = "";
          term.value = "";
        } else {
          throw new Error("Failed to submit loan application");
        }
      } catch (error) {
        message.value = { type: "error", text: error.message };
      } finally {
        isLoading.value = false;
      }
    };

    return {
      amount,
      purpose,
      term,
      isLoading,
      message,
      loanPurposes,
      handleSubmit,
    };
  },
};
</script>
