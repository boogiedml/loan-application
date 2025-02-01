<template>
  <div class="min-h-screen bg-gray-100">
    <BaseNavbar />
    <div class="flex items-center justify-center min-h-screen pt-16">
      <div
        class="w-full sm:w-[90%] h-[80vh] space-y-5 sm:space-y-8 max-sm:px-4 max-sm:py-10 sm:p-8 bg-white shadow-lg rounded-3xl flex flex-col"
      >
        <h2
          class="mt-6 text-center text-2xl md:text-3xl font-extrabold text-black"
        >
          Loan History
        </h2>

        <div
          v-if="isLoading"
          class="text-center flex-grow flex items-center justify-center"
        >
          <BaseLoader />
        </div>
        <div v-else-if="loans.length === 0" class="text-center flex-grow flex items-center justify-center">
          <p class="text-xl font-semibold text-theme animate-pulse">No loans found.</p> 
        </div>
        <div v-else class="overflow-x-auto flex-grow">
          <table
            class="w-full border-collapse border border-gray-200 rounded-lg relative"
          >
            <thead class="min-w-[500px]">
              <tr class="bg-theme text-white">
                <th class="border border-gray-300 px-4 py-3 text-left text-nowrap">
                  Amount (₦)
                </th>
                <th class="border border-gray-300 px-4 py-3 text-left text-nowrap">
                  Purpose
                </th>
                <th class="border border-gray-300 px-4 py-3 text-left text-nowrap">
                  Term (months)
                </th>
              </tr>
            </thead>
            <tbody class="overflow-y-auto">
              <tr
                v-for="loan in loans"
                :key="loan.id"
                class="hover:bg-gray-100"
              >
                <td class="border border-gray-300 px-4 py-3">
                  {{ loan.amount.toFixed(2) }}
                </td>
                <td class="border border-gray-300 px-4 py-3 capitalize">
                  {{ loan.purpose }}
                </td>
                <td class="border border-gray-300 px-4 py-3">
                  {{ loan.termInMonths }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BaseNavbar from "@/components/ui/BaseNavbar.vue";
import BaseLoader from "./ui/BaseLoader.vue";

export default {
  components: { BaseNavbar, BaseLoader },
  setup() {
    const loans = ref([]);
    const isLoading = ref(true);
    const currentUserId = ref(null);

    const fetchLoans = async (userId) => {
      try {
        const token = await auth.currentUser?.getIdToken();
        const response = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/loans?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          loans.value = await response.json();
        } else {
          throw new Error("Failed to fetch loans");
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          currentUserId.value = user.uid;
          fetchLoans(user.uid);
        } else {
          isLoading.value = false;
        }
      });
    });

    return { loans, isLoading, currentUserId };
  },
};
</script>
