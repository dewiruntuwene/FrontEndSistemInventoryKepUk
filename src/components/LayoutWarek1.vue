<script  lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  name: string;
  email: string;
  role: string; 
}

export default defineComponent({
  name: "UserProfile",
  setup() {
    const userName = ref("");
    const userRole = ref("");

    const router = useRouter();

    const decodeToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          userName.value = decoded.name;
          userRole.value = decoded.role;
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    const onFileChange = (event: Event) => {
      // kode untuk mengubah gambar profil dari file yang diunggah
    };

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };

    onMounted(() => {
      decodeToken();
    });

    return {
      userRole,
      userName,
      onFileChange,
    };
  },
});
</script>

<template>
  <div class="mx-auto max-w-1400 h-1531">
    <div class="sm:flex sm:w-full flex-col p-4">
      <!-- Header -->

      <div class="flex md:hidden">
        <button id="hamburger">
          <img
            class="toggle block"
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
          />
          <img
            class="toggle hidden"
            src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
          />
        </button>
      </div>

      <div>
        <!-- Sidenav -->

        <nav
          id="sidenav-8"
          class="lg:left-0 left-[-300px] fixed top-0 left-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white-400 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-slate-200"
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-position="absolute"
          data-te-sidenav-accordion="true"
        >
          <a
            class="mb-3 flex space-x-3 ml-7 border-b-2 border-solid border-gray-100 py-6 outline-none"
            href="#!"
          >
            <div
              class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
            >
              <svg
                class="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>

            <div class="">
              <span>{{ userName }}</span>
              <p class="text-xs text-slate-500">{{ userRole }}</p>
            </div>

            <div class="active:shadow-lg hidden" onclick="Open()">
              <svg
                class="h-7 w-7 text-black"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </a>
          <ul
            class="relative m-0 list-none px-[0.2rem] pb-12"
            data-te-sidenav-menu-ref
          >
           
           <li class="relative pt-4">
              <a
                class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span class="mr-4">
                  <!-- Icon SVG yang ditambahkan -->
                  <svg
                    class="h-6 w-6 text-slate-900"
                    width="24"
                    hei ght="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="13" r="2" />
                    <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                    <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                  </svg>
                  <!-- Akhir dari Icon SVG yang ditambahkan -->
                </span>
                <span>
                  <router-link to="/DetailPreOrderBarangWarek1"> Pre Order Barang </router-link>
                </span>
              </a>
            </li>


            <li class="relative pt-4">
              <a
                class="flex cursor-pointer items-center truncate rounded-[5px] py-[0.45rem] px-6 text-[0.85rem] text-natural-900 outline-none transition duration-300 ease-linear hover:bg-natural-900 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-natural-900 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span class="mr-4">
                  <!-- Icon SVG yang ditambahkan -->
                  <svg
                    class="h-6 w-6 text-slate-900"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="12" cy="13" r="2" />
                    <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
                    <path d="M6.4 20a9 9 0 1 1 11.2 0Z" />
                  </svg>
                  <!-- Akhir dari Icon SVG yang ditambahkan -->
                </span>
                <span>
                  <router-link to="/TrackTransactionWarek1"> Track Transaction </router-link>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <RouterView />
</template>
