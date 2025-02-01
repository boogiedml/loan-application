<template>
  <nav class="bg-white shadow-md py-4 px-4 fixed top-0 left-0 w-full">
    <div class="w-full sm:w-[90%] mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold text-black">Loan</h1>
      <div class="flex items-center space-x-4">
        <router-link
          v-if="route.path === '/loan-history'"
          to="/loan-application"
          class="font-medium text-theme text-sm"
        >
          Loan Application
        </router-link>
        <router-link
          v-else
          to="/loan-history"
          class="font-medium text-theme text-sm"
        >
          Loan History
        </router-link>

        <button
          type="button"
          class="w-fit py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-theme hover:bg-theme transition-all duration-300"
          @click="signOut"
        >
          Log Out
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRoute, useRouter } from "vue-router";

export default {
  name: "BaseNavbar",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const signOut = () => {
      localStorage.removeItem("user");
      router.push("/signin");
    };

    return { route, signOut };
  },
};
</script>
