<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
          <p class="mt-2 text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="font-medium text-rose-600 hover:text-rose-500">
              Sign in here
            </router-link>
          </p>
        </div>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <!-- Role Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">I want to:</label>
          <div class="grid grid-cols-1 gap-3">
            <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
              <input
                v-model="form.role"
                type="radio"
                value="client"
                class="sr-only"
              />
              <div class="flex flex-1">
                <div class="flex flex-col">
                  <span class="block text-sm font-medium text-gray-900">Advertise my business</span>
                  <span class="mt-1 flex items-center text-sm text-gray-500">Find and book advertising spaces</span>
                </div>
              </div>
              <CheckCircleIcon 
                :class="[
                  'h-5 w-5',
                  form.role === 'client' ? 'text-rose-600' : 'text-transparent'
                ]"
              />
            </label>

            <label class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
              <input
                v-model="form.role"
                type="radio"
                value="provider"
                class="sr-only"
              />
              <div class="flex flex-1">
                <div class="flex flex-col">
                  <span class="block text-sm font-medium text-gray-900">Rent my advertising space</span>
                  <span class="mt-1 flex items-center text-sm text-gray-500">List and manage media spaces</span>
                </div>
              </div>
              <CheckCircleIcon 
                :class="[
                  'h-5 w-5',
                  form.role === 'provider' ? 'text-rose-600' : 'text-transparent'
                ]"
              />
            </label>
          </div>
        </div>

        <div class="rounded-md shadow-sm space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="first-name" class="sr-only">First name</label>
              <input
                id="first-name"
                v-model="form.firstName"
                name="first-name"
                type="text"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
                placeholder="First name"
              />
            </div>
            <div>
              <label for="last-name" class="sr-only">Last name</label>
              <input
                id="last-name"
                v-model="form.lastName"
                name="last-name"
                type="text"
                required
                class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
                placeholder="Last name"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="Email address"
            />
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="sr-only">Phone number</label>
            <input
              id="phone"
              v-model="form.phone"
              name="phone"
              type="tel"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="Phone number"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="Password"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirm-password" class="sr-only">Confirm password</label>
            <input
              id="confirm-password"
              v-model="form.confirmPassword"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              class="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 text-sm"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <!-- Terms and Privacy -->
        <div class="flex items-center">
          <input
            id="agree-terms"
            v-model="form.agreeTerms"
            name="agree-terms"
            type="checkbox"
            required
            class="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
          />
          <label for="agree-terms" class="ml-2 block text-sm text-gray-900">
            I agree to the
            <a href="#" class="text-rose-600 hover:text-rose-500">Terms of Service</a>
            and
            <a href="#" class="text-rose-600 hover:text-rose-500">Privacy Policy</a>
          </label>
        </div>

        <!-- Password Strength Indicator -->
        <div v-if="form.password" class="space-y-2">
          <div class="text-sm text-gray-600">Password strength:</div>
          <div class="flex space-x-1">
            <div
              v-for="i in 4"
              :key="i"
              :class="[
                'h-2 flex-1 rounded',
                passwordStrength >= i ? strengthColors[passwordStrength] : 'bg-gray-200'
              ]"
            ></div>
          </div>
          <div class="text-xs text-gray-500">
            {{ strengthLabels[passwordStrength] }}
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </span>
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/counter'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const authStore = useAuthStore()
const { success, error } = useNotifications()

const form = ref({
  role: 'client',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const isLoading = ref(false)

const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z\d]/.test(password)) strength++
  
  return strength
})

const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400']
const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

const isFormValid = computed(() => {
  return form.value.role &&
         form.value.firstName &&
         form.value.lastName &&
         form.value.email &&
         form.value.phone &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         passwordStrength.value >= 2 &&
         form.value.agreeTerms
})

async function handleSubmit() {
  if (!isFormValid.value) return
  
  try {
    isLoading.value = true
    await authStore.register({
      role: form.value.role,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password
    })
    
    success('Welcome to MediaSpace!', 'Your account has been created successfully')
    router.push('/')
  } catch (err) {
    error('Registration Failed', err.message || 'Failed to create account')
  } finally {
    isLoading.value = false
  }
}
</script>
