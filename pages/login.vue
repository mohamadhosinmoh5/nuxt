<template>
   
        <div class="row" :style="!auth.sendingSms ? `display:block;` : 'display:none;'">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-check">
                  <input id="my-input" class="form-check-input"  v-model="mobile" >
                  <label for="my-input" class="form-check-label">mobile</label>
                </div>
              </div>
    
              <button type="submit" @click="auth.sendSms(mobile)" class="btn btn-danger">send mobile</button>
            </div>
          </div>
    
          <button class="btn btn-danger" @click="setQuery('page',5)">click</button>
          <!-- <button class="btn btn-danger" @click="setQuery()">click</button> -->
          
          <div class="row" :style="auth.sendingSms ? `display:block` : 'display:none;'">
                <div class="form-check">
                  <input id="my-input" class="form-check-input" v-model="code" >
                  <label for="my-input" class="form-check-label">code tayid</label>
                </div>
    
                <button type="submit" @click="auth.login(code,mobile)" class="btn btn-danger">send code</button>
          </div>
    
</template>

<script setup>
import { useAuthStore } from '../store/auth';
const auth = useAuthStore();


</script>