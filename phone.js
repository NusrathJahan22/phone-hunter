const loadphone= async(searchText , isShowAll) =>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data= await res.json();
    const phones=data.data
    // console.log(data)
    displayPhones(phones , isShowAll)
}
// loadphone();

const displayPhones= (phones , isShowAll)=>{
// console.log(phones)

const phoneContainer=document.getElementById('phone-container')
// clear phone container cards before addding new cards

phoneContainer.textContent= '';

// display show all button if there are more than 12 phones
const showAllContainer=document.getElementById('show-all-container')
if(phones.length>12 && !isShowAll){
showAllContainer.classList.remove('hidden')
}else{
  showAllContainer.classList.add('hidden')
}

// console.log('is show all' , isShowAll)
// displayPhones according to your wish
if(!isShowAll){
  phones= phones.slice(0,12)
}


phones.forEach(phone => {
    console.log(phone)
    //2..... create a div
    const phoneCard=document.createElement('div')
    phoneCard.classList=`card p-4 bg-base-100 shadow-xl`
    // 3..... set innerHTML
    phoneCard.innerHTML=`
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-end">
                        <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button> 
                      </div>
                    </div>
    `;
    //4..... append child
phoneContainer.appendChild(phoneCard)

});
// hide spinner
toggleLoadingSpinner(false);
}
// show details
const handelShowDetails=async(id) =>{
  // console.log('cilcked show details', id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data =await res.json()
  console.log(data)
  const phone =data.data
  showPhoneDetails(phone)
} 
// show details
const showPhoneDetails=(phone) =>{
  // console.log(phone)
  const phonename=document.getElementById('phone-name-show')
  phonename.innerText= phone.name;
  show_details_modal.showModal();
  const showDetailsContainer=document.getElementById('show-details-container')
  showDetailsContainer.innerHTML=`
  <img src="${phone.image}" alt =""/>
  <p><span>Storage:</span> ${phone.mainFeatures?.storage}</p>

  `
}

// handel search button

const handleSearch= (isShowAll) =>{
  toggleLoadingSpinner(true);
    const searchField=document.getElementById('search-field')
    const searchText=searchField.value;
    console.log(searchText);
    loadphone(searchText, isShowAll)
}

// spinner
const toggleLoadingSpinner= (isLoading) =>{
  const loadingSpinner=document.getElementById('loading-spinner')
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }else{
    loadingSpinner.classList.add('hidden')
  }
  
}
 
// handel showall
const handelShowAll=() => {
  handleSearch(true);
}
