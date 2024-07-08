<template>
  <div class="container mt-5">
    <div class="row">
      
      <div v-for="(item, index) in section?.field" :key="item.id" class="col-md-6">
        <div class="row">

          <div v-if="item.category == 'single' && item.type == 'numeric' && item.active == 1" class="col-md-12">
            <div class="form-group">
              <label for="my-input">{{item.title}}</label>
              <input id="my-input" class="form-control" 
              @change="setData($event.target.value,item,item.id)" 
              @keyup="validation($event.target.value,checkValidate(item),item.title)" type="text" name="">
            </div>
          </div>

          <div v-if="item.category == 'select' && item.active == 1" class="col-md-12">
            <div class="form-group">
              <div class="form-group">
                <label for="my-select">{{item.title}}</label>
                <select id="my-select" class="form-control" 
                @change="setData($event.target.value,item,item.id)" 
                @keyup="validation($event.target.value,checkValidate(item),item.title)">
                  <option v-for="(data, index) in item.data" :key="index">{{data}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      
      </div>

      
      <!-- <div class="col-md-6">
        <SelectInput
          label="عمر ساختمان"
          selectId="buildingLife"
          :options="buildingLifeOptions"
          v-model="buildingLife"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-6">
        <SelectInput
          label="تعداد طبقات"
          selectId="numberOfFloors"
          :options="numberOfFloorsOptions"
          v-model="numberOfFloors"
        />
      </div>
      <div class="col-md-6">
        <SelectInput
          label="موقعیت طبقه"
          selectId="floorLocation"
          :options="floorLocationOptions"
          v-model="floorLocation"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-6">
        <number
          label="تعداد واحدهای ساختمان"
          inputId="buildingUnits"
          v-model="buildingUnits"
          :validations="numValidations"
        />
      </div>
      <div class="col-md-6">
        <SelectInput
          label="تعداد اتاق"
          selectId="numberOfRooms"
          :options="numberOfRoomsOptions"
          v-model="numberOfRooms"
        />
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-6">
        <number
          label="سال ساخت"
          inputId="yearOfConstruction"
          v-model="yearOfConstruction"
          :validations="numberValidations"
        />
      </div>-->
    </div> 
  </div>
</template>

<script setup>
import { ref } from "vue";
let prop = defineProps(['section']);
const section = toRefs(prop).section?.value;
console.log(section);

const FormData = ref({
  "title": 'asasasa',
  "description": "wefwefwefewf",
  "attachments": [],
  "pricing": {},
  "post_pricing": {},
  "gallery": [],
  "address": {},
  "data_sections": [],
});

const setData = (data,section,id) => {
  
  FormData.value.data_sections[id] = {
    field : section,
    data:[data],
    field_id:id
  } ;
  
  console.log(FormData.value);
}

const checkValidate = (item) => {
  $arrayValidate = [];
    if(item.required){
      $arrayValidate.push('required');
    }
    if(item.min){
      $arrayValidate.push({min:item.min});
    }
    if(item.max){
      $arrayValidate.push({max:item.max});
    }
    if(item.type){
      $arrayValidate.push(item.type);
    }
}
</script>
