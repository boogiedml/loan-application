<template>
  <div class="min-h-screen px-4 flex items-center justify-center">
    <div
      class="max-w-md w-full space-y-5 sm:space-y-8 max-sm:px-4 max-sm:py-10 sm:p-8 bg-white shadow-lg rounded-3xl"
    >
      <h2
        class="mt-6 text-center text-2xl md:text-3xl font-extrabold text-black"
      >
        Sign In
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignIn">
        <BaseInput
          v-model="email"
          id="email"
          label="Email"
          type="email"
          required
          placeholder="eg. example@email.com"
        />

        <BaseInput
          v-model="password"
          id="password"
          label="Password"
          type="password"
          required
          placeholder="********"
        />

        <div>
          <button
            type="submit"
            class="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-theme hover:bg-theme transition-all duration-300"
            :disabled="loading"
          >
            {{ loading ? "Please wait..." : "Sign In" }}
          </button>
        </div>
      </form>
      <p v-if="error" class="mt-2 text-center text-sm text-red-600">
        {{ error }}
      </p>
      <p class="mt-2 text-center text-sm text-gray-600">
        Don't have an account?
        <router-link to="/signup" class="font-medium text-theme"
          >Sign Up</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import BaseInput from "@/components/ui/BaseInput.vue";
import { startAutoLogout, getFriendlyErrorMessage } from "@/utils/helper";

export default {
  components: { BaseInput },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const loading = ref(false);

    onMounted(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        const now = Date.now();
        if (storedUser.expiryTime > now) {
          startAutoLogout(storedUser.expiryTime - now);
          router.push("/loan-application");
        } else {
          localStorage.removeItem("user");
        }
      }
    });

    const handleSignIn = async () => {
      loading.value = true;
      error.value = "";

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        const expiresIn =
          parseInt(userCredential._tokenResponse.expiresIn, 10) * 1000;
        const expiryTime = Date.now() + expiresIn;

        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          token: idToken,
          expiryTime,
          refreshToken: userCredential._tokenResponse.refreshToken,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        startAutoLogout(expiresIn);
        router.push("/loan-application");
      } catch (e) {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
        error.value = getFriendlyErrorMessage(e.message);
      } finally {
        loading.value = false;
      }
    };

    return { email, password, error, loading, handleSignIn };
  },
};
</script>
