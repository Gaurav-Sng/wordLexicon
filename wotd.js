//API CALL FOR FETCHING THE MEANING OF THE DATA AND IT'S PATS OF SPEECH
const fetchDefinition= async (word)=>{
    try{
    const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
   
    if(!response.ok){
         throw new Error("no data found");
    }
    
    const data= await response.json();
    const todaysword=document.querySelector('.todaysword');
    const existingWordInfo = document.querySelector('.worked');
    if (existingWordInfo) {
        todaysword.remove();
    }
    const div=document.createElement('div');
    div.classList.add('worked');
    
    //const exact=data.meaning.definitions.definition;
    data.forEach(entry => {
        let a=document.createElement('p');
        a.innerHTML=`<b>Word:</b>${word}`;
        div.appendChild(a);
        console.log(`word:${word}`);
        
        entry.meanings.forEach(meaning => {
        let b=document.createElement('p');
           b.innerHTML=`<b>Part of Speech:</b>${meaning.partOfSpeech}`;
           console.log(`Part of Speech:${meaning.partOfSpeech}`)
           div.appendChild(b);
         
    
          meaning.definitions.forEach(definition => {
           let c=document.createElement('p');
            c.innerHTML=`<b>Definition:</b> ${definition.definition}`;
            console.log(`Definition: ${definition.definition}`)
            div.appendChild(c);
           
            if (definition.example) {
                let d=document.createElement('p');
                d.innerHTML=`<b>Example:</b> ${definition.example}`;
                console.log(`Example: ${definition.example}`);
                div.appendChild(d);
              
            }
          });
        });
          
      });
    todaysword.append(div);
  // console.log(data);
   
     
    }catch(error){
        console.error(error);
alert('only 1 word per day for Word of the day.. Please try again later.');
    }

}


//random word generating API CALL
const fetchRandomWord = async () => {
      try {
          const val = await fetch(`https://random-word-api.herokuapp.com/word?number=1`);
          if (!val.ok) {
              throw new Error('Failed to fetch random word');
          }
           // const wordfortheday=document.querySelector('.todaysword');
          const data = await val.json();
          const randomWord = data[0];
        //   let p=document.createElement('p');
        //    p.innerHTML=`<b>Word:  </b>${randomWord}`;
        //   wordfortheday.append(p);
          console.log(`Random Word: ${randomWord}`);
          fetchDefinition(randomWord);
      } catch (error) {
          console.error(error);
          alert('Failed to fetch random word. Please try again later.');
      }
    }
    const wotd=document.querySelector('.wordbutton');
    wotd.addEventListener('click',function(){
        let wordfortheday=document.querySelector('.todaysword');
        wordfortheday.style.display="block";
        //if(wordfortheday.style.display=="none"){
        fetchRandomWord();
    })