<template>
  <div
    class="min-h-screen px-4 flex items-center justify-center"
  >
    <div
      class="max-w-md w-full space-y-5 sm:space-y-8 max-sm:px-4 max-sm:py-10 sm:p-8 bg-white shadow-lg rounded-3xl"
    >
      <h2
        class="mt-6 text-center text-2xl md:text-3xl font-extrabold text-black"
      >
        Sign Up
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <BaseInput
          v-model="fullName"
          id="fullName"
          label="Full Name"
          type="text"
          required
          placeholder="eg. John Doe"
        />

        <BaseInput
          v-model="email"
          id="email"
          label="Email Address"
          type="email"
          autocomplete="email"
          required
          placeholder="eg. example@email.com"
        />

        <BaseInput
          v-model="password"
          id="password"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="********"
        />

        <div>
          <button
            type="submit"
            class="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-theme hover:bg-theme transition-all duration-300"
          >
            {{ loading ? "Please wait..." : "Sign Up" }}
          </button>
        </div>
      </form>
      <p v-if="error" class="mt-2 text-center text-sm text-red-600">
        {{ error }}
      </p>
      <p class="mt-2 text-center text-sm text-gray-600">
        Already have an account?
        <router-link
          to="/signin"
          class="font-medium text-theme"
          >Sign In</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import BaseInput from "@/components/ui/BaseInput.vue";
import { getFriendlyErrorMessage } from "@/utils/helper";

export default {
  components: { BaseInput },
  setup() {
    const router = useRouter();
    const fullName = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);

    const handleSignUp = async () => {
      loading.value = true;
      error.value = "";

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        await updateProfile(userCredential.user, {
          displayName: fullName.value,
        });
        router.push("/loan-application");
      } catch (e) {
        error.value = getFriendlyErrorMessage(e.message);
      } finally {
        loading.value = false;
      }
    };

    return { fullName, email, password, error, loading, handleSignUp };
  },
};
</script>
