const cricketQuiz = [
  {
    question: "Who is known as the 'God of Cricket'?",
    options: ["Virat Kohli", "Ricky Ponting", "Sachin Tendulkar", "Brian Lara"],
    answer: "Sachin Tendulkar"
  },
  {
    question: "Which country won the first ICC Cricket World Cup in 1975?",
    options: ["India", "Australia", "West Indies", "England"],
    answer: "West Indies"
  },
  {
    question: "Who was the captain of India when they won the 2011 World Cup?",
    options: ["Sourav Ganguly", "MS Dhoni", "Virat Kohli", "Rahul Dravid"],
    answer: "MS Dhoni"
  },
  {
    question: "Which bowler has taken the most wickets in Test cricket?",
    options: ["Muttiah Muralitharan", "Shane Warne", "James Anderson", "Anil Kumble"],
    answer: "Muttiah Muralitharan"
  },
  {
    question: "Who scored the first double century in ODI cricket?",
    options: ["Rohit Sharma", "Sachin Tendulkar", "Virender Sehwag", "Chris Gayle"],
    answer: "Sachin Tendulkar"
  },
  {
    question: "Which Indian player is nicknamed 'Hitman'?",
    options: ["KL Rahul", "Rohit Sharma", "Hardik Pandya", "Shikhar Dhawan"],
    answer: "Rohit Sharma"
  },
  {
    question: "Where is the headquarters of the International Cricket Council (ICC)?",
    options: ["London", "Dubai", "Melbourne", "Sydney"],
    answer: "Dubai"
  },
  {
    question: "Which country hosts the Big Bash League?",
    options: ["India", "England", "Australia", "South Africa"],
    answer: "Australia"
  },
  {
    question: "Who hit six sixes in one over in a T20 World Cup match?",
    options: ["Chris Gayle", "Yuvraj Singh", "Kieron Pollard", "Andre Russell"],
    answer: "Yuvraj Singh"
  },
  {
    question: "Which player has scored the most runs in international cricket?",
    options: ["Ricky Ponting", "Virat Kohli", "Sachin Tendulkar", "Kumar Sangakkara"],
    answer: "Sachin Tendulkar"
  },
  {
    question: "In which year did India win its first Cricket World Cup?",
    options: ["1979", "1983", "1987", "1992"],
    answer: "1983"
  },
  {
    question: "Which Indian fast bowler is known as the 'Yorker King'?",
    options: ["Bhuvneshwar Kumar", "Jasprit Bumrah", "Ishant Sharma", "Mohammed Shami"],
    answer: "Jasprit Bumrah"
  },
  {
    question: "Which format of cricket is played for 5 days?",
    options: ["ODI", "Test", "T20", "Super Over"],
    answer: "Test"
  },
  {
    question: "Who was the first Indian batsman to score a triple century in Tests?",
    options: ["Sachin Tendulkar", "Virender Sehwag", "Sunil Gavaskar", "Rahul Dravid"],
    answer: "Virender Sehwag"
  },
  {
    question: "Who is the only player to play 200 Test matches?",
    options: ["Ricky Ponting", "Jacques Kallis", "Sachin Tendulkar", "Rahul Dravid"],
    answer: "Sachin Tendulkar"
  },
  {
    question: "What is the maximum number of overs per bowler in a 50-over match?",
    options: ["5", "10", "15", "20"],
    answer: "10"
  },
  {
    question: "Which country is known as the 'Black Caps'?",
    options: ["England", "South Africa", "New Zealand", "West Indies"],
    answer: "New Zealand"
  },
  {
    question: "Who was the first batsman to hit 6 sixes in an over in international cricket?",
    options: ["Yuvraj Singh", "Gary Sobers", "Herschelle Gibbs", "Chris Gayle"],
    answer: "Herschelle Gibbs"
  },
  {
    question: "Which Indian cricketer is known for the 'Helicopter Shot'?",
    options: ["Rohit Sharma", "Suresh Raina", "MS Dhoni", "Virat Kohli"],
    answer: "MS Dhoni"
  },
  {
    question: "What is the name of the trophy awarded in Test series between India and Australia?",
    options: ["Gavaskar–Border Trophy", "Border–Gavaskar Trophy", "Ashes Trophy", "Freedom Trophy"],
    answer: "Border–Gavaskar Trophy"
  }
];

function generate(){
    // const ques= new Set();
    // while(ques.size<5){
    //     const idx= Math.floor(Math.random()*cricketQuiz.length);
    //     ques.add(cricketQuiz[idx]);
    // }
    // return [...ques];

    //now better way

    // cricketQuiz.sort(()=>Math.random()-0.5);
    //   return cricketQuiz.slice(0,5);

    //Fiser Algorithm

    let arr=[];
    let lastidx=cricketQuiz.length-1;
    let n=5;
    while(n--){
      let idx=Math.floor(Math.random()*(lastidx+1));

      arr.push(cricketQuiz[idx]);
      let temp=cricketQuiz[lastidx];
      cricketQuiz[lastidx]=cricketQuiz[idx];
      cricketQuiz[idx]=temp;

      lastidx--;
    }
    return arr;
    
}

const form = document.querySelector('form');

const problems=generate();        //now problems contains five set of objects

const ans={};

problems.forEach((obj,index)=>{
    const div=document.createElement('div');
    div.className='question';

    const p=document.createElement('p');
    p.textContent = `${index+1}. ${obj['question']}`;

    ans[`q${index+1}`] = obj['answer'];        //filling the answer object for checking of the result

    div.appendChild(p);
    //create 4 options
    obj.options.forEach((data)=>{
        const lebel=document.createElement('label');
        const input=document.createElement('input');
        input.type='radio';
        input.name=`q${index+1}`;
        input.value=data;

        lebel.appendChild(input);
        lebel.appendChild(document.createTextNode(data));

        div.appendChild(lebel);
        div.appendChild(document.createElement('br'));

    })

    form.appendChild(div);
})

const button = document.createElement('button')
button.type='submit';
button.className='btn';
button.innerText='Submit';

form.appendChild(button);


// check the original result 

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const data=new FormData(form);

    let res= 0;

    for(let [key,val] of data.entries()){
        if(val===ans[key]) res++;
    }

    const result=document.createElement('div');
    result.className='view'
    result.innerText=`${res} out of 5 are correct`;
    form.appendChild(result);

    
})
