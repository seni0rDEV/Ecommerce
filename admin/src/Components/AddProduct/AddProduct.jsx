import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'



const AddProduct = () => {
   



  const [image,setImage] = useState(false);

   const [productDetails,setProductDetails] = useState({
     name:"",
     image:"",
     category:"women",
     new_price:"",
     old_price:""
   })   

  const imageHandler = (e) => {
     setImage(e.target.files[0]); // set the image state to the selected file
  }

   const changeHandler = (e) =>{
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
   }

   const Add_product = async ()=>{
      
    
   


    console.log(productDetails);

    // logic to send data to backend that is "upload API/endpoint",generate image URl & save product in mongoDB 
     let responseData;
     let product = productDetails;

     let formData = new FormData(); // create a form data object
     formData.append('product',image); // append the image file to the form data

     // use fetch API to send the form data to the backend
     await fetch('http://localhost:4000/upload',{
      method: 'POST',
      //headers: {
      //  Accept: 'application/json',
      //},
      body:formData, // send the form data as the body
     }).then((resp)=>{ 
       // handle the response and get the image URL
       resp.json().then((data)=>{
         responseData=data;
         product.image = data.image_url; // set the product image to the URL
         console.log(responseData)
       })
     })

     // use fetch API to send the product data to the addproduct endpoint
    //  await fetch('http://localhost:4000/addproduct',{
    //   method: 'POST',
    //   headers: {
    //    'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product) // send the product data as a JSON string
    //  }).then((resp)=>{
    //    // handle the response and check the status
    //    resp.json().then((data)=>{
    //      if(data.success){
    //        alert("Product added");
    //      } 
    //      else {
    //        alert("Failed to add product");
    //      }
    //    })
    //  })
     
    await fetch('http://localhost:4000/addproduct',{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(product) // send the product data as a JSON string
     }).then((resp)=>{
       // handle the response and check the status
       if(resp.status === 200){
         // request was successful
         alert("Product added");
       } else {
         // request failed
         alert("Failed to add product");
       }
     })
   
   // if (responseData.success)
   // {
   //   product.image = responseData.image_url;
   //   console.log(responseData);
     

      
   //  }

  }
     
   
     
return (
  <div className='add-product'>
     <div className="addproduct-itemfield">
      <p>Product title</p>
      <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
     </div>
     <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here'/>
      </div> 
      <div className="addproduct-itemfield">
        <p>Offer price</p>
        <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here'/>
      </div>
     </div>
     <div className="addproduct_itemfield">
      <p>Product Category</p>
      <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kid</option>
      </select>
     </div>
     <div className="addproduct-itemfield">
      <label htmlFor="file-input">
         <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" /> 
      </label>
      <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
     </div>
     <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
  </div>
)
}

export default AddProduct