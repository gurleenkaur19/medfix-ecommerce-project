export const navOptions = [
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "baby-care",
    label: "Baby Care",
    path: "/product/listing/baby-care",
  },
  {
    id: "test-kit",
    label: "Test Kit",
    path: "/product/listing/test-kit",
  },
  {
    id: "beauty",
    label: "Beauty",
    path: "/product/listing/beauty",
  },
  {
    id: "medicine",
    label: "Medicine",
    path: "/product/listing/medicine",
  },
];

export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "input",
  },
  {
    id: "role",
    label: "Role",
    type: "",
    placeholder: "",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "Customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "test-kit",
        label: "Test Kit",
      },
      {
        id: "beauty",
        label: "Beauty",
      },
      {
        id: "baby-care",
        label: "Baby Care",
      },
      {
        id: "medicine",
        label: "Medicine",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
];

export const AvailablePackaging = [
  {
    id: "P1",
    label: "1 Package",
  },
  {
    id: "P2",
    label: "2 Packages",
  },
  {
    id: "set",
    label: "Set",
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyD28lApmAS2w7MhwcQQ7G3jj-DvOf4ItlY",
  authDomain: "medportal-e-commerce-project.firebaseapp.com",
  projectId: "medportal-e-commerce-project",
  storageBucket: "medportal-e-commerce-project.appspot.com",
  messagingSenderId: "100097169552",
  appId: "1:100097169552:web:cca39750ef10fb75d46015",
};

export const firebaseStorageURL =
  "gs://medportal-e-commerce-project.appspot.com";

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
];
