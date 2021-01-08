<template lang="">
  <w-card title="Edit Pizza" title-class="blue-light5--bg"> <w-form
  @submit.prevent="updatePizza"> <w-input label="ID" id="id" name="id" v-model="pizza.id"
  :validators="[validators.required]"> </w-input> <w-input label="Name" id="name"
  name="name" v-model="pizza.name" :validators="[validators.required]"> </w-input>
  <w-input label="Description" id="description" name="description"
  v-model="pizza.description" :validators="[validators.required]"> </w-input> <w-input
  label="Vegan" id="vegan" name="vegan" v-model="pizza.vegan" > </w-input> <w-input
  label="Size" id="size1" name="size" v-model="pizza.options[0].size"
  :validators="[validators.required]"> </w-input> <w-input label="Price" id="price1"
  name="price1" v-model="pizza.options[0].price" :validators="[validators.required]">
  </w-input> <w-input label="Size" id="size2" value="40 cm" name="size2"
  v-model="pizza.options[1].size" :validators="[validators.required]"> </w-input> <w-input
  label="Price" id="price2" name="price2" v-model="pizza.options[1].price"
  :validators="[validators.required]"> </w-input> <w-button type="submit"
  bg-color="success">Update</w-button><w-button bg-color="orange" style="margin-left:10px"
  @click="$router.push('/pizza-menu')">Cancel</w-button> </w-form></w-card>
</template>
<script>
import pizzaService from "../services/pizza.service";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    const validators = {
      required: (value) => !!value || "This field is required",
    };

    const pizza = ref({
      id: "",
      name: "",
      description: "",
      vegan: "",
      options: [
        { size: "", price: "" },
        { size: "", price: "" },
      ],
    });
    const id = route.params.id;

    onMounted(async () => {
      await pizzaService
        .getPizza(id)
        .then((response) => response.json())
        .then((data) => {
          pizza.value = data;
        })
        .catch(function (error) {
          console.log("Found error: \n", error);
        });
    });

    const updatePizza = () => {
      pizzaService.updatePizza(id, pizza.value);
      router.push("/pizza-menu");
    };

    return {
      validators,
      updatePizza,
      pizza,
    };
  },
};
</script>
<style lang=""></style>
