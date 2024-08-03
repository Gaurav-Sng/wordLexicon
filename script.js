let btn=document.querySelector('#searchbutton');
const input=document.getElementById('input');
const container=document.querySelector('.container');

const dict= async (word)=>{
    try{
   const val= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
   if(!val.ok){
    throw new console.error();
   }

   const data=await val.json();
   console.log(data);
   const existingWordInfo = document.querySelector('.wordinfo');
   if (existingWordInfo) {
       existingWordInfo.remove();
   }
   let wordinfo=document.createElement('div');
   wordinfo.classList.add('wordinfo');
   data.forEach(entry => {
    let a=document.createElement('p');
    a.innerHTML=`<b>Word</b>: ${entry.word}`;
    wordinfo.appendChild(a);
    
    entry.meanings.forEach(meaning => {
        let b=document.createElement('p');
        b.innerHTML=`<b>Part of Speech:</b>${meaning.partOfSpeech}`;
        wordinfo.appendChild(b);
     

      meaning.definitions.forEach(definition => {
        let c=document.createElement('p');
        c.innerHTML=`<b>Definition:</b> ${definition.definition}`;
        wordinfo.appendChild(c);
       
        if (definition.example) {
            let d=document.createElement('p');
            d.innerHTML=`<b>Example:</b> ${definition.example}`;
            wordinfo.appendChild(d);
          
        }
      });
    });
      
  });

// Append new results
container.append(wordinfo);
}


 catch (error) {
console.error(error);
alert('Failed to fetch data. Please try again later.');
}
 
}


btn.addEventListener('click',function(){
    if(input.value===""){
        alert("enter the word you are looking for");

    }
    const searchedword=input.value.trim();
    dict(searchedword);
})

