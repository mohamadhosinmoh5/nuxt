<template>
  <div class="col-sm-12">
    <h5 class="category-box">فیلتر ها</h5>
    <div class="row">
      <!-- Start section Filter -->
      <div class="col-sm-12">
        <div class="row">
          <div class="col-sm-12">
            <p class="filter-Title">قیمت</p>
          </div>
          <div class="row">
            <div class="col-6">

              <div class="form-group">
                <input id="my-input" class="form-control" type="text"
                  @input="sectionQuery({ field_id: 18, type: 'numeric', inputName: 'Price' })" v-model="minPrice">
              </div>
            </div>

            <div class="col-6">
              <div class="form-group">
                <input id="my-input" class="form-control" type="text"
                  @input="sectionQuery({ field_id: 18, type: 'numeric', inputName: 'Price' })" v-model="maxPrice">
              </div>
            </div>
          </div>
          <div class="col-sm-12 mt-4">
            <section class="range-slider">
              <div class="range-input">
                <input type="range" class="min" min="0" max="100000000000" v-model="minPrice"
                  @input="sectionQuery({ field_id: 18, type: 'numeric', inputName: 'Price' })" step="200000000">
                <input type="range" class="max" min="0" max="100000000000" v-model="maxPrice"
                  @input="sectionQuery({ field_id: 18, type: 'numeric', inputName: 'Price' })" step="200000000">
              </div>
            </section>

            <div class="row">
              <div class="col-sm-6 mt-3">
                <div class="data-box">{{ persionNumber(minPrice) }}</div>
              </div>
              <div class="col-sm-6 mt-3">
                <div class="data-box">{{ persionNumber(maxPrice) }}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="col-sm-12 mt-4">
        <div class="row">
          <div class="col-sm-12">
            <p class="filter-Title">متراژ</p>
          </div>
          <div class="row">
            <div class="col-6">

              <div class="form-group">
                <input id="my-input" class="form-control" type="text"
                  @input="sectionQuery({ field_id: 3, type: 'numeric', inputName: 'Metr' })" v-model="minMetr">
                <span class="labalMetr">
                  متر
                </span>
              </div>
            </div>

            <div class="col-6">
              <div class="form-group">
                <input id="my-input" class="form-control" type="text"
                  @input="sectionQuery({ field_id: 3, type: 'numeric', inputName: 'Metr' })" v-model="maxMetr">
                <span class="labalMetr">
                  متر
                </span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 mt-2">
            <section class="range-slider">
              <div class="range-input">
                <input type="range" class="min" min="0" max="500" v-model="minMetr"
                  @input="sectionQuery({ field_id: 3, type: 'numeric', inputName: 'Metr' })" step="10">
                <input type="range" class="max" min="0" max="500" v-model="maxMetr"
                  @input="sectionQuery({ field_id: 3, type: 'numeric', inputName: 'Metr' })" step="10">
              </div>
            </section>

          </div>
        </div>
      </div>

      <div class="col-sm-12 mt-4">
        <div class="row">
          <div class="col-sm-12">
            <p class="filter-Title">تعداد واحد ساختمان</p>
          </div>
          <div class="row">
            <div class="col-6">

              <div class="form-group">
                <input id="my-input" class="form-control" type="text"
                  @input="sectionQuery({ field_id: 8, type: 'numeric', inputName: 'Metr' })" v-model="minSection">
                <span class="labalMetr">
                  واحد
                </span>
              </div>
            </div>

            <div class="col-6">
              <div class="form-group">
                <input id="my-input" class="form-control" type="text"
                  @input="sectionQuery({ field_id: 8, type: 'numeric', inputName: 'Metr' })" v-model="maxSection">
                <span class="labalMetr">
                  واحد
                </span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 mt-2">
            <section class="range-slider">
              <div class="range-input">
                <input type="range" class="min" min="0" max="100" v-model="minSection"
                  @input="sectionQuery({ field_id: 8, type: 'numeric', inputName: 'Metr' })" step="1">
                <input type="range" class="max" min="0" max="100" v-model="maxSection"
                  @input="sectionQuery({ field_id: 8, type: 'numeric', inputName: 'Metr' })" step="1">
              </div>
            </section>
          </div>
        </div>
      </div>

      <div class="col-sm-12 mt-4">
        <div class="form-group">
          <label class="filter-Title" for="my-select">عمر ساختمان</label>
          <select v-model="ageText" @change="sectionQuery({ field_id: 5, category: 'select', value: ageText })"
            id="my-select" class="custom-select mt-3" name="">
            <option value="">بدون فیلتر</option>
            <option value="نوساز">نوساز</option>
            <option value="کمتر از 5 سال">کمتر از 5 سال</option>
            <option value="بین 5 تا 10 سال">بین 5 تا 10 سال</option>
            <option value="بیش از 10 سال">بیش از 10 سال</option>
          </select>
        </div>
      </div>

      <div class="col-sm-12 mt-4">
        <div class="form-group">
          <label class="filter-Title" for="my-select"> موقعیت طبقه</label>
          <select v-model="position" @change="sectionQuery({ field_id: 7, category: 'select', value: position })"
            id="my-select" class="custom-select mt-3" name="">
            <option value=""> همه طبقات</option>
            <option value="اول"> اول</option>
            <option value="دوم"> دوم</option>
            <option value="سوم"> سوم</option>
            <option value="چهارم"> چهارم</option>
            <option value="پنچم"> پنچم</option>
            <option value="ششم"> ششم</option>
            <option value="هفتم"> هفتم</option>
            <option value="هشتم"> هشتم</option>
            <option value="نهم"> نهم</option>
            <option value="دهم"> دهم</option>

          </select>
        </div>
      </div>

      <div class="col-sm-12 mt-4">
        <div class="custom-control custom-switch " dir="rtl">
          <label for="my-input" class="custom-control-label ml-4 filter-Title">آسانسور</label>
          <input id="my-input" v-model="elevator" class="custom-control-input mr=3"
            @change="sectionQuery({ field_id: 13, category: 'switch', value: elevator })" type="checkbox" name="">
        </div>
      </div>

      <div class="col-sm-12 mt-4">
        <div class="custom-control custom-switch " dir="rtl">
          <label for="my-input" class="custom-control-label ml-4 filter-Title">پارکینگ</label>
          <input id="my-input" v-model="parking" class="custom-control-input mr=3"
            @change="sectionQuery({ field_id: 14, category: 'switch', value: parking })" type="checkbox" name="">
        </div>
      </div>
      <!-- end sectionFilter -->
      <div class="row">
        <div class="col-12 mb-4">
          <button class="btn-default w-50" @click="filterUptaded(query, true)">اعمال فیلتر</button>
          <button ref="filterCanvas" class="btn-default-two w-30" @click="filterUptaded(query, true)">
            <i class="fas fa-window-close mt-2"></i>
            بیخیال
          </button>

        </div>

        <div v-if="prop.status" class="col-2">
          <div class="spinner-border mt-4" role="status"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Num2persian from 'num2persian';
import { useNoticeStore } from '../store/notice';
const query = ref([]);
const sectionData = ref({});
const rangeVal = ref([]);
const minPrice = ref(0);
const maxPrice = ref(100000000000);
const minMetr = ref(0);
const maxMetr = ref(500);
const minSection = ref(0);
const maxSection = ref(100);
const ageText = ref("کمتر از 5 سال");
const position = ref("اول");
const elevator = ref(false);
const parking = ref(false);
const pending = ref(false);


const notices = useNoticeStore();
let prop = defineProps(['status']);

const emit = defineEmits(['clicked'])
// const emit = defineEmits(['closed'])

const filterUptaded = (query, section) => {
  emit('clicked', query, section)
}
// const closeFilter = (query) => {
//   emit('closed', query)
// }
const persionNumber = (number) => {
  return Num2persian(number);
}

const sectionQuery = ({ key = null, value = null, type = null, field_id = null, category = null, inputName = null }) => {
  if (type == 'numeric') {

    query.value[field_id] = {
      'type': 'numeric',
      'field_id': field_id,
      'category': 'single',
      'min': (rangeVal.value[`min${inputName}`]) ? rangeVal.value[`min${inputName}`] : null,
      'max': (rangeVal.value[`max${inputName}`]) ? rangeVal.value[`max${inputName}`] : null
    };

  } else {
    query.value[field_id] = {
      'type': type,
      'field_id': field_id,
      'category': category,
      'value': value
    };
  }
}

const addQuery = (key, value) => {
  query.value[key] = value;
}



watch(minPrice, (value) => {
  rangeVal.value['minPrice'] = value;
})
watch(maxPrice, (value) => {
  rangeVal.value['maxPrice'] = value;
})
watch(minMetr, (value) => {
  rangeVal.value['minMetr'] = value;
})
watch(maxMetr, (value) => {
  rangeVal.value['maxMetr'] = value;
})

</script>