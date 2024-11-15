export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchProductsById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/products/'+id);
    const data = await response.json();
    resolve({ data });
  });
} 


export function fetchProductsByFilters(filter, sort, pagination) {
  //TODO: Multiple Select Categories from backend
  let queryString="";
  for(let key in filter) {
    const categoryValues=filter[key];
    if(categoryValues.length){
      queryString+= categoryValues.map((value)=> `${key}=${value}`).join("&")+"&"
    }
  }
for(let key in sort){
  queryString += `${key}=${sort[key]}&`
}

for(let key in pagination){
  queryString += `${key}=${pagination[key]}&`
}


  return new Promise(async (resolve) => {
    const response = await fetch(
      'http://localhost:3001/products?'+ queryString
    );
    const data = await response.json();
    
    const filteredData = filter.brand && filter.brand.length? data.filter((product)=>(
      filter.brand.includes(product.brand)
    )): data;
    const totalItems = 100
    resolve({ data: { products: filteredData , totalItems:totalItems} });
  });
}


export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/brands');
    const data = await response.json();
    resolve({ data });
  });
}



export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:3001/categories');
    const data = await response.json();
    resolve({ data });
  });
}